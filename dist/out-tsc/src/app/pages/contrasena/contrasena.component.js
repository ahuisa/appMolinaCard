import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { ModalComponent } from '../util/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
var ContrasenaComponent = /** @class */ (function () {
    function ContrasenaComponent(autenticacionService, route, 
    //public activeModal: NgbActiveModal,
    formBuilder, modalService, router) {
        this.autenticacionService = autenticacionService;
        this.route = route;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.router = router;
        this.submitted = false;
        this.loading = false;
        this.error = '';
        this.isSubmit = false;
        this.modalOption = {};
    }
    ContrasenaComponent.prototype.ngOnInit = function () {
        this.frmContrasena = this.formBuilder.group({
            contrasena: ['', [Validators.required, Validators.minLength(6)]],
            contrasenar: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.token = this.route.snapshot.paramMap.get('token');
    };
    Object.defineProperty(ContrasenaComponent.prototype, "f", {
        get: function () { return this.frmContrasena.controls; },
        enumerable: true,
        configurable: true
    });
    ContrasenaComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.error = '';
        if (this.frmContrasena.invalid) {
            return;
        }
        var param = this.frmContrasena.value;
        if (param.contrasena != param.contrasenar) {
            this.mensaje('Las contraseñas deben ser iguales');
            return;
        }
        this.loading = true;
        var jsonParam = {
            token: this.token,
            password: param.contrasena
        };
        this.autenticacionService.cambiarContrasena(jsonParam)
            .pipe(first())
            .subscribe(function (data) {
            _this.open(data.mensaje);
        }, function (error) {
            _this.error = 'Ocurrió un error al cambiar la contraseña, vuelva a intentarlo.';
            _this.loading = false;
        });
    };
    ContrasenaComponent.prototype.open = function (mensaje) {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = mensaje;
        modalRef.result.then(function (result) {
            _this.frmContrasena.reset();
            _this.isSubmit = true;
        });
    };
    ContrasenaComponent.prototype.mensaje = function (mensaje) {
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = mensaje;
    };
    ContrasenaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-contrasena',
            templateUrl: './contrasena.component.html',
            styleUrls: ['./contrasena.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AutenticacionService,
            ActivatedRoute,
            FormBuilder,
            NgbModal,
            Router])
    ], ContrasenaComponent);
    return ContrasenaComponent;
}());
export { ContrasenaComponent };
//# sourceMappingURL=contrasena.component.js.map