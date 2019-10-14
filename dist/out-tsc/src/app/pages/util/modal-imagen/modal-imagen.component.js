import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var ModalImagenComponent = /** @class */ (function () {
    function ModalImagenComponent(activeModal) {
        this.activeModal = activeModal;
    }
    ModalImagenComponent.prototype.cerrar = function () {
        this.activeModal.close('');
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ModalImagenComponent.prototype, "urlImagen", void 0);
    ModalImagenComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modal-imagen',
            templateUrl: './modal-imagen.component.html',
            styleUrls: ['./modal-imagen.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgbActiveModal])
    ], ModalImagenComponent);
    return ModalImagenComponent;
}());
export { ModalImagenComponent };
//# sourceMappingURL=modal-imagen.component.js.map