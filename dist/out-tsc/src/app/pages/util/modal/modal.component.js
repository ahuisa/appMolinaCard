import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var ModalComponent = /** @class */ (function () {
    function ModalComponent(activeModal) {
        this.activeModal = activeModal;
    }
    ModalComponent.prototype.cerrar = function () {
        this.activeModal.close('');
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ModalComponent.prototype, "mensaje", void 0);
    ModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modal',
            templateUrl: './modal.component.html',
            styleUrls: ['./modal.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgbActiveModal])
    ], ModalComponent);
    return ModalComponent;
}());
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map