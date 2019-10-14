import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as variables from '../utils/variables';
var PersonaService = /** @class */ (function () {
    function PersonaService(http) {
        this.http = http;
    }
    PersonaService.prototype.listar = function () {
        var token = localStorage.getItem('token');
        return this.http.get(variables.url_base + variables.endpoint_personas, { headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + token) });
    };
    PersonaService.prototype.iniRegi = function () {
        var token = localStorage.getItem('token');
        return this.http.get(variables.url_base + variables.endpoint_ini_personas, { headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + token) });
    };
    PersonaService.prototype.registrar = function (params) {
        var token = localStorage.getItem('token');
        return this.http.post(variables.url_base + variables.endpoint_personas, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    PersonaService.prototype.iniAct = function (idTipoDocu, nroDocu) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('idTipoDocu', idTipoDocu);
        params = params.append('nroDocu', nroDocu);
        return this.http.get(variables.url_base + variables.endpoint_personas_editar, {
            headers: httpHeaders,
            params: params
        });
    };
    PersonaService.prototype.actualizar = function (params) {
        var token = localStorage.getItem('token');
        return this.http.put(variables.url_base + variables.endpoint_personas, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    PersonaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PersonaService);
    return PersonaService;
}());
export { PersonaService };
//# sourceMappingURL=persona.service.js.map