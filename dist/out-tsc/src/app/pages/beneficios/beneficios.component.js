import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as variables from '../../utils/variables';
var BeneficiosComponent = /** @class */ (function () {
    function BeneficiosComponent(beneficioService, route, router) {
        this.beneficioService = beneficioService;
        this.route = route;
        this.router = router;
        this.dtOptions = variables.dtOptions;
        this.dtTrigger = new Subject();
    }
    BeneficiosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.beneficioService.listar().subscribe(function (res) {
            _this.beneficios = res;
            _this.rerender();
        }, function (error) {
            if (error.status == 403) {
                _this.router.navigate(['/login']);
            }
        });
    };
    BeneficiosComponent.prototype.ngAfterViewInit = function () {
        this.dtTrigger.next();
    };
    BeneficiosComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    BeneficiosComponent.prototype.rerender = function () {
        var _this = this;
        this.dtElement.dtInstance.then(function (dtInstance) {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            _this.dtTrigger.next();
        });
    };
    BeneficiosComponent.prototype.getDateFormat = function (fecha) {
        var dd = fecha.day;
        var mm = fecha.month;
        var dia = dd + '';
        var mes = mm + '';
        var yyyy = fecha.year;
        if (dd < 10) {
            dia = '0' + dd;
        }
        if (mm < 10) {
            mes = '0' + mm;
        }
        return dia + '/' + mes + '/' + yyyy;
    };
    BeneficiosComponent.prototype.irDetalle = function (idBeneficio) {
        var param = {
            'idBeneficio': idBeneficio
        };
        localStorage.setItem('param', JSON.stringify(param));
        this.router.navigate(['/editar-beneficio']);
    };
    tslib_1.__decorate([
        ViewChild(DataTableDirective),
        tslib_1.__metadata("design:type", DataTableDirective)
    ], BeneficiosComponent.prototype, "dtElement", void 0);
    BeneficiosComponent = tslib_1.__decorate([
        Component({
            selector: 'app-beneficios',
            templateUrl: './beneficios.component.html',
            styleUrls: ['./beneficios.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BeneficioService,
            ActivatedRoute,
            Router])
    ], BeneficiosComponent);
    return BeneficiosComponent;
}());
export { BeneficiosComponent };
//# sourceMappingURL=beneficios.component.js.map