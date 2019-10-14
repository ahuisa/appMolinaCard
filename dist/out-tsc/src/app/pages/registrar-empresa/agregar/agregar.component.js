import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var AgregarLocalComponent = /** @class */ (function () {
    function AgregarLocalComponent(formBuilder, activeModal) {
        this.formBuilder = formBuilder;
        this.activeModal = activeModal;
        this.submitted = false;
        this.loading = false;
        this.error = '';
    }
    AgregarLocalComponent.prototype.ngOnInit = function () {
        this.frmLocal = this.formBuilder.group({
            razonSocial: ['', Validators.required],
            longitud: ['', Validators.required],
            latitud: ['', Validators.required],
            direccion: ['', Validators.required],
            horario1: ['', Validators.required],
            horario2: ['', Validators.required]
        });
    };
    AgregarLocalComponent.prototype.agregarLocal = function () {
        this.submitted = true;
        this.error = '';
        if (this.frmLocal.invalid) {
            return;
        }
        this.loading = true;
        var params = this.frmLocal.value;
        var local = {
            nombre: params.razonSocial,
            longitud: params.longitud,
            latitud: params.latitud,
            direccion: params.direccion,
            horario1: params.horario1,
            horario2: params.horario2,
            accion: 'N'
        };
        this.activeModal.close(local);
        this.loading = false;
    };
    Object.defineProperty(AgregarLocalComponent.prototype, "f", {
        get: function () { return this.frmLocal.controls; },
        enumerable: true,
        configurable: true
    });
    AgregarLocalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-agregar',
            templateUrl: './agregar.component.html',
            styleUrls: ['./agregar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            NgbActiveModal])
    ], AgregarLocalComponent);
    return AgregarLocalComponent;
}());
export { AgregarLocalComponent };
//# sourceMappingURL=agregar.component.js.map