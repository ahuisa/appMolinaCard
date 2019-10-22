import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as variables from '../utils/variables';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

	constructor(private http: HttpClient) { }

	listar():Observable<any>{
		const token = localStorage.getItem('token');
		return this.http.get(variables.url_base + variables.endpoint_personas, {	headers: new HttpHeaders()
        	.set('Authorization', 'Bearer ' + token)});
	}

	iniRegi():Observable<any>{
		const token = localStorage.getItem('token');
		return this.http.get(variables.url_base + variables.endpoint_ini_personas, {	headers: new HttpHeaders()
        	.set('Authorization', 'Bearer ' + token)});
	}

	registrar(params: any) {
		const token = localStorage.getItem('token');
		return this.http.post<HttpResponse<Object>>(	
			variables.url_base + variables.endpoint_personas, 
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

	iniAct(idTipoDocu: string, nroDocu: string):Observable<any>{
		const token = localStorage.getItem('token');
		const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
       	let params = new HttpParams();
       	params = params.append('idTipoDocu', idTipoDocu);
       	params = params.append('nroDocu', nroDocu);

		return this.http.get(variables.url_base + variables.endpoint_personas_editar,  {
		        headers: httpHeaders,
		        params
		});
	}

	actualizar(params: any) {
		const token = localStorage.getItem('token');
		return this.http.put<HttpResponse<Object>>(	
			variables.url_base + variables.endpoint_personas, 
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

	

	activarDesactivar(params: any){
		const token = localStorage.getItem('token');
		return this.http.put<HttpResponse<Object>>(	
			variables.url_base + variables.endpoint_desActivarPersona, 
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

}
