import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Local } from '../../../interfaces/local';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-editar',
	templateUrl: './editar.component.html',
	styleUrls: ['./editar.component.scss']
})
export class EditarLocalComponent implements OnInit {

	@Input() public local: Local;
	frmLocal: FormGroup;
	submitted = false;
	loading = false;
	error = '';

	constructor(private formBuilder: FormBuilder,
		public activeModal: NgbActiveModal) { }

	ngOnInit() {
		this.frmLocal = this.formBuilder.group({
			razonSocial: ['', Validators.required],
			longitud: ['', Validators.required],
			latitud: ['', Validators.required],
			direccion: ['', Validators.required],
			horario1: ['', Validators.required],
			horario2: ['', Validators.required]
		});

		this.cargarDatos();

	}

	editarLocal(){
		this.submitted = true;
		this.error = '';
		if (this.frmLocal.invalid) {
			return;
		}
		this.loading = true;
		let params = this.frmLocal.value;
		let accion = this.local.accion == 'N'?'N':'M';
		let local: Local = {
			idLocalEmpresa: this.local.idLocalEmpresa,
			nombre: params.razonSocial,
			longitud: params.longitud,
			latitud: params.latitud,
			direccion: params.direccion,
			horario1: params.horario1,
			horario2: params.horario2,
			accion: accion
		};

		this.activeModal.close(local);
		this.loading = false;
	}

	cargarDatos(){
		this.frmLocal.controls['razonSocial'].setValue(this.local.nombre); 
		this.frmLocal.controls['longitud'].setValue(this.local.longitud); 
		this.frmLocal.controls['latitud'].setValue(this.local.latitud); 
		this.frmLocal.controls['direccion'].setValue(this.local.direccion); 
		this.frmLocal.controls['horario1'].setValue(this.local.horario1); 
		this.frmLocal.controls['horario2'].setValue(this.local.horario2); 
	}
	get f() { return this.frmLocal.controls; }

}
