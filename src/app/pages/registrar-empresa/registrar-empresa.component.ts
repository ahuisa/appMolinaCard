import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Local } from '../../interfaces/local';
import { Empresa } from '../../interfaces/empresa';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AgregarLocalComponent } from './agregar/agregar.component';
import { EditarLocalComponent } from './editar/editar.component';
import { EliminarLocalComponent } from './eliminar/eliminar.component';
import { first } from 'rxjs/operators';	
import { EmpresaService } from '../../services/empresa.service';
import { ModalComponent } from '../util/modal/modal.component';
import { ModalImagenComponent } from '../util/modal-imagen/modal-imagen.component';

@Component({
	selector: 'app-registrar-empresa',
	templateUrl: './registrar-empresa.component.html',
	styleUrls: ['./registrar-empresa.component.scss']
})
export class RegistrarEmpresaComponent implements OnInit {

	lstTipoDocumento: any[];
	frmEmpresa: FormGroup;
	submitted = false;
	loading = false;
	error = '';
	lstLocales: Local[] = [];
	data: any;

	//imagen
	nombreArchivo: string = 'Selecciones imagen';
	imagePath: string;
	imgURL: any;

	//accion
	accion: string;
	idTipoDocu: string;
	nroDocu: string;

	//editar
	empresaBean: any;
	modalOption: NgbModalOptions = {}; 
	max: number = 0;

	constructor(private empresaService: EmpresaService,
							private route: ActivatedRoute,
							private formBuilder: FormBuilder,
							private modalService: NgbModal,
							private router: Router) { }


	ngOnInit() {


		this.accion = this.route.snapshot.paramMap.get('accion');

		this.frmEmpresa = this.formBuilder.group({
			razonSocial: ['', Validators.required],
			razonSocialCorto: ['', Validators.required],
			imagen: ['', Validators.required],
			idTipoDocu: ['', Validators.required],
			nroDocu: ['', Validators.required],
			telefono: ['', Validators.required],
			contacto: ['', Validators.required],
			estado: ['', Validators.required],
			correo: ['', [Validators.required, Validators.email]]
		});

		if(this.accion == 'n'){
			this.empresaService.iniRegi().subscribe(res => {
				this.lstTipoDocumento = res.lstTipoDocumento;
			}, error => {
				if(error.status == 403){
					this.router.navigate(['/login']);
				}
			});
		} else {/*
			this.idTipoDocu = this.route.snapshot.paramMap.get('tip');
			this.nroDocu = this.route.snapshot.paramMap.get('doc');*/
			let data = localStorage.getItem('param');
			if(data == ''){
				debugger;
				this.router.navigate(['/empresas']);
			} else {
				let data2 = JSON.parse(localStorage.getItem('param'));
				localStorage.setItem('param', '');
				this.idTipoDocu = data2.idTipoDocu;
				this.nroDocu = data2.nroDocu;
				this.empresaService.iniAct(this.idTipoDocu, this.nroDocu).subscribe(res => {
					this.lstTipoDocumento = res.lstTipoDocumento;
					this.lstLocales = res.lstLocalEmpresa;
					this.empresaBean = res.empresa;
					this.cargarDatos();
				}, error => {
					if(error.status == 403){
						this.router.navigate(['/login']);
					}
				});
			}
		}

	}

	abrirAgregar(){
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		this.modalOption.size = 'lg';
		const modalRef = this.modalService.open(AgregarLocalComponent , this.modalOption);
		modalRef.result.then((result: Local) => {
			if (result) {
				this.lstLocales.push(result);
			}
		});

	}

	editar(id:string, index: number){
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		this.modalOption.size = 'lg';
		let local = this.lstLocales[index];
		const modalRef = this.modalService.open(EditarLocalComponent , this.modalOption);
		modalRef.componentInstance.local = local;
		modalRef.result.then((result: Local) => {
			if (result) {
				this.lstLocales[index] = result;
			}
		});
	}

