import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { first } from 'rxjs/operators';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, autenticacionService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.autenticacionService = autenticacionService;
        this.submitted = false;
        this.loading = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.error = '';
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.autenticacionService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(function (data) {
            _this.autenticacionService.getUsuario(_this.f.username.value).subscribe(function (res) {
                localStorage.setItem('user', JSON.stringify(res));
                var flagEmpresa = false;
                for (var i = 0; i < res.lstRol.length; i++) {
                    if (res.lstRol[i].idRol == 2) {
                        flagEmpresa = true;
                    }
                }
                ;
                if (flagEmpresa)
                    _this.router.navigate(['/beneficios-empresa']);
                else
                    _this.router.navigate(['/beneficios']);
            }, function (error) {
                if (error.status == 401) {
                    _this.error = 'Servicio no disponible';
                }
            });
        }, function (error) {
            _this.error = 'Usuario no existe';
            _this.loading = false;
        });
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute,
            Router,
            AutenticacionService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map