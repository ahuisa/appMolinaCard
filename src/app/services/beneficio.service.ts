import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as variables from '../utils/variables';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {
	constructor(private http: HttpClient) { }

	listar():Observable<any>{
		const token = localStorage.getItem('token');
		return this.http.get(variables.url_base + variables.endpoint_beneficios, {	headers: new HttpHeaders()
        	.set('Authorization', 'Bearer ' + token)});
	}

	iniRegi():Observable<any>{
		const token = localStorage.getItem('token');
		return this.http.get(variables.url_base + variables.endpoint_ini_beneficios, {	headers: new HttpHeaders()
        	.set('Authorization', 'Bearer ' + token)});
	}

	iniAct(idBeneficio: any):Observable<any>{
		const token = localStorage.getItem('token');
		const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
       	let params = new HttpParams();
       	params = params.append('idBeneficio', idBeneficio);
		let httpParams = new HttpParams()
                        .set('idBeneficio', idBeneficio);

		return this.http.get(variables.url_base + variables.endpoint_iniAct_beneficios,  {
		        headers: httpHeaders,
		        params
		});
	}

	registrar(params: any) {
		const token = localStorage.getItem('token');
		return this.http.post<HttpResponse<Object>>(	
			variables.url_base + variables.endpoint_beneficios, 
			params ,
			{	headers: new HttpHeaders()
        		.set('Content-Type', 'application/json')
        		.set('Authorization', 'Bearer ' + token), 
        		observe: 'response'
        	}) .pipe(map(res => {
				return res;
			}
		));
	}

	actualizar(params: any) {
		const token = localStorage.getItem('token');
		return this.http.put<HttpResponse<Object>>(	
			variables.url_base + variables.endpoint_beneficios, 
			params ,
			{	headers: new HttpHeaders()
        		.set('Content-Type', 'application/json')
        		.set('Authorization', 'Bearer ' + token), 
        		observe: 'response'
        	}) .pipe(map(res => {
				return res;
			}
		));
	}

	beneficioPorEmpresa(idTipoDocu:string, nroDocu:string ):Observable<any>{
		const token = localStorage.getItem('token');
		const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
       	let params = new HttpParams();
       	//params = params.append('idTipoDocu', '4');
       	//params = params.append('nroDocu', '22222222222');
       	params = params.append('idTipoDocu', idTipoDocu);
       	params = params.append('nroDocu', nroDocu);

		return this.http.get(variables.url_base + variables.endpoint_beneficios_empresa,  {
		        headers: httpHeaders,
		        params
		});
	}

	validar(idBeneficio:string, tipo:string, codigo:string):Observable<any>{
		let flagDni = tipo == '0'?false:true;
		const token = localStorage.getItem('token');
		const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
       	let params = new HttpParams();
       	params = params.append('idBeneficio', idBeneficio);
       	params = params.append('idTipoDocu', (tipo == '0')?'':tipo);
       	params = params.append('nroDocu', (tipo == '0')?'':codigo);
       	params = params.append('codigoCanje', (tipo == '0')?codigo:'');
       	params = params.append('canjearXDni', flagDni.toString());

		return this.http.get(variables.url_base + variables.endpoint_validar,  {
		        headers: httpHeaders,
		        params
		});
	}
}
