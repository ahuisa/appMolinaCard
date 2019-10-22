import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarUsuarioComponent } from './agregar/agregar.component';
import { EditarUsuarioComponent } from './editar/editar.component';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as variables from '../../utils/variables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
var UsuarioComponent = /** @class */ (function () {
    function UsuarioComponent(modalService, usuarioService, route, router) {
        this.modalService = modalService;
        this.usuarioService = usuarioService;
        this.route = route;
        this.router = router;
        this.dtOptions = variables.dtOptions;
        this.dtTrigger = new Subject();
        this.modalOption = {};
    }
    UsuarioComponent.prototype.ngOnInit = function () {
        this.listar();
    };
    UsuarioComponent.prototype.abrirAgregar = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(AgregarUsuarioComponent, this.modalOption);
        modalRef.result.then(function (result) {
            _this.listar();
        });
    };
    UsuarioComponent.prototype.listar = function () {
        var _this = this;
        this.usuarioService.listar().subscribe(function (res) {
            _this.lstUsuario = res;
            _this.rerender();
        }, function (error) {
            if (error.status == 401) {
                _this.router.navigate(['/login']);
            }
        });
    };
    UsuarioComponent.prototype.cargarUsuario = function (username) {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var usuario = {
            'username': username
        };
        var modalRef = this.modalService.open(EditarUsuarioComponent, this.modalOption);
        modalRef.componentInstance.usuario = usuario;
        modalRef.result.then(function (result) {
            _this.listar();
        });
    };
    UsuarioComponent.prototype.ngAfterViewInit = function () {
        this.dtTrigger.next();
    };
    UsuarioComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    UsuarioComponent.prototype.rerender = function () {
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
    ], UsuarioComponent.prototype, "dtElement", void 0);
    UsuarioComponent = tslib_1.__decorate([
        Component({
            selector: 'app-usuario',
            templateUrl: './usuario.component.html',
            styleUrls: ['./usuario.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgbModal,
            UsuarioService,
            ActivatedRoute,
            Router])
    ], UsuarioComponent);
    return UsuarioComponent;
}());
export { UsuarioComponent };
//# sourceMappingURL=usuario.component.js.map