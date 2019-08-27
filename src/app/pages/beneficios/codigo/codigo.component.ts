import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BeneficioService } from '../../../services/beneficio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';		
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../util/modal/modal.component';


@Component({
	selector: 'app-codigo',
	templateUrl: './codigo.component.html',
	styleUrls: ['./codigo.component.scss']
})
export class CodigoComponent implements OnInit {

	@Input() params: any;

	// formulario
	frmCodigo: FormGroup;
	submitted = false;
	loading = false;
	error = '';

	lstTipoDocumento: any[];
	modalOption: NgbModalOptions = {}; 

	constructor(public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private modalService: NgbModal,
		private router: Router,
		private beneficioService: BeneficioService) {}

	ngOnInit() {
		this.lstTipoDocumento = this.params.lstTipoDocumento;

		this.frmCodigo = this.formBuilder.group({
			tipo: ['', Validators.required],
			codigo: ['', Validators.required]
		});
	}


	get f() { return this.frmCodigo.controls; }


	validar(){
		this.submitted = true;
		this.error = '';
		if (this.frmCodigo.invalid) {
			return;
		}
		this.loading = true;

		let param = this.frmCodigo.value;
		this.beneficioService.validar(this.params.idBeneficio, param.tipo, param.codigo).subscribe(res => {
			this.open(res.mensaje);
		}, error => {
			if(error.status == 403){
				this.router.navigate(['/login']);
			}
		});
	}

	open(mensaje: string) {
		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		const modalRef = this.modalService.open(ModalComponent, this.modalOption);
		modalRef.componentInstance.mensaje = mensaje;
		modalRef.result.then((result) => {
			this.activeModal.close('');
		});
	}

}
