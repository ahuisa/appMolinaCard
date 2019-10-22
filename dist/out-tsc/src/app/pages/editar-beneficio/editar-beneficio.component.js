import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../util/modal/modal.component';
import { ModalImagenComponent } from '../util/modal-imagen/modal-imagen.component';
var EditarBeneficioComponent = /** @class */ (function () {
    function EditarBeneficioComponent(beneficioService, route, formBuilder, modalService, router) {
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
        this.listaSegmento = [];
        this.modalOption = {};
    }
    EditarBeneficioComponent.prototype.ngOnInit = function () {
        var _this = this;
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
            estado: ['', Validators.required],
            imagen: ['' /*, Validators.required*/],
        });
        var data = localStorage.getItem('param');
        if (data == '') {
            this.router.navigate(['/beneficios']);
        }
        else {
            var data2 = JSON.parse(localStorage.getItem('param'));
            this.idBeneficio = data2.idBeneficio;
            localStorage.setItem('param', '');
            //this.idBeneficio = this.route.snapshot.paramMap.get('id');
            this.beneficioService.iniAct(this.idBeneficio).subscribe(function (res) {
                _this.lstEmpresas = res.lstEmpresas;
                _this.lstCategorias = res.lstCategorias;
                _this.lstTipoBeneficios = res.lstTipoBeneficios;
                _this.lstSegmentos = res.lstSegmentos;
                _this.lstNivelMorosidad = res.lstNivelMorosidad;
                _this.lstEstadoBeneficio = res.lstEstadoBeneficio;
                _this.beneficioResponse = res.beneficio;
                _this.segmentoBeneficioResponse = res.lstSegmentoBeneficio;
                _this.inicializarFormulario();
                for (var i = 0; i < _this.lstSegmentos.length; i++) {
                    var segmento = {
                        idSegmento: _this.lstSegmentos[i].idSegmento,
                        maxRango: _this.lstSegmentos[i].maxRango,
                        minRango: _this.lstSegmentos[i].minRango,
                        descripcion: _this.lstSegmentos[i].descripcion,
                        morosidad: []
                    };
                    var listaMorosidad = [];
                    for (var e = 0; e < _this.lstNivelMorosidad.length; e++) {
                        var morosidad = void 0;
                        var flag = false;
                        for (var o = 0; o < _this.segmentoBeneficioResponse.length; o++) {
                            var seg = _this.segmentoBeneficioResponse[o];
                            if (seg.idSegmento == _this.lstSegmentos[i].idSegmento &&
                                seg.idNivelMorosidad == _this.lstNivelMorosidad[e].idNivelMorosidad) {
                                morosidad = {
                                    idNivelMorosidad: _this.lstNivelMorosidad[e].idNivelMorosidad,
                                    checked: true,
                                    value: _this.lstSegmentos[i].idSegmento + '-' + _this.lstNivelMorosidad[e].idNivelMorosidad
                                };
                                flag = true;
                                listaMorosidad.push(morosidad);
                                _this.lstGrupo.push(morosidad.value);
                            }
                        }
                        ;
                        if (!flag) {
                            morosidad = {
                                idNivelMorosidad: _this.lstNivelMorosidad[e].idNivelMorosidad,
                                checked: false,
                                value: _this.lstSegmentos[i].idSegmento + '-' + _this.lstNivelMorosidad[e].idNivelMorosidad
                            };
                            listaMorosidad.push(morosidad);
                        }
                    }
                    ;
                    segmento.morosidad = listaMorosidad;
                    _this.listaSegmento.push(segmento);
                }
                ;
            }, function (error) {
                if (error.status == 403) {
                    _this.router.navigate(['/login']);
                }
            });
        }
    };
    EditarBeneficioComponent.prototype.inicializarFormulario = function () {
        this.beneficioForm.controls['lstEmpresas'].setValue(this.beneficioResponse.idTipoDocu + '-' + this.beneficioResponse.nroDocu);
        this.beneficioForm.controls['lstCategorias'].setValue(this.beneficioResponse.idCategoria);
        this.beneficioForm.controls['lstTipoBeneficios'].setValue(this.beneficioResponse.idTipoBeneficio);
        var fechaInicio = new Date(this.beneficioResponse.fecIni);
        fechaInicio.setDate(fechaInicio.getDate() + 1);
        var fechaFin = new Date(this.beneficioResponse.fecFin);
        //fechaFin.setDate(fechaFin.getDate() + 1)
        this.beneficioForm.controls['fecInicio'].setValue(fechaInicio);
        this.beneficioForm.controls['fecFin'].setValue(fechaFin);
        this.beneficioForm.controls['descripcion1'].setValue(this.beneficioResponse.descripcion1);
        this.beneficioForm.controls['descripcion2'].setValue(this.beneficioResponse.descripcion2);
        this.beneficioForm.controls['descripcion3'].setValue(this.beneficioResponse.descripcion3);
        this.beneficioForm.controls['descripcion4'].setValue(this.beneficioResponse.descripcion4);
        this.beneficioForm.controls['observacion1'].setValue(this.beneficioResponse.observacion1);
        this.beneficioForm.controls['observacion2'].setValue(this.beneficioResponse.observacion2);
        this.beneficioForm.controls['observacion3'].setValue(this.beneficioResponse.observacion3);
        this.beneficioForm.controls['observacion4'].setValue(this.beneficioResponse.observacion4);
        this.beneficioForm.controls['observacion5'].setValue(this.beneficioResponse.observacion5);
        this.beneficioForm.controls['observacion6'].setValue(this.beneficioResponse.observacion6);
        this.beneficioForm.controls['terminos'].setValue(this.beneficioResponse.restricciones);
        this.beneficioForm.controls['detalle'].setValue(this.beneficioResponse.detalleEstado);
        this.beneficioForm.controls['estado'].setValue(this.beneficioResponse.idEstadoBeneficio);
        this.beneficioForm.controls['imagen'].setValue(this.beneficioResponse.urlImagen);
    };
    EditarBeneficioComponent.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        this.submitted = true;
        this.error = '';
        var params = this.beneficioForm.value;
        if (this.beneficioForm.invalid) {
            return;
        }
        this.generarGrupoSegmento();
        var empresa = params.lstEmpresas.split("-");
        var jsonParam = {
            idBeneficio: this.idBeneficio,
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
            detalleEstado: params.detalle,
            fecIni: null,
            fecFin: null,
            strFecIni: this.getDateFormat(params.fecInicio),
            strFecFin: this.getDateFormat(params.fecFin),
            idTipoDocu: empresa[0],
            nroDocu: empresa[1],
            idTipoBeneficio: params.lstTipoBeneficios,
            idCategoria: params.lstCategorias,
            idEstadoBeneficio: params.estado,
            lstSegmentoBeneficio: this.lstSegmentosGrupo,
            imagen: this.imgURL == null ? null : this.imgURL.replace(/^data:image\/[a-z]+;base64,/, "")
        };
        this.loading = true;
        this.error = '';
        this.beneficioService.actualizar(jsonParam)
            .pipe(first())
            .subscribe(function (data) {
            _this.open();
        }, function (error) {
            _this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
            _this.loading = false;
        });
    };
    EditarBeneficioComponent.prototype.generarGrupoSegmento = function () {
        this.lstSegmentosGrupo = [];
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
    EditarBeneficioComponent.prototype.seleccionarMorosidad = function (evt) {
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
    EditarBeneficioComponent.prototype.seleccionarColumna = function (evt) {
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
    Object.defineProperty(EditarBeneficioComponent.prototype, "f", {
        get: function () { return this.beneficioForm.controls; },
        enumerable: true,
        configurable: true
    });
    EditarBeneficioComponent.prototype.getDateFormat = function (fecha) {
        var d = new Date(fecha), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('/');
    };
    EditarBeneficioComponent.prototype.open = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = 'Se actualizó correctamente el beneficio';
        modalRef.result.then(function (result) {
            _this.router.navigate(['/beneficios']);
        });
    };
    EditarBeneficioComponent.prototype.verImagen = function () {
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalImagenComponent, this.modalOption);
        modalRef.componentInstance.urlImagen = this.beneficioResponse.urlImagen;
    };
    EditarBeneficioComponent.prototype.onFileChange = function (files) {
        var _this = this;
        if (files.length === 0) {
            this.imgURL = '';
            return;
        }
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.imgURL = '';
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        this.nombreArchivo = files[0].name;
        this.nombreArchivoHddn = files[0].name;
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
        };
    };
    EditarBeneficioComponent = tslib_1.__decorate([
        Component({
            selector: 'app-editar-beneficio',
            templateUrl: './editar-beneficio.component.html',
            styleUrls: ['./editar-beneficio.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BeneficioService,
            ActivatedRoute,
            FormBuilder,
            NgbModal,
            Router])
    ], EditarBeneficioComponent);
    return EditarBeneficioComponent;
}());
export { EditarBeneficioComponent };
//# sourceMappingURL=editar-beneficio.component.js.map