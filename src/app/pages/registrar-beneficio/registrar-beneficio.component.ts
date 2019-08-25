import { Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficio } from '../../interfaces/beneficio';
import { first } from 'rxjs/operators';	
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../util/modal/modal.component';

@Component({
	selector: 'app-registrar-beneficio',
	templateUrl: './registrar-beneficio.component.html',
	styleUrls: ['./registrar-beneficio.component.scss']
})
export class RegistrarBeneficioComponent implements OnInit {

	beneficioForm: FormGroup;
	submitted = false;
	loading = false;
	error = '';

	lstEmpresas: any[];
	lstCategorias: any[];
	lstTipoBeneficios: any[];
	lstNivelMorosidad: any[];
	lstEstadoBeneficio: any[];
	lstSegmentos: any[];
	lstGrupo: Array<any> = [];
	lstSegmentosGrupo: Array<any> = [];
	selectedDate: Date;
	nombreArchivo: string = 'Selecciones imagen';
	nombreArchivoHddn: string = '';
	imagePath: string;
	imgURL: any;
	fecInicio: Date;
	fecFin: Date;
	user: any;
	flagEmpresa: boolean;
	modalOption: NgbModalOptions = {}; 

	constructor(private beneficioService: BeneficioService,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private modalService: NgbModal,
		private router: Router) { }

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));

		for (var e = 0; e < this.user.lstRol.length; e++) {
  		let item = this.user.lstRol[e];
  		if(item.idRol == 2) {
		  	this.flagEmpresa = true;
		  	break;
  		}
  	};

		this.beneficioForm = this.formBuilder.group({
			lstEmpresas: ['', Validators.required],
			lstCategorias: ['', Validators.required],
			lstTipoBeneficios: ['', Validators.required],
			fecInicio: ['', Validators.required],
			fecFin: ['', Validators.required],
			descripcion1: ['', Validators.required],
			descripcion2: [''/*, Validators.required*/],
			descripcion3: [''/*, Validators.required*/],
			descripcion4: [''/*, Validators.required*/],
			observacion1: ['', Validators.required],
			observacion2: [''/*, Validators.required*/],
			observacion3: [''/*, Validators.required*/],
			observacion4: [''/*, Validators.required*/],
			observacion5: [''/*, Validators.required*/],
			observacion6: [''/*, Validators.required*/],
			terminos: ['', Validators.required],
			detalle: [''/*, Validators.required*/],
			estado: ['', /*Validators.required*/],
			imagen: [''/*, Validators.required*/],
			imagenHddn: [this.nombreArchivoHddn, Validators.required],
		});

		this.beneficioService.iniRegi().subscribe(res => {
			this.lstEmpresas = res.lstEmpresas;
			this.lstCategorias = res.lstCategorias;
			this.lstTipoBeneficios = res.lstTipoBeneficios;
			this.lstSegmentos = res.lstSegmentos;
			this.lstNivelMorosidad = res.lstNivelMorosidad;
			this.lstEstadoBeneficio = res.lstEstadoBeneficio;

  		if(this.flagEmpresa){
  			this.beneficioForm.controls['lstEmpresas'].setValue(this.user.idTipoDocu+'-'+this.user.nroDocu);
  		}
		}, error => {
			if(error.status == 401){
				this.router.navigate(['/login']);
			}
		});
	}

	seleccionarMorosidad(evt) {
		let isChecked = evt.target.checked;
		let value = evt.target.defaultValue;
		if (isChecked) {
			this.lstGrupo.push(value);
		} else {
			for( var i = 0; i < this.lstGrupo.length; i++){ 
				if ( this.lstGrupo[i] === value) {
					this.lstGrupo.splice(i, 1); 
				}
			}
		}
	}

	onSubmit(){
		this.submitted = true;
		this.error = '';
		if (this.beneficioForm.invalid) {
			return;
		}

		this.generarGrupoSegmento();
		let params = this.beneficioForm.value;

		let empresa = params.lstEmpresas.split("-");

		let jsonParam: Beneficio = {
			descripcion1 : params.descripcion1,
			descripcion2 : params.descripcion2,
			descripcion3 : params.descripcion3,
			observacion1 : params.observacion1,
			observacion2 : params.observacion2,
			observacion3 : params.observacion3,
			observacion4 : params.observacion4,
			observacion5 : params.observacion5,
			observacion6 : params.observacion6,
			restricciones : params.terminos,
			detalleEstado : (this.flagEmpresa)?'':params.detalle,
			fecIni : null,
			fecFin : null,
			strFecIni : this.getDateFormat(this.fecInicio),
			strFecFin : this.getDateFormat(this.fecFin),
			idTipoDocu : empresa[0],
			nroDocu : empresa[1],
			idTipoBeneficio : params.lstTipoBeneficios,
			idCategoria : params.lstCategorias,
			idEstadoBeneficio : (this.flagEmpresa)?'1':params.estado,
			lstSegmentoBeneficio : this.lstSegmentosGrupo,
			imagen : this.imgURL.replace(/^data:image\/[a-z]+;base64,/, "")
		}


		this.loading = true;
		this.error = '';
		this.beneficioService.registrar(jsonParam)
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

	generarGrupoSegmento(){
		for (var i = 0; i < this.lstGrupo.length; i++) {
			let ids = this.lstGrupo[i].split("-"); 
			let item = {
				'idSegmento' : ids[0],
				'idNivelMorosidad' : ids[1]
			}
			this.lstSegmentosGrupo.push(item);
		};
	}

	get f() { return this.beneficioForm.controls; }


	onFileChange(files) {
		if (files.length === 0){

			this.beneficioForm.controls['imagenHddn'].setValue('');
			return;
		}
		
		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {

			this.beneficioForm.controls['imagenHddn'].setValue('');
			return;
		}

		var reader = new FileReader();
		this.imagePath = files;
		this.nombreArchivo = files[0].name;
		this.nombreArchivoHddn = files[0].name;
		this.beneficioForm.controls['imagenHddn'].setValue(this.nombreArchivoHddn);
		reader.readAsDataURL(files[0]); 
		reader.onload = (_event) => { 
			this.imgURL = reader.result; 
		}
	}

	redireccionar(){
		this.router.navigate(['/beneficios']);
	}

	open() {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalComponent, this.modalOption);
		modalRef.componentInstance.mensaje = 'Se registró correctamente el beneficio';
		modalRef.result.then((result) => {
			if(this.flagEmpresa){
				this.router.navigate(['/beneficios-empresa']);
			} else {
				this.router.navigate(['/beneficios']);
			}
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
