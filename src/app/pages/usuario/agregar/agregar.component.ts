import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';
import { TipoUsuario } from '../../../interfaces/tipo-usuario';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario.service';
import { first } from 'rxjs/operators';		
import { ModalComponent } from '../../util/modal/modal.component';

@Component({
	selector: 'app-agregarusuario',
	templateUrl: './agregar.component.html',
	styleUrls: ['./agregar.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
	frmUsuario: FormGroup;
	submitted = false;
	loading = false;
	error = '';


	lstRol: any[];
	lstTipoDocumento: any[];
	lstTipoUsuario: any[];
	isVecino: boolean= false;
	lstRoles: TipoUsuario[] = [];
	modalOption: NgbModalOptions = {}; 

	constructor(private formBuilder: FormBuilder,
		public activeModal: NgbActiveModal,
		private modalService: NgbModal,
		private usuarioService: UsuarioService) { }

	ngOnInit() {
		this.frmUsuario = this.formBuilder.group({
			idTipoDocu:  ['', Validators.required],
			nroDocu:  ['', Validators.required],
			razonSocial: ['', Validators.required],
			idTipoDocuPadre:  [''],
			nroDocuPadre:  [''],
			contribuyente: [''],
			username:  ['', Validators.required],
			password:  ['', Validators.required],
			idTipoUsuario:  ['', Validators.required],
			descripcion:  ['', Validators.required],
			canjearXDni:  ['true'],
			correo: ['', [Validators.required, Validators.email]],
			lstRol: new FormArray([])
		});
		this.usuarioService.iniRegi().subscribe(res => {
			this.lstRol= res.lstRol;
			this.lstTipoDocumento= res.lstTipoDocumento;
			this.lstTipoUsuario= res.lstTipoUsuario;
			this.addCheckboxes();
		}, error => {
			if(error.status == 401){
			}
		});
	}

	private addCheckboxes() {
    	this.lstRol.map((o, i) => {
			const control = new FormControl(i === 0); // if first item set to true, else false
			(this.frmUsuario.controls.lstRol as FormArray).push(control);
		});
	}


	validarPersona(){
		let params = this.frmUsuario.value;
		let tipoUsuario = params.idTipoUsuario.split("-");
		let tipoDocu = params.idTipoDocu.split("-");
		let nroDocu = params.nroDocu;
		
		this.usuarioService.getPersona(tipoDocu[0], nroDocu, tipoDocu[1], tipoUsuario[1]).subscribe(res => {
			if(res == null || res.nombreUsu == null){
				this.frmUsuario.controls['razonSocial'].setValue(''); 
			} else {
				this.frmUsuario.controls['razonSocial'].setValue(res.nombreUsu); 
			}
		}, error => {
			if(error.status == 401){
			}
		});
	}

	cambiarTipo(event){
		this.frmUsuario.controls['nroDocu'].setValue(''); 
		this.frmUsuario.controls['razonSocial'].setValue(''); 
	}

	cambiarTipoPadre(event){
		this.frmUsuario.controls['nroDocuPadre'].setValue(''); 
		this.frmUsuario.controls['contribuyente'].setValue(''); 
	}

	validarContribuyente(){
		let params = this.frmUsuario.value;
		let tipoDocu = params.idTipoDocuPadre;
		let nroDocu = params.nroDocuPadre;
		this.usuarioService.getContribuyente(tipoDocu, nroDocu).subscribe(res => {
			if(res == null || res.contribuyente == null){
				this.frmUsuario.controls['contribuyente'].setValue(''); 
			} else {
				this.frmUsuario.controls['contribuyente'].setValue(res.contribuyente); 
			}
		}, error => {
			if(error.status == 401){
			}
		});
	}

	cambioTipoUsuario(event: any) {
		let val = event.target.value;
		let tipoDocu = val.split("-");
		if(tipoDocu[0] == '2')
			this.isVecino = true;
		else
			this.isVecino = false;

	}

	generarRoles(roles:any[]){
		for (var i = 0; i < roles.length; i++) {
			let item: TipoUsuario = {
				idRol : roles[i]
			}
			this.lstRoles.push(item);
		};
	}

	validarUsuario(){
		let params = this.frmUsuario.value;
		this.usuarioService.getUsuario(params.username).subscribe(res => {
			if(res != null){
				
				this.frmUsuario.controls['username'].setValue(''); 
			}
		}, error => {
			if(error.status == 401){
			}
		});
	}

	agregarUsuario(){
		this.submitted = true;
		this.error = '';
		if (this.frmUsuario.invalid) {
			return;
		}
		this.loading = true;

		let params = this.frmUsuario.value;

		const roles = this.frmUsuario.value.lstRol
			.map((v, i) => v ? this.lstRol[i].idRol : null)
			.filter(v => v !== null);

		this.generarRoles(roles);


		let tipoUsuario = params.idTipoUsuario.split("-");
		let tipoDocu = params.idTipoDocu.split("-");

		let usuario: Usuario = {
			idTipoDocu: tipoDocu[0],
			nroDocu: params.nroDocu,
			idTipoDocuPadre: params.idTipoDocuPadre,
			nroDocuPadre: params.nroDocuPadre,
			username: params.username,
			password: params.password,
			idTipoUsuario: tipoUsuario[0],
			verificado: false,
			validado: false,
			correoElect: params.correo,
			lstRol: this.lstRoles,
			canjearXDni: params.canjearXDni
		};
		
		this.loading = false;
		
			this.usuarioService.registrar(usuario)
			.pipe(first())
			.subscribe(
			data => {
				this.open();
			},
			error => {
				this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
				this.loading = false;
			});
	}

	open() {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalComponent, this.modalOption);
		modalRef.componentInstance.mensaje = 'Se registró correctamente el usuario';
		modalRef.result.then((result) => {
			this.activeModal.close();
		});
	}

	get f() { return this.frmUsuario.controls; }
}
