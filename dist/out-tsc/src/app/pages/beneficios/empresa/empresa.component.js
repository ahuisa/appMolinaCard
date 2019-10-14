import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BeneficioService } from '../../../services/beneficio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CodigoComponent } from '../codigo/codigo.component';
var BeneficiosEmpresaComponent = /** @class */ (function () {
    function BeneficiosEmpresaComponent(beneficioService, route, modalService, router) {
        this.beneficioService = beneficioService;
        this.route = route;
        this.modalService = modalService;
        this.router = router;
        this.modalOption = {};
    }
    BeneficiosEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.beneficioService.beneficioPorEmpresa(this.user.idTipoDocu, this.user.nroDocu).subscribe(function (res) {
            _this.beneficios = res.lstBeneficios;
            _this.lstTipoDocumento = res.lstTipoDocumento;
        }, function (error) {
            if (error.status == 401) {
                _this.router.navigate(['/login']);
            }
        });
    };
    BeneficiosEmpresaComponent.prototype.cargarValidar = function (idBeneficio) {
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var params = {
            idBeneficio: idBeneficio,
            lstTipoDocumento: this.lstTipoDocumento
        };
        var modalRef = this.modalService.open(CodigoComponent, this.modalOption);
        modalRef.componentInstance.params = params;
        modalRef.result.then(function (result) {
            //this.listar();
        });
    };
    BeneficiosEmpresaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-beneficiosempresa',
            templateUrl: './empresa.component.html',
            styleUrls: ['./empresa.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BeneficioService,
            ActivatedRoute,
            NgbModal,
            Router])
    ], BeneficiosEmpresaComponent);
    return BeneficiosEmpresaComponent;
}());
export { BeneficiosEmpresaComponent };
//# sourceMappingURL=empresa.component.js.map