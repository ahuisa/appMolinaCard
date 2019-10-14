import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as variables from '../utils/variables';
var BeneficioService = /** @class */ (function () {
    function BeneficioService(http) {
        this.http = http;
    }
    BeneficioService.prototype.listar = function () {
        var token = localStorage.getItem('token');
        return this.http.get(variables.url_base + variables.endpoint_beneficios, { headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + token) });
    };
    BeneficioService.prototype.iniRegi = function () {
        var token = localStorage.getItem('token');
        return this.http.get(variables.url_base + variables.endpoint_ini_beneficios, { headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + token) });
    };
    BeneficioService.prototype.iniAct = function (idBeneficio) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('idBeneficio', idBeneficio);
        var httpParams = new HttpParams()
            .set('idBeneficio', idBeneficio);
        return this.http.get(variables.url_base + variables.endpoint_iniAct_beneficios, {
            headers: httpHeaders,
            params: params
        });
    };
    BeneficioService.prototype.registrar = function (params) {
        var token = localStorage.getItem('token');
        return this.http.post(variables.url_base + variables.endpoint_beneficios, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    BeneficioService.prototype.actualizar = function (params) {
        var token = localStorage.getItem('token');
        return this.http.put(variables.url_base + variables.endpoint_beneficios, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    BeneficioService.prototype.beneficioPorEmpresa = function (idTipoDocu, nroDocu) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        //params = params.append('idTipoDocu', '4');
        //params = params.append('nroDocu', '22222222222');
        params = params.append('idTipoDocu', idTipoDocu);
        params = params.append('nroDocu', nroDocu);
        return this.http.get(variables.url_base + variables.endpoint_beneficios_empresa, {
            headers: httpHeaders,
            params: params
        });
    };
    BeneficioService.prototype.validar = function (idBeneficio, tipo, codigo) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('idBeneficio', idBeneficio);
        params = params.append('idTipoDocu', (tipo == '0') ? '' : tipo);
        params = params.append('nroDocu', (tipo == '0') ? '' : codigo);
        params = params.append('codigoCanje', (tipo == '0') ? codigo : '');
        return this.http.get(variables.url_base + variables.endpoint_validar, {
            headers: httpHeaders,
            params: params
        });
    };
    BeneficioService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], BeneficioService);
    return BeneficioService;
}());
export { BeneficioService };
//# sourceMappingURL=beneficio.service.js.map