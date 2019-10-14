import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var EditarLocalComponent = /** @class */ (function () {
    function EditarLocalComponent(formBuilder, activeModal) {
        this.formBuilder = formBuilder;
        this.activeModal = activeModal;
        this.submitted = false;
        this.loading = false;
        this.error = '';
    }
    EditarLocalComponent.prototype.ngOnInit = function () {
        this.frmLocal = this.formBuilder.group({
            razonSocial: ['', Validators.required],
            longitud: ['', Validators.required],
            latitud: ['', Validators.required],
            direccion: ['', Validators.required],
            horario1: ['', Validators.required],
            horario2: ['', Validators.required]
        });
        this.cargarDatos();
    };
    EditarLocalComponent.prototype.editarLocal = function () {
        this.submitted = true;
        this.error = '';
        if (this.frmLocal.invalid) {
            return;
        }
        this.loading = true;
        var params = this.frmLocal.value;
        var accion = this.local.accion == 'N' ? 'N' : 'M';
        var local = {
            idLocalEmpresa: this.local.idLocalEmpresa,
            nombre: params.razonSocial,
            longitud: params.longitud,
            latitud: params.latitud,
            direccion: params.direccion,
            horario1: params.horario1,
            horario2: params.horario2,
            accion: accion
        };
        this.activeModal.close(local);
        this.loading = false;
    };
    EditarLocalComponent.prototype.cargarDatos = function () {
        this.frmLocal.controls['razonSocial'].setValue(this.local.nombre);
        this.frmLocal.controls['longitud'].setValue(this.local.longitud);
        this.frmLocal.controls['latitud'].setValue(this.local.latitud);
        this.frmLocal.controls['direccion'].setValue(this.local.direccion);
        this.frmLocal.controls['horario1'].setValue(this.local.horario1);
        this.frmLocal.controls['horario2'].setValue(this.local.horario2);
    };
    Object.defineProperty(EditarLocalComponent.prototype, "f", {
        get: function () { return this.frmLocal.controls; },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], EditarLocalComponent.prototype, "local", void 0);
    EditarLocalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-editar',
            templateUrl: './editar.component.html',
            styleUrls: ['./editar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            NgbActiveModal])
    ], EditarLocalComponent);
    return EditarLocalComponent;
}());
export { EditarLocalComponent };
//# sourceMappingURL=editar.component.js.map