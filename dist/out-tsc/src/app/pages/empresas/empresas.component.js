import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as variables from '../../utils/variables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';
var EmpresasComponent = /** @class */ (function () {
    function EmpresasComponent(empresaService, route, dataService, router) {
        this.empresaService = empresaService;
        this.route = route;
        this.dataService = dataService;
        this.router = router;
        this.dtOptions = variables.dtOptions;
        this.dtTrigger = new Subject();
    }
    EmpresasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.empresaService.listar().subscribe(function (res) {
            _this.empresas = res;
            _this.rerender();
        }, function (error) {
            if (error.status == 403) {
                _this.router.navigate(['/login']);
            }
        });
    };
    EmpresasComponent.prototype.ngAfterViewInit = function () {
        this.dtTrigger.next();
    };
    EmpresasComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    EmpresasComponent.prototype.rerender = function () {
        var _this = this;
        this.dtElement.dtInstance.then(function (dtInstance) {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            _this.dtTrigger.next();
        });
    };
    EmpresasComponent.prototype.irDetalle = function (idTipoDocu, nroDocu) {
        var param = {
            'idTipoDocu': idTipoDocu,
            'nroDocu': nroDocu
        };
        localStorage.setItem('param', JSON.stringify(param));
        this.router.navigate(['/empresa/' + 'e']);
    };
    tslib_1.__decorate([
        ViewChild(DataTableDirective),
        tslib_1.__metadata("design:type", DataTableDirective)
    ], EmpresasComponent.prototype, "dtElement", void 0);
    EmpresasComponent = tslib_1.__decorate([
        Component({
            selector: 'app-empresas',
            templateUrl: './empresas.component.html',
            styleUrls: ['./empresas.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [EmpresaService,
            ActivatedRoute,
            DataService,
            Router])
    ], EmpresasComponent);
    return EmpresasComponent;
}());
export { EmpresasComponent };
//# sourceMappingURL=empresas.component.js.map