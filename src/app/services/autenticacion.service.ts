import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as variables from '../utils/variables';

@Injectable({
	providedIn: 'root'
})
export class AutenticacionService {

	constructor(private http: HttpClient) { }

	login(username: string, password: string) {
		return this.http.post<HttpResponse<Object>>(	
				variables.url_base + variables.endpoint_login, 
				{ username, password },
				{	headers: new HttpHeaders()
        	.set('Content-Type', 'application/json'), 
        	observe: 'response'})
				.pipe(map(res => {
						if (res && res.headers) {
							let authorization = res.headers.get('Authorization');
							let token = authorization.replace("Bearer ", "");
							localStorage.setItem('token', token);
						}
				return res;
		}));
	}

	getUsuario(username: string):Observable<any>{
		const token = localStorage.getItem('token');
		const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
       	let params = new HttpParams();
       	params = params.append('username', username);

		return this.http.get(variables.url_base + variables.endpoint_usuario_login,  {
		        headers: httpHeaders,
		        params
		});
	}

	cambiarContrasena(params){
		return this.http.post<HttpResponse<Object>>(	
			variables.url_base + variables.endpoint_contrasena, 
			params ,
			{	headers: new HttpHeaders()
        		.set('Content-Type', 'application/json'),
        		observe: 'response'
        	}) .pipe(map(res => {
				return res;
			}
		));
	}

}
