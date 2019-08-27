import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as variables from '../../utils/variables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';

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
	
	constructor(private empresaService: EmpresaService,
							private route: ActivatedRoute,
							private dataService: DataService,
							private router: Router) { }

	ngOnInit() {
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

}
