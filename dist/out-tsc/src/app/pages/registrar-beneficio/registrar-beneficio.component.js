import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../util/modal/modal.component';
var RegistrarBeneficioComponent = /** @class */ (function () {
    function RegistrarBeneficioComponent(beneficioService, route, formBuilder, modalService, router) {
        this.beneficioService = beneficioService;
        this.route = route;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.router = router;
        this.submitted = false;
        this.loading = false;
        this.error = '';
        this.lstGrupo = [];
        this.lstSegmentosGrupo = [];
        this.nombreArchivo = 'Selecciones imagen';
        this.nombreArchivoHddn = '';
        this.modalOption = {};
        this.listaSegmento = [];
    }
    RegistrarBeneficioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        for (var e = 0; e < this.user.lstRol.length; e++) {
            var item = this.user.lstRol[e];
            if (item.idRol == 2) {
                this.flagEmpresa = true;
                break;
            }
        }
        ;
        this.beneficioForm = this.formBuilder.group({
            lstEmpresas: ['', Validators.required],
            lstCategorias: ['', Validators.required],
            lstTipoBeneficios: ['', Validators.required],
            fecInicio: ['', Validators.required],
            fecFin: ['', Validators.required],
            descripcion1: ['', Validators.required],
            descripcion2: ['' /*, Validators.required*/],
            descripcion3: ['' /*, Validators.required*/],
            descripcion4: ['' /*, Validators.required*/],
            observacion1: ['', Validators.required],
            observacion2: ['' /*, Validators.required*/],
            observacion3: ['' /*, Validators.required*/],
            observacion4: ['' /*, Validators.required*/],
            observacion5: ['' /*, Validators.required*/],
            observacion6: ['' /*, Validators.required*/],
            terminos: ['', Validators.required],
            detalle: ['' /*, Validators.required*/],
            estado: ['',],
            imagen: ['' /*, Validators.required*/],
            imagenHddn: [this.nombreArchivoHddn, Validators.required],
        });
        this.beneficioService.iniRegi().subscribe(function (res) {
            _this.lstEmpresas = res.lstEmpresas;
            _this.lstCategorias = res.lstCategorias;
            _this.lstTipoBeneficios = res.lstTipoBeneficios;
            _this.lstSegmentos = res.lstSegmentos;
            _this.lstNivelMorosidad = res.lstNivelMorosidad;
            _this.lstEstadoBeneficio = res.lstEstadoBeneficio;
            _this.lstNivelMorosidad.forEach(function (morosidad) {
                morosidad.isChecked = false;
            });
            _this.crearListaMorosidad();
            if (_this.flagEmpresa) {
                _this.beneficioForm.controls['lstEmpresas'].setValue(_this.user.idTipoDocu + '-' + _this.user.nroDocu);
            }
        }, function (error) {
            if (error.status == 401) {
                _this.router.navigate(['/login']);
            }
        });
    };
    RegistrarBeneficioComponent.prototype.crearListaMorosidad = function () {
        for (var i = 0; i < this.lstSegmentos.length; i++) {
            var segmento = {
                idSegmento: this.lstSegmentos[i].idSegmento,
                maxRango: this.lstSegmentos[i].maxRango,
                minRango: this.lstSegmentos[i].minRango,
                descripcion: this.lstSegmentos[i].descripcion,
                morosidad: []
            };
            var listaMorosidad = [];
            for (var e = 0; e < this.lstNivelMorosidad.length; e++) {
                var morosidad = {
                    idNivelMorosidad: this.lstNivelMorosidad[e].idNivelMorosidad,
                    checked: false,
                    value: this.lstSegmentos[i].idSegmento + '-' + this.lstNivelMorosidad[e].idNivelMorosidad
                };
                listaMorosidad.push(morosidad);
            }
            ;
            segmento.morosidad = listaMorosidad;
            this.listaSegmento.push(segmento);
        }
        ;
    };
    RegistrarBeneficioComponent.prototype.seleccionarMorosidad = function (evt) {
        var isChecked = evt.target.checked;
        var value = evt.target.defaultValue;
        if (isChecked) {
            this.lstGrupo.push(value);
        }
        else {
            for (var i = 0; i < this.lstGrupo.length; i++) {
                if (this.lstGrupo[i] === value) {
                    this.lstGrupo.splice(i, 1);
                }
            }
        }
    };
    RegistrarBeneficioComponent.prototype.seleccionarColumna = function (evt) {
        var _this = this;
        var isChecked = evt.target.checked;
        var value = evt.target.defaultValue;
        this.listaSegmento.forEach(function (segmento) {
            segmento.morosidad.forEach(function (morosidad) {
                if (morosidad.idNivelMorosidad == value) {
                    morosidad.checked = isChecked;
                    if (isChecked) {
                        _this.lstGrupo.push(morosidad.value);
                    }
                    else {
                        for (var i = 0; i < _this.lstGrupo.length; i++) {
                            if (_this.lstGrupo[i] === morosidad.value) {
                                _this.lstGrupo.splice(i, 1);
                            }
                        }
                    }
                }
            });
        });
    };
    RegistrarBeneficioComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.error = '';
        if (this.beneficioForm.invalid) {
            return;
        }
        this.generarGrupoSegmento();
        var params = this.beneficioForm.value;
        var empresa = params.lstEmpresas.split("-");
        var jsonParam = {
            descripcion1: params.descripcion1,
            descripcion2: params.descripcion2,
            descripcion3: params.descripcion3,
            descripcion4: params.descripcion4,
            observacion1: params.observacion1,
            observacion2: params.observacion2,
            observacion3: params.observacion3,
            observacion4: params.observacion4,
            observacion5: params.observacion5,
            observacion6: params.observacion6,
            restricciones: params.terminos,
            detalleEstado: (this.flagEmpresa) ? '' : params.detalle,
            fecIni: null,
            fecFin: null,
            strFecIni: this.getDateFormat(params.fecInicio),
            strFecFin: this.getDateFormat(params.fecFin),
            idTipoDocu: empresa[0],
            nroDocu: empresa[1],
            idTipoBeneficio: params.lstTipoBeneficios,
            idCategoria: params.lstCategorias,
            idEstadoBeneficio: (this.flagEmpresa) ? '1' : params.estado,
            lstSegmentoBeneficio: this.lstSegmentosGrupo,
            imagen: this.imgURL.replace(/^data:image\/[a-z]+;base64,/, "")
        };
        this.loading = true;
        this.error = '';
        this.beneficioService.registrar(jsonParam)
            .pipe(first())
            .subscribe(function (data) {
            _this.open();
        }, function (error) {
            _this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
            _this.loading = false;
        });
    };
    RegistrarBeneficioComponent.prototype.generarGrupoSegmento = function () {
        for (var i = 0; i < this.lstGrupo.length; i++) {
            var ids = this.lstGrupo[i].split("-");
            var item = {
                'idSegmento': ids[0],
                'idNivelMorosidad': ids[1]
            };
            this.lstSegmentosGrupo.push(item);
        }
        ;
    };
    Object.defineProperty(RegistrarBeneficioComponent.prototype, "f", {
        get: function () { return this.beneficioForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegistrarBeneficioComponent.prototype.onFileChange = function (files) {
        var _this = this;
        if (files.length === 0) {
            this.beneficioForm.controls['imagenHddn'].setValue('');
            return;
        }
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.beneficioForm.controls['imagenHddn'].setValue('');
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        this.nombreArchivo = files[0].name;
        this.nombreArchivoHddn = files[0].name;
        this.beneficioForm.controls['imagenHddn'].setValue(this.nombreArchivoHddn);
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
        };
    };
    RegistrarBeneficioComponent.prototype.redireccionar = function () {
        this.router.navigate(['/beneficios']);
    };
    RegistrarBeneficioComponent.prototype.open = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = 'Se registró correctamente el beneficio';
        modalRef.result.then(function (result) {
            if (_this.flagEmpresa) {
                _this.router.navigate(['/beneficios-empresa']);
            }
            else {
                _this.router.navigate(['/beneficios']);
            }
        });
    };
    RegistrarBeneficioComponent.prototype.getDateFormat = function (fecha) {
        var d = new Date(fecha), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('/');
    };
    RegistrarBeneficioComponent = tslib_1.__decorate([
        Component({
            selector: 'app-registrar-beneficio',
            templateUrl: './registrar-beneficio.component.html',
            styleUrls: ['./registrar-beneficio.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BeneficioService,
            ActivatedRoute,
            FormBuilder,
            NgbModal,
            Router])
    ], RegistrarBeneficioComponent);
    return RegistrarBeneficioComponent;
}());
export { RegistrarBeneficioComponent };
//# sourceMappingURL=registrar-beneficio.component.js.map