	eliminar(id:string, index: number){
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(EliminarLocalComponent , this.modalOption);
		modalRef.componentInstance.index = index;
		modalRef.result.then((result: number) => {
			if (result) {
				if(this.accion == 'n'){
					this.lstLocales.splice(result, 1);
				} else {
					let local = this.lstLocales[result];
					if(local.accion == 'N'){
						this.lstLocales.splice(result, 1);
					} else {
						local.accion = 'E';
						this.lstLocales[index] = local;
					}
				}
			}
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
		this.frmEmpresa.controls['imagen'].setValue(this.nombreArchivo);
		reader.readAsDataURL(files[0]); 
		reader.onload = (_event) => { 
		this.imgURL = reader.result; 
		}
	}

	registrarEmpresa(){
		this.submitted = true;
		this.error = '';
		if (this.frmEmpresa.invalid) {
			return;
		}
		this.loading = true;
		let params = this.frmEmpresa.value;
		let empresa: Empresa = {
			idTipoDocu: params.idTipoDocu,
			nroDocu: params.nroDocu,
			razonSocial: params.razonSocial,
			razonSocialCorto: params.razonSocialCorto,
			correoElect: params.correo,
			contacto: params.contacto,
			telefono: params.telefono,
			estado: params.estado,
			lstLocalEmpresa: this.lstLocales,
			imagen: this.imgURL == null || this.imgURL == ''?null:this.imgURL.replace(/^data:image\/[a-z]+;base64,/, "")
		};

		this.loading = false;
		if(this.accion == 'n'){
			this.empresaService.registrar(empresa)
			.pipe(first())
			.subscribe(
			data => {
				this.open();
			},
			error => {
				this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
				this.loading = false;
			});
		} else {
			empresa.idTipoDocu = this.empresaBean.idTipoDocu;
			this.empresaService.actualizar(empresa)
			.pipe(first())
			.subscribe(
			data => {
				localStorage.setItem('param', '');
				this.open();
			},
			error => {
				this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
				this.loading = false;
			});
		}
	}


	get f() { return this.frmEmpresa.controls; }

	cargarDatos(){
		this.frmEmpresa.controls['razonSocial'].setValue(this.empresaBean.razonSocial);
		this.frmEmpresa.controls['razonSocialCorto'].setValue(this.empresaBean.razonSocialCorto);
		this.frmEmpresa.controls['imagen'].setValue(this.empresaBean.urlImagen);
		this.frmEmpresa.controls['idTipoDocu'].setValue(this.empresaBean.idTipoDocu);
		this.frmEmpresa.controls['nroDocu'].setValue(this.empresaBean.nroDocu);
		this.frmEmpresa.controls['telefono'].setValue(this.empresaBean.telefono);
		this.frmEmpresa.controls['contacto'].setValue(this.empresaBean.contacto);
		this.frmEmpresa.controls['estado'].setValue(this.empresaBean.estado);
		this.frmEmpresa.controls['correo'].setValue(this.empresaBean.correoElect);
	}

	open() {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalComponent, this.modalOption);
		if(this.accion == 'n'){
			modalRef.componentInstance.mensaje = 'Se registro correctamente la empresa';
		} else {
			modalRef.componentInstance.mensaje = 'Se actualizó correctamente la empresa';
		}
		modalRef.result.then((result) => {
			this.router.navigate(['/empresas']);
		});
	}
	
	
	cambiarTipo(e){
		let tipo = e.target.value;

		if(tipo == '1' || tipo == '2')
			this.max = 8;
		else if(tipo == '3' || tipo == '5')
			this.max = 12;
		else if(tipo == '4')
			this.max = 11;
		else if(tipo == '6' || tipo == '7')
			this.max = 15;

		this.frmEmpresa.controls['nroDocu'].setValue(''); 

	}

	verImagen(){
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalImagenComponent, this.modalOption);
		modalRef.componentInstance.urlImagen = this.empresaBean.urlImagen;
	}
}
