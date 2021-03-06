import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';
import { TipoUsuario } from '../../../interfaces/tipo-usuario';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario.service';
import { first } from 'rxjs/operators';		
import { ModalComponent } from '../../util/modal/modal.component';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

	@Input() public usuario: any;
	frmUsuario: FormGroup;
	submitted = false;
	loading = false;
	error = '';
	isDataCargada: boolean = false;

	lstRol: any[];
	lstRolTemp: any[];
	lstTipoDocumento: any[];
	lstTipoUsuario: any[];
	isVecino: boolean= false;
	lstRoles: TipoUsuario[] = [];
	usuarioBean: any;
	modalOption: NgbModalOptions = {}; 
	lstRolSel: Array<any> = [];

	constructor(private formBuilder: FormBuilder,
		public activeModal: NgbActiveModal,
		private modalService: NgbModal,
		private usuarioService: UsuarioService) { }

  ngOnInit() {
  	this.frmUsuario = this.formBuilder.group({
			idTipoDocu:  [''],
			nroDocu:  [''],
			razonSocial: [''],
			idTipoDocuPadre:  [''],
			nroDocuPadre:  [''],
			contribuyente: [''],
			username:  [''],
			password:  [''],
			idTipoUsuario:  [''],
			descripcion:  [''],
			correo:  [''],
			canjearXDni:  [''],
			lstRol: new FormArray([])
		});

		this.usuarioService.iniAct(this.usuario.username).subscribe(res => {
			this.lstRol= res.lstRol;
			this.lstRolTemp = res.lstRol;
			this.lstTipoDocumento= res.lstTipoDocumento;
			this.lstTipoUsuario= res.lstTipoUsuario;
			this.usuarioBean = res.usuario;
			this.addCheckboxes();
			console.log(this.lstRolSel);
			this.cargarDatos();
		}, error => {
			if(error.status == 401){
			}
		});
  }

	private addCheckboxes() {
		this.lstRol.forEach((o, i) => {
			const control = new FormControl(i === 0); // if first item set to true, else false
			(this.frmUsuario.controls.lstRol as FormArray).push(control);
    	});
    	for (var i = 0; i < this.lstRolTemp.length; i++) {
    		let item = this.lstRolTemp[i];
    		if(item.username != null)
    			this.lstRolSel.push(item.idRol);
    	};
	}

	cargarDatos(){
		this.frmUsuario.controls['idTipoDocu'].setValue(this.usuarioBean.idTipoDocu); 
		this.frmUsuario.controls['nroDocu'].setValue(this.usuarioBean.nroDocu); 
		this.frmUsuario.controls['razonSocial'].setValue(this.usuarioBean.nombreUsu); 
		this.frmUsuario.controls['idTipoDocuPadre'].setValue(this.usuarioBean.idTipoDocuPadre); 
		this.frmUsuario.controls['nroDocuPadre'].setValue(this.usuarioBean.nroDocuPadre); 
		this.frmUsuario.controls['contribuyente'].setValue(this.usuarioBean.nombreUsuContri); 
		this.frmUsuario.controls['username'].setValue(this.usuarioBean.username); 
		this.frmUsuario.controls['idTipoUsuario'].setValue(this.usuarioBean.idTipoUsuario); 
		this.frmUsuario.controls['descripcion'].setValue(this.usuarioBean.descripcion); 
		this.frmUsuario.controls['correo'].setValue(this.usuarioBean.correoElect); 
		this.frmUsuario.controls['canjearXDni'].setValue(this.usuarioBean.canjearXDni.toString());
		this.isVecino = this.usuarioBean.idTipoUsuario == '2';
		this.isDataCargada = true;
	}

	guardarUsuario(){
		this.submitted = true;
		this.error = '';
		if (this.frmUsuario.invalid) {
			return;
		}
		this.loading = true;
		let params = this.frmUsuario.value;
		/*console.log(params.lstRol);
		const roles = this.frmUsuario.value.lstRol
			.map((v, i) => v ? this.lstRolTemp[i].idRol : null)
			.filter(v => v !== null);

		this.generarRoles(roles);*/

		console.log(this.lstRolSel);
		for (var i = 0; i < this.lstRolTemp.length; i++) {
			let item = this.lstRolTemp[i];
			let flag = false;
			for (var e = 0; e < this.lstRolSel.length; e++) {
				if(this.lstRolSel[e] == item.idRol){
					flag = true;
				}
			};

			if(item.username != null && !flag){
				this.lstRolTemp[i].flag = 'E';
			}
			if(item.username == null && flag) {
				this.lstRolTemp[i].flag = 'N';
			}
			if(item.username == null && !flag) {
				this.lstRolTemp.splice(i, 1);
				i--;
			}

		};

		let usuario: any = {
			username: this.usuarioBean.username,
			password: params.password == null || params.password == ''?null:params.password,
			lstRol: this.lstRolTemp,
			estado: '1',
			verificado: this.usuarioBean.verificado,
			validado: this.usuarioBean.validado,
			idTipoDocuPadre: this.usuarioBean.idTipoDocuPadre == null?'':this.usuarioBean.idTipoDocuPadre,
			nroDocuPadre: this.usuarioBean.nroDocuPadre == null?'':this.usuarioBean.nroDocuPadre,
			correoElect: params.correo,
			canjearXDni: params.canjearXDni
		};

		
		this.loading = false;
		
			this.usuarioService.actualizar(usuario)
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
		modalRef.componentInstance.mensaje = 'Se actualizó correctamente el usuario';
		modalRef.result.then((result) => {
			this.activeModal.close();
		});
	}

	generarRoles(roles:any[]){
		for (var i = 0; i < roles.length; i++) {
			let item: TipoUsuario = {
				idRol : roles[i]
			}
			this.lstRoles.push(item);
		};
	}
	get f() { return this.frmUsuario.controls; }

	seleccionar(evt){
		let isChecked = evt.target.checked;
		let value = evt.target.defaultValue;
		console.log(isChecked);
		console.log(value);
		if (isChecked) {
			this.lstRolSel.push(value);
		} else {
			//debugger;
			for( var i = 0; i < this.lstRolSel.length; i++){ 
				if ( this.lstRolSel[i].toString() === value) {
					this.lstRolSel.splice(i, 1); 
				}
			}
		}
	}

}
