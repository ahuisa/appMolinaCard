import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as variables from '../../utils/variables';

@Component({
	selector: 'app-beneficios',
	templateUrl: './beneficios.component.html',
	styleUrls: ['./beneficios.component.scss']
})
export class BeneficiosComponent implements OnInit {
	
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = variables.dtOptions;

	dtTrigger: Subject<any> = new Subject();

	beneficios: any[];
	
	constructor(private beneficioService: BeneficioService,
							private route: ActivatedRoute,
							private router: Router) { }

	ngOnInit() {
		this.beneficioService.listar().subscribe(res => {
			this.beneficios = res;
			this.rerender();
		}, error => {
			if(error.status == 403){
				this.router.navigate(['/login']);
			}
		});
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();
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
	irDetalle(idBeneficio){
		let param = {
			'idBeneficio' : idBeneficio
		};
		localStorage.setItem('param', JSON.stringify(param));
    	this.router.navigate(['/editar-beneficio']);
  	}

}
