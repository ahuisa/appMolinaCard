import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as variables from '../utils/variables';
var EmpresaService = /** @class */ (function () {
    function EmpresaService(http) {
        this.http = http;
    }
    EmpresaService.prototype.listar = function () {
        var token = localStorage.getItem('token');
        return this.http.get(variables.url_base + variables.endpoint_empresas, { headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + token) });
    };
    EmpresaService.prototype.iniRegi = function () {
        var token = localStorage.getItem('token');
        return this.http.get(variables.url_base + variables.endpoint_ini_empresas, { headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + token) });
    };
    EmpresaService.prototype.iniAct = function (idTipoDocu, nroDocu) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('idTipoDocu', idTipoDocu);
        params = params.append('nroDocu', nroDocu);
        return this.http.get(variables.url_base + variables.endpoint_iniAct_empresas, {
            headers: httpHeaders,
            params: params
        });
    };
    EmpresaService.prototype.registrar = function (params) {
        var token = localStorage.getItem('token');
        return this.http.post(variables.url_base + variables.endpoint_empresas, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    EmpresaService.prototype.actualizar = function (params) {
        var token = localStorage.getItem('token');
        return this.http.put(variables.url_base + variables.endpoint_empresas, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    EmpresaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EmpresaService);
    return EmpresaService;
}());
export { EmpresaService };
//# sourceMappingURL=empresa.service.js.map