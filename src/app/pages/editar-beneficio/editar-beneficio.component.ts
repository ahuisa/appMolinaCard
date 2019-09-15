import { Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficio } from '../../interfaces/beneficio';
import { Morosidad } from '../../interfaces/morosidad';
import { Segmento } from '../../interfaces/segmento';
import { first } from 'rxjs/operators';	
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../util/modal/modal.component';
import { ModalImagenComponent } from '../util/modal-imagen/modal-imagen.component';

@Component({
	selector: 'app-editar-beneficio',
	templateUrl: './editar-beneficio.component.html',
	styleUrls: ['./editar-beneficio.component.scss']
})
export class EditarBeneficioComponent implements OnInit {
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
	idBeneficio: any;
	beneficioResponse: any;
	segmentoBeneficioResponse: any;
	listaSegmento: Segmento[] = [];
	modalOption: NgbModalOptions = {}; 

	constructor(private beneficioService: BeneficioService,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private modalService: NgbModal,
		private router: Router) { }

	ngOnInit() {

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
			estado: ['', Validators.required],
			imagen: [''/*, Validators.required*/],
		});

		let data = localStorage.getItem('param');
		if(data == ''){
			this.router.navigate(['/beneficios']);
		} else {
			let data2 = JSON.parse(localStorage.getItem('param'));
			this.idBeneficio = data2.idBeneficio;
			localStorage.setItem('param', '');
			//this.idBeneficio = this.route.snapshot.paramMap.get('id');

			this.beneficioService.iniAct(this.idBeneficio).subscribe(res => {
				this.lstEmpresas = res.lstEmpresas;
				this.lstCategorias = res.lstCategorias;
				this.lstTipoBeneficios = res.lstTipoBeneficios;
				this.lstSegmentos = res.lstSegmentos;
				this.lstNivelMorosidad = res.lstNivelMorosidad;
				this.lstEstadoBeneficio = res.lstEstadoBeneficio;
				
				this.beneficioResponse = res.beneficio;
				this.segmentoBeneficioResponse = res.lstSegmentoBeneficio;
				this.inicializarFormulario();

				for (var i = 0; i < this.lstSegmentos.length; i++) {
					let segmento: Segmento = {
						idSegmento: this.lstSegmentos[i].idSegmento,
						maxRango: this.lstSegmentos[i].maxRango,
						minRango: this.lstSegmentos[i].minRango,
						descripcion: this.lstSegmentos[i].descripcion,
						morosidad: []
					};
					let listaMorosidad : Morosidad[] = [];
					for (var e = 0; e < this.lstNivelMorosidad.length; e++) {
						let morosidad: Morosidad;
						let flag: boolean = false;
						for (var o = 0; o < this.segmentoBeneficioResponse.length; o++) {
							let seg = this.segmentoBeneficioResponse[o];
							if (seg.idSegmento == this.lstSegmentos[i].idSegmento && 
								seg.idNivelMorosidad == this.lstNivelMorosidad[e].idNivelMorosidad) {
								morosidad = {
									idNivelMorosidad: this.lstNivelMorosidad[e].idNivelMorosidad,
									checked: true,
									value: this.lstSegmentos[i].idSegmento +'-'+this.lstNivelMorosidad[e].idNivelMorosidad
								};
								flag = true;
								listaMorosidad.push(morosidad);
								this.lstGrupo.push(morosidad.value);
							}
						};
						if(!flag){
							morosidad = {
								idNivelMorosidad: this.lstNivelMorosidad[e].idNivelMorosidad,
								checked: false,
								value: this.lstSegmentos[i].idSegmento +'-'+this.lstNivelMorosidad[e].idNivelMorosidad
							};
							listaMorosidad.push(morosidad);
						}

					};
					segmento.morosidad = listaMorosidad;
					this.listaSegmento.push(segmento);
				};
			}, error => {
				if(error.status == 403){
					this.router.navigate(['/login']);
				}
			});
		}
	}

	inicializarFormulario(){
		this.beneficioForm.controls['lstEmpresas'].setValue(this.beneficioResponse.idTipoDocu+'-'+this.beneficioResponse.nroDocu);
		this.beneficioForm.controls['lstCategorias'].setValue(this.beneficioResponse.idCategoria); 
		this.beneficioForm.controls['lstTipoBeneficios'].setValue(this.beneficioResponse.idTipoBeneficio); 
		
		let fechaInicio = new Date(this.beneficioResponse.fecIni);
		fechaInicio.setDate(fechaInicio.getDate() + 1);
		let fechaFin = new Date(this.beneficioResponse.fecFin);
		//fechaFin.setDate(fechaFin.getDate() + 1)

		this.beneficioForm.controls['fecInicio'].setValue(fechaInicio); 
		this.beneficioForm.controls['fecFin'].setValue(fechaFin); 


		this.beneficioForm.controls['descripcion1'].setValue(this.beneficioResponse.descripcion1); 
		this.beneficioForm.controls['descripcion2'].setValue(this.beneficioResponse.descripcion2); 
		this.beneficioForm.controls['descripcion3'].setValue(this.beneficioResponse.descripcion3); 
		this.beneficioForm.controls['descripcion4'].setValue(this.beneficioResponse.descripcion4); 
		this.beneficioForm.controls['observacion1'].setValue(this.beneficioResponse.observacion1); 
		this.beneficioForm.controls['observacion2'].setValue(this.beneficioResponse.observacion2); 
		this.beneficioForm.controls['observacion3'].setValue(this.beneficioResponse.observacion3); 
		this.beneficioForm.controls['observacion4'].setValue(this.beneficioResponse.observacion4); 
		this.beneficioForm.controls['observacion5'].setValue(this.beneficioResponse.observacion5); 
		this.beneficioForm.controls['observacion6'].setValue(this.beneficioResponse.observacion6); 
		this.beneficioForm.controls['terminos'].setValue(this.beneficioResponse.restricciones); 
		this.beneficioForm.controls['detalle'].setValue(this.beneficioResponse.detalleEstado); 
		this.beneficioForm.controls['estado'].setValue(this.beneficioResponse.idEstadoBeneficio); 
		this.beneficioForm.controls['imagen'].setValue(this.beneficioResponse.urlImagen); 
	}

	onSubmit(){
		debugger;
		this.submitted = true;
		this.error = '';
		let params = this.beneficioForm.value;
		if (this.beneficioForm.invalid) {
			return;
		}

		this.generarGrupoSegmento();
		let empresa = params.lstEmpresas.split("-");

		let jsonParam: Beneficio = {
			idBeneficio : this.idBeneficio,
			descripcion1 : params.descripcion1,
			descripcion2 : params.descripcion2,
			descripcion3 : params.descripcion3,
			descripcion4 : params.descripcion4,
			observacion1 : params.observacion1,
			observacion2 : params.observacion2,
			observacion3 : params.observacion3,
			observacion4 : params.observacion4,
			observacion5 : params.observacion5,
			observacion6 : params.observacion6,
			restricciones : params.terminos,
			detalleEstado : params.detalle,
			fecIni : null,
			fecFin : null,
			strFecIni : this.getDateFormat(params.fecInicio),
			strFecFin : this.getDateFormat(params.fecFin),
			idTipoDocu : empresa[0],
			nroDocu : empresa[1],
			idTipoBeneficio : params.lstTipoBeneficios,
			idCategoria : params.lstCategorias,
			idEstadoBeneficio : params.estado,
			lstSegmentoBeneficio : this.lstSegmentosGrupo,
			imagen : this.imgURL==null?null:this.imgURL.replace(/^data:image\/[a-z]+;base64,/, "")
		}


		this.loading = true;
		this.error = '';
		this.beneficioService.actualizar(jsonParam)
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
		this.lstSegmentosGrupo = [];
		for (var i = 0; i < this.lstGrupo.length; i++) {
			let ids = this.lstGrupo[i].split("-"); 
			let item = {
				'idSegmento' : ids[0],
				'idNivelMorosidad' : ids[1]
			}
			this.lstSegmentosGrupo.push(item);
		};
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


	get f() { return this.beneficioForm.controls; }

	getDateFormat(fecha: any){
		let d = new Date(fecha),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;

		return [day, month, year].join('/');
	}

	open() {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalComponent, this.modalOption);
		modalRef.componentInstance.mensaje = 'Se actualizó correctamente el beneficio';
		modalRef.result.then((result) => {
			this.router.navigate(['/beneficios']);
		});
	}

	verImagen(){
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalImagenComponent, this.modalOption);
		modalRef.componentInstance.urlImagen = this.beneficioResponse.urlImagen;
	}

	onFileChange(files) {
		if (files.length === 0){
			this.imgURL = '';
			return;
		}
		
		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			this.imgURL = '';
			return;
		}

		var reader = new FileReader();
		this.imagePath = files;
		this.nombreArchivo = files[0].name;
		this.nombreArchivoHddn = files[0].name;
		reader.readAsDataURL(files[0]); 
		reader.onload = (_event) => { 
			this.imgURL = reader.result; 
		}
	}


}
