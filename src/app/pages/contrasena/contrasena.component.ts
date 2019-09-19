import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { ModalComponent } from '../util/modal/modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';	

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.scss']
})
export class ContrasenaComponent implements OnInit {
	token: string;
	frmContrasena: FormGroup;
	submitted = false;
	loading = false;
	error = '';

	modalOption: NgbModalOptions = {}; 
  constructor(private autenticacionService: AutenticacionService,
							private route: ActivatedRoute,
							//public activeModal: NgbActiveModal,
							private formBuilder: FormBuilder,
							private modalService: NgbModal,
							private router: Router) { }

  ngOnInit() {

		this.frmContrasena = this.formBuilder.group({
			contrasena: ['', Validators.required],
			contrasenar: ['', Validators.required]
		});
  	this.token = this.route.snapshot.paramMap.get('token');
  }
  get f() { return this.frmContrasena.controls; }


	onSubmit(){
		this.submitted = true;
		this.error = '';
		if (this.frmContrasena.invalid) {
			return;
		}
		let param = this.frmContrasena.value;
		if(param.contrasena != param.contrasenar){
			this.open('Las contraseñas deben ser iguales');
			return;
		}
		this.loading = true;

		let jsonParam = {
			token: this.token,
			password: param.contrasena
		};

		this.autenticacionService.cambiarContrasena(jsonParam)
		.pipe(first())
		.subscribe(
			(data:any) => {
				this.open(data.mensaje);
			},
			error => {
				this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
				this.loading = false;
			});

	}

	open(mensaje: string) {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalComponent, this.modalOption);
		modalRef.componentInstance.mensaje = mensaje;
		modalRef.result.then((result) => {
			this.frmContrasena.controls['contrasena'].setValue('');
			this.frmContrasena.controls['contrasenar'].setValue('');
			//this.activeModal.close('');
		});
	}
}
