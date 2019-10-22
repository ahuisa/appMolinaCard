import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BeneficioService } from '../../../services/beneficio.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../util/modal/modal.component';
var CodigoComponent = /** @class */ (function () {
    function CodigoComponent(activeModal, formBuilder, route, modalService, router, beneficioService) {
        this.activeModal = activeModal;
        this.formBuilder = formBuilder;
        this.route = route;
        this.modalService = modalService;
        this.router = router;
        this.beneficioService = beneficioService;
        this.submitted = false;
        this.loading = false;
        this.error = '';
        this.modalOption = {};
    }
    CodigoComponent.prototype.ngOnInit = function () {
        this.lstTipoDocumento = this.params.lstTipoDocumento;
        this.frmCodigo = this.formBuilder.group({
            tipo: ['', Validators.required],
            codigo: ['', Validators.required]
        });
    };
    Object.defineProperty(CodigoComponent.prototype, "f", {
        get: function () { return this.frmCodigo.controls; },
        enumerable: true,
        configurable: true
    });
    CodigoComponent.prototype.validar = function () {
        var _this = this;
        this.submitted = true;
        this.error = '';
        if (this.frmCodigo.invalid) {
            return;
        }
        this.loading = true;
        var param = this.frmCodigo.value;
        this.beneficioService.validar(this.params.idBeneficio, param.tipo, param.codigo).subscribe(function (res) {
            _this.open(res.mensaje);
        }, function (error) {
            if (error.status == 403) {
                _this.router.navigate(['/login']);
            }
        });
    };
    CodigoComponent.prototype.open = function (mensaje) {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = mensaje;
        modalRef.result.then(function (result) {
            _this.activeModal.close('');
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CodigoComponent.prototype, "params", void 0);
    CodigoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-codigo',
            templateUrl: './codigo.component.html',
            styleUrls: ['./codigo.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgbActiveModal,
            FormBuilder,
            ActivatedRoute,
            NgbModal,
            Router,
            BeneficioService])
    ], CodigoComponent);
    return CodigoComponent;
}());
export { CodigoComponent };
//# sourceMappingURL=codigo.component.js.map