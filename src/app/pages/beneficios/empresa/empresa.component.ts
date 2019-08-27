import { Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../../services/beneficio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CodigoComponent } from '../codigo/codigo.component';
import { ModalComponent } from '../../util/modal/modal.component';

@Component({
	selector: 'app-beneficiosempresa',
	templateUrl: './empresa.component.html',
	styleUrls: ['./empresa.component.scss']
})
export class BeneficiosEmpresaComponent implements OnInit {

	beneficios: any[];
	lstTipoDocumento: any[];
	modalOption: NgbModalOptions = {}; 
	user: any;
	constructor(private beneficioService: BeneficioService,
		private route: ActivatedRoute,
		private modalService: NgbModal,
		private router: Router) { }

	ngOnInit() {

  		this.user = JSON.parse(localStorage.getItem('user'));
		this.beneficioService.beneficioPorEmpresa(this.user.idTipoDocu,this.user.nroDocu).subscribe(res => {
			this.beneficios = res.lstBeneficios;
			this.lstTipoDocumento = res.lstTipoDocumento;

		}, error => {
			if(error.status == 401){
				this.router.navigate(['/login']);
			}
		});
	}
	cargarValidar(idBeneficio: string){

		this.modalOption.backdrop = 'static';
		this.modalOption.keyboard = false;
		
		let params = {
			idBeneficio : idBeneficio,
			lstTipoDocumento: this.lstTipoDocumento
		};

		const modalRef = this.modalService.open(CodigoComponent, this.modalOption);
    	modalRef.componentInstance.params = params;
		modalRef.result.then((result) => {
			//this.listar();
		});
	}

}
