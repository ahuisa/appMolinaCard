import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarPersonaComponent } from './agregar/agregar.component';
import { EditarPersonaComponent } from './editar/editar.component';
import { PersonaService } from '../../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as variables from '../../utils/variables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
var MantPersonaComponent = /** @class */ (function () {
    function MantPersonaComponent(modalService, personaService, route, router) {
        this.modalService = modalService;
        this.personaService = personaService;
        this.route = route;
        this.router = router;
        this.dtOptions = variables.dtOptions;
        this.dtTrigger = new Subject();
        this.modalOption = {};
    }
    MantPersonaComponent.prototype.abrirAgregar = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        this.modalOption.size = 'lg';
        var modalRef = this.modalService.open(AgregarPersonaComponent, this.modalOption);
        modalRef.result.then(function (result) {
            _this.listar();
        });
    };
    MantPersonaComponent.prototype.ngOnInit = function () {
        this.listar();
    };
    MantPersonaComponent.prototype.listar = function () {
        var _this = this;
        this.personaService.listar().subscribe(function (res) {
            _this.lstPersona = res;
            _this.rerender();
        }, function (error) {
            if (error.status == 403) {
                _this.router.navigate(['/login']);
            }
        });
    };
    MantPersonaComponent.prototype.cargarPersona = function (idTipoDocu, nroDocu) {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        this.modalOption.size = 'lg';
        var persona = {
            'idTipoDocu': idTipoDocu,
            'nroDocu': nroDocu
        };
        var modalRef = this.modalService.open(EditarPersonaComponent, this.modalOption);
        modalRef.componentInstance.persona = persona;
        modalRef.result.then(function (result) {
            _this.listar();
        });
    };
    MantPersonaComponent.prototype.ngAfterViewInit = function () {
        this.dtTrigger.next();
    };
    MantPersonaComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    MantPersonaComponent.prototype.rerender = function () {
        var _this = this;
        this.dtElement.dtInstance.then(function (dtInstance) {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            _this.dtTrigger.next();
        });
    };
    tslib_1.__decorate([
        ViewChild(DataTableDirective),
        tslib_1.__metadata("design:type", DataTableDirective)
    ], MantPersonaComponent.prototype, "dtElement", void 0);
    MantPersonaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-mant-persona',
            templateUrl: './mant-persona.component.html',
            styleUrls: ['./mant-persona.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgbModal,
            PersonaService,
            ActivatedRoute,
            Router])
    ], MantPersonaComponent);
    return MantPersonaComponent;
}());
export { MantPersonaComponent };
//# sourceMappingURL=mant-persona.component.js.map