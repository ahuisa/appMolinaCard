import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../interfaces/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';		
import { ModalComponent } from '../../util/modal/modal.component';

@Component({
	selector: 'app-agregar',
	templateUrl: './agregar.component.html',
	styleUrls: ['./agregar.component.scss']
})
export class AgregarPersonaComponent implements OnInit {
	
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
	modalOption: NgbModalOptions = {}; 

	constructor(public activeModal: NgbActiveModal,
					private formBuilder: FormBuilder,
						private modalService: NgbModal,
					private personaService: PersonaService) {}

	ngOnInit() {


		this.frmPersona = this.formBuilder.group({
			idTipoDocu: ['', Validators.required],
			nroDocu: ['', Validators.required],
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
			imagen: ['', Validators.required],
		});

		this.personaService.iniRegi().subscribe(res => {
			this.lstTipoDocumento = res.lstTipoDocumento;
			this.lstEstadoCivil = res.lstEstadoCivil;
			console.log(res);
		}, error => {
			if(error.status == 401){
			}
		});
	}			

	get f() { return this.frmPersona.controls; }

	registrar(){
		this.submitted = true;
		this.error = '';
		if (this.frmPersona.invalid) {
			console.log(this.frmPersona);
			return;
		}
		this.loading = true;
		let params = this.frmPersona.value;
		let persona: Persona = {

			idTipoDocu: params.idTipoDocu,
			nroDocu: params.nroDocu,
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
		
			this.personaService.registrar(persona)
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
			this.frmPersona.controls['imagen'].setValue(''); 
			return;
		}
 
		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			this.frmPersona.controls['imagen'].setValue(''); 
			return;
		}

		var reader = new FileReader();
		this.imagePath = files;
		this.nombreArchivo = files[0].name;
		reader.readAsDataURL(files[0]); 
		reader.onload = (_event) => { 
		this.imgURL = reader.result; 
		this.frmPersona.controls['imagen'].setValue(this.nombreArchivo); 
		}
	}

	open() {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalComponent, this.modalOption);
		modalRef.componentInstance.mensaje = 'Se registró correctamente la persona';
		modalRef.result.then((result) => {
			this.activeModal.close();
		});
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

}
