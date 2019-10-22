import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var EliminarLocalComponent = /** @class */ (function () {
    function EliminarLocalComponent(activeModal) {
        this.activeModal = activeModal;
    }
    EliminarLocalComponent.prototype.ngOnInit = function () {
    };
    EliminarLocalComponent.prototype.confirmar = function () {
        this.activeModal.close(this.index);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], EliminarLocalComponent.prototype, "index", void 0);
    EliminarLocalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-eliminar',
            templateUrl: './eliminar.component.html',
            styleUrls: ['./eliminar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgbActiveModal])
    ], EliminarLocalComponent);
    return EliminarLocalComponent;
}());
export { EliminarLocalComponent };
//# sourceMappingURL=eliminar.component.js.map