import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as variables from '../../utils/variables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-empresas',
	templateUrl: './empresas.component.html',
	styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = variables.dtOptions;

	dtTrigger: Subject<any> = new Subject();
	empresas: any[];
	estadoPersona: string;
	idTipoDocuPersona: string;
	nroDocuPersona: string;
	mensajeConfirmacion: string;
	
	constructor(private empresaService: EmpresaService,
				private modalService: NgbModal,
							private route: ActivatedRoute,
							private dataService: DataService,
							private router: Router) { }

	ngOnInit() {
		this.listar();
	}

	listar(){
		this.empresaService.listar().subscribe(res => {
			this.empresas = res;
			this.rerender();
		}, error => {
			if(error.status == 403){
				this.router.navigate(['/login']);
			}
		});
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();
		});
	}

	irDetalle(idTipoDocu, nroDocu){
		let param = {
			'idTipoDocu' : idTipoDocu,
			'nroDocu' : nroDocu
		};
		localStorage.setItem('param', JSON.stringify(param));
    this.router.navigate(['/empresa/' + 'e']);
  }

  	abrirConfirmar(content, estado: string, idTipoDocu: string, nroDocu: string){
		if(estado == '1'){
			this.mensajeConfirmacion = variables.mensajeActivarEmpresa;
		} else {
			this.mensajeConfirmacion = variables.mensajeDesactivarEmpresa;
		}
		this.estadoPersona = estado;
		this.idTipoDocuPersona = idTipoDocu;
		this.nroDocuPersona = nroDocu;
		this.modalService.open(content);
	}

	confirmar(){

		let empresa = {
			'idTipoDocu' : this.idTipoDocuPersona,
			'nroDocu' : this.nroDocuPersona,
			'estado' : this.estadoPersona
		}

		this.empresaService.activarDesactivar(empresa).subscribe(res => {
			this.listar();
		}, error => {
			if(error.status == 401){
				this.router.navigate(['/login']);
			}
		});
	}

}
