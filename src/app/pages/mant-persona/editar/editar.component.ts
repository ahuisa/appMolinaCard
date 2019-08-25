import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../interfaces/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';		
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../util/modal/modal.component';

@Component({
	selector: 'app-editarpersona',
	templateUrl: './editar.component.html',
	styleUrls: ['./editar.component.scss']
})
export class EditarPersonaComponent implements OnInit {
	
	@Input() public persona: any;
	lstTipoDocumento: any[];
	lstEstadoCivil: any[];
	frmPersona: FormGroup;
	submitted = false;
	loading = false;
	error = '';
	//imagen
	nombreArchivo: string = 'Selecciones imagen';
	imagePath: string;
	imgURL: any;
	fecNacimiento: Date;
	personaBean: Persona;
	modalOption: NgbModalOptions = {}; 


	constructor(public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private personaService: PersonaService,
		private modalService: NgbModal,
		private route: ActivatedRoute,
		private router: Router) {}

	ngOnInit() {
		console.log(this.persona);
		this.frmPersona = this.formBuilder.group({
			idTipoDocu: [''],
			nroDocu: [''],
			nombres: ['', Validators.required],
			apePater: ['', Validators.required],
			apeMater: ['', Validators.required],
			fecNacimiento: ['', Validators.required],
			idSexo: ['', Validators.required],
			direccion: ['', Validators.required],
			estCivil: ['', Validators.required],
			correoElect: ['', [Validators.required, Validators.email]],
			telefono: ['', Validators.required],
			estado: ['', Validators.required],
			imagen: [''],
		});

		this.personaService.iniAct(this.persona.idTipoDocu, this.persona.nroDocu).subscribe(res => {
			this.lstTipoDocumento = res.lstTipoDocumento;
			this.lstEstadoCivil = res.lstEstadoCivil;
			this.personaBean = res.persona;
			this.cargarDatos();
			console.log(res);
		}, error => {
			if(error.status == 401){
				this.router.navigate(['/login']);
			}
		});

	}

	cargarDatos(){
		this.frmPersona.controls['idTipoDocu'].setValue(this.personaBean.idTipoDocu); 
		this.frmPersona.controls['nroDocu'].setValue(this.personaBean.nroDocu); 
		this.frmPersona.controls['nombres'].setValue(this.personaBean.nombres); 
		this.frmPersona.controls['apePater'].setValue(this.personaBean.apePater); 
		this.frmPersona.controls['apeMater'].setValue(this.personaBean.apeMater); 
		this.frmPersona.controls['idSexo'].setValue(this.personaBean.idSexo); 
		this.frmPersona.controls['direccion'].setValue(this.personaBean.direccion); 
		this.frmPersona.controls['estCivil'].setValue(this.personaBean.idEstadoCivil); 
		this.frmPersona.controls['correoElect'].setValue(this.personaBean.correoElect); 
		this.frmPersona.controls['telefono'].setValue(this.personaBean.telefono); 
		this.frmPersona.controls['estado'].setValue(this.personaBean.estado); 
	}


	actualizar(){
		this.submitted = true;
		this.error = '';
		if (this.frmPersona.invalid) {
			console.log(this.frmPersona);
			return;
		}
		this.loading = true;
		let params = this.frmPersona.value;
		let persona: Persona = {

			idTipoDocu: this.personaBean.idTipoDocu,
			nroDocu: this.personaBean.nroDocu,
			nombres: params.nombres,
			apePater: params.apePater,
			apeMater: params.apeMater,
			fecNacimiento: null,
			strFecNacimiento: this.getDateFormat(this.fecNacimiento),
			idSexo: params.idSexo,
			direccion: params.direccion,
			idEstadoCivil: params.estCivil,
			correoElect: params.correoElect,
			telefono: params.telefono,
			estado: params.estado,
			imagen: this.imgURL == null || this.imgURL == ''?null:this.imgURL.replace(/^data:image\/[a-z]+;base64,/, "")
		};

		this.loading = false;
		
		this.personaService.actualizar(persona)
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

	onFileChange(files) {
		if (files.length === 0){
			return;
		}

		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		this.imagePath = files;
		this.nombreArchivo = files[0].name;
		reader.readAsDataURL(files[0]); 
		reader.onload = (_event) => { 
			this.imgURL = reader.result; 
		}
	}

	getDateFormat(fecha: any){
		let dd = fecha.day; 
		let mm = fecha.month; 
		let dia = dd + '';
		let mes = mm + '';
		let yyyy = fecha.year; 
		if (dd < 10) { 
			dia = '0' + dd; 
		} 
		if (mm < 10) { 
			mes = '0' + mm; 
		} 
		return dia + '/' + mes + '/' + yyyy; 
	}

	open() {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalComponent, this.modalOption);
		modalRef.componentInstance.mensaje = 'Se actualizó correctamente la persona';
		modalRef.result.then((result) => {
			this.activeModal.close();
		});
	}

	getDateFormat2(fecha: any){
		let dd = fecha.day; 
		let mm = fecha.month; 
		let dia = dd + '';
		let mes = mm + '';
		let yyyy = fecha.year; 
		if (dd < 10) { 
			dia = '0' + dd; 
		} 
		if (mm < 10) { 
			mes = '0' + mm; 
		} 
		return yyyy + '-' + mes + '-' + dia; 
	}

	get f() { return this.frmPersona.controls; }

}
