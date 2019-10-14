import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
        this.lstMenu = [
            { 'router': '/beneficios-empresa', 'label': 'Beneficios', 'visible': false },
            { 'router': '/beneficios', 'label': 'Beneficios', 'visible': false },
            { 'router': '/empresas', 'label': 'Empresas', 'visible': false },
            { 'router': '/personas', 'label': 'Personas', 'visible': false },
            { 'router': '/usuarios', 'label': 'Usuarios', 'visible': false }
        ];
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        for (var e = 0; e < this.user.lstRol.length; e++) {
            var item = this.user.lstRol[e];
            if (item.idRol == 1) {
                this.lstMenu[1].visible = true;
                this.lstMenu[2].visible = true;
                this.lstMenu[3].visible = true;
                this.lstMenu[4].visible = true;
            }
            else if (item.idRol == 3) {
                this.lstMenu[1].visible = true;
                this.lstMenu[2].visible = true;
                this.lstMenu[3].visible = true;
                this.lstMenu[4].visible = true;
            }
            else if (item.idRol == 2) {
                this.lstMenu[0].visible = true;
            }
        }
        ;
    };
    MenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map