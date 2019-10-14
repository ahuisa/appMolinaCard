import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
var MsesionComponent = /** @class */ (function () {
    function MsesionComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    MsesionComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
    };
    MsesionComponent.prototype.cerrar = function () {
        localStorage.clear();
        this.router.navigate(['/login']);
    };
    MsesionComponent = tslib_1.__decorate([
        Component({
            selector: 'app-msesion',
            templateUrl: './msesion.component.html',
            styleUrls: ['./msesion.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            Router])
    ], MsesionComponent);
    return MsesionComponent;
}());
export { MsesionComponent };
//# sourceMappingURL=msesion.component.js.map