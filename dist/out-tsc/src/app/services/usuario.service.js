import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as variables from '../utils/variables';
var UsuarioService = /** @class */ (function () {
    function UsuarioService(http) {
        this.http = http;
    }
    UsuarioService.prototype.listar = function () {
        var token = localStorage.getItem('token');
        return this.http.get(variables.url_base + variables.endpoint_usuarios, { headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + token) });
    };
    UsuarioService.prototype.iniRegi = function () {
        var token = localStorage.getItem('token');
        return this.http.get(variables.url_base + variables.endpoint_ini_usuarios, { headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + token) });
    };
    UsuarioService.prototype.iniAct = function (username) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('username', username);
        return this.http.get(variables.url_base + variables.endpoint_iniAct_usuarios, {
            headers: httpHeaders,
            params: params
        });
    };
    UsuarioService.prototype.getUsuario = function (username) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('username', username);
        return this.http.get(variables.url_base + variables.endpoint_usuarios_consultar, {
            headers: httpHeaders,
            params: params
        });
    };
    UsuarioService.prototype.getPersona = function (idTipoDocu, nroDocu, descTipoDocu, descTipoUsu) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('descTipoDocu', descTipoDocu);
        params = params.append('descTipoUsu', descTipoUsu);
        params = params.append('idTipoDocu', idTipoDocu);
        params = params.append('nroDocu', nroDocu);
        return this.http.get(variables.url_base + variables.endpoint_usuario_persona, {
            headers: httpHeaders,
            params: params
        });
    };
    UsuarioService.prototype.getContribuyente = function (idTipoDocu, nroDocu) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('idTipoDocu', idTipoDocu);
        params = params.append('nroDocu', nroDocu);
        return this.http.get(variables.url_base + variables.endpoint_usuario_contribuyente, {
            headers: httpHeaders,
            params: params
        });
    };
    UsuarioService.prototype.registrar = function (params) {
        var token = localStorage.getItem('token');
        return this.http.post(variables.url_base + variables.endpoint_usuarios, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    UsuarioService.prototype.actualizar = function (params) {
        var token = localStorage.getItem('token');
        return this.http.put(variables.url_base + variables.endpoint_usuarios, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    UsuarioService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UsuarioService);
    return UsuarioService;
}());
export { UsuarioService };
//# sourceMappingURL=usuario.service.js.map