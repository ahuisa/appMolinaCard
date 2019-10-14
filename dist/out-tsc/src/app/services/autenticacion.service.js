import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as variables from '../utils/variables';
var AutenticacionService = /** @class */ (function () {
    function AutenticacionService(http) {
        this.http = http;
    }
    AutenticacionService.prototype.login = function (username, password) {
        return this.http.post(variables.url_base + variables.endpoint_login, { username: username, password: password }, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json'),
            observe: 'response' })
            .pipe(map(function (res) {
            if (res && res.headers) {
                var authorization = res.headers.get('Authorization');
                var token = authorization.replace("Bearer ", "");
                localStorage.setItem('token', token);
            }
            return res;
        }));
    };
    AutenticacionService.prototype.getUsuario = function (username) {
        var token = localStorage.getItem('token');
        var httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
        var params = new HttpParams();
        params = params.append('username', username);
        return this.http.get(variables.url_base + variables.endpoint_usuario_login, {
            headers: httpHeaders,
            params: params
        });
    };
    AutenticacionService.prototype.cambiarContrasena = function (params) {
        return this.http.post(variables.url_base + variables.endpoint_contrasena, params, { headers: new HttpHeaders()
                .set('Content-Type', 'application/json'),
            observe: 'response'
        }).pipe(map(function (res) {
            return res;
        }));
    };
    AutenticacionService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AutenticacionService);
    return AutenticacionService;
}());
export { AutenticacionService };
//# sourceMappingURL=autenticacion.service.js.map