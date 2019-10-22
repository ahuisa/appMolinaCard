import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var CabeceraComponent = /** @class */ (function () {
    function CabeceraComponent() {
    }
    CabeceraComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
    };
    CabeceraComponent = tslib_1.__decorate([
        Component({
            selector: 'app-cabecera',
            templateUrl: './cabecera.component.html',
            styleUrls: ['./cabecera.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CabeceraComponent);
    return CabeceraComponent;
}());
export { CabeceraComponent };
//# sourceMappingURL=cabecera.component.js.map