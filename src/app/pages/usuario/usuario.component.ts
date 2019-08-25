import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AgregarUsuarioComponent } from './agregar/agregar.component';
import { EditarUsuarioComponent } from './editar/editar.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import * as variables from '../../utils/variables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = variables.dtOptions;

	dtTrigger: Subject<any> = new Subject();

	constructor(private modalService: NgbModal,
		private usuarioService: UsuarioService,
		private route: ActivatedRoute,
		private router: Router) {}
	modalOption: NgbModalOptions = {}; 
	lstUsuario: Usuario[];

	ngOnInit() {
		this.listar();
	}

	abrirAgregar() {
		this.modalOption.backdrop 	= 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(AgregarUsuarioComponent, this.modalOption);
		modalRef.result.then((result) => {
			this.listar();
		});
	}

	listar(){
		this.usuarioService.listar().subscribe(res => {
			this.lstUsuario = res;
      this.rerender();
		}, error => {
			if(error.status == 401){
				this.router.navigate(['/login']);
			}
		});
	}

	cargarUsuario(username){
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;

		let usuario = {
			'username' : username
		}

		const modalRef = this.modalService.open(EditarUsuarioComponent, this.modalOption);
		modalRef.componentInstance.usuario = usuario;
		modalRef.result.then((result) => {
		this.listar();
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
}
