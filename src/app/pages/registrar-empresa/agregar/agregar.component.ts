import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Local } from '../../../interfaces/local';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-agregar',
	templateUrl: './agregar.component.html',
	styleUrls: ['./agregar.component.scss']
})
export class AgregarLocalComponent implements OnInit {
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
	}

	agregarLocal(){
		this.submitted = true;
		this.error = '';
		if (this.frmLocal.invalid) {
			return;
		}
		this.loading = true;
		let params = this.frmLocal.value;
		let local: Local = {
			nombre: params.razonSocial,
			longitud: params.longitud,
			latitud: params.latitud,
			direccion: params.direccion,
			horario1: params.horario1,
			horario2: params.horario2,
			accion: 'N'
		};

		this.activeModal.close(local);
		this.loading = false;

	}

	get f() { return this.frmLocal.controls; }
}
