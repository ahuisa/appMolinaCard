import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarLocalComponent } from './agregar/agregar.component';
import { EditarLocalComponent } from './editar/editar.component';
import { EliminarLocalComponent } from './eliminar/eliminar.component';
import { first } from 'rxjs/operators';
import { EmpresaService } from '../../services/empresa.service';
import { ModalComponent } from '../util/modal/modal.component';
import { ModalImagenComponent } from '../util/modal-imagen/modal-imagen.component';
var RegistrarEmpresaComponent = /** @class */ (function () {
    function RegistrarEmpresaComponent(empresaService, route, formBuilder, modalService, router) {
        this.empresaService = empresaService;
        this.route = route;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.router = router;
        this.submitted = false;
        this.loading = false;
        this.error = '';
        this.lstLocales = [];
        //imagen
        this.nombreArchivo = 'Selecciones imagen';
        this.modalOption = {};
    }
    RegistrarEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accion = this.route.snapshot.paramMap.get('accion');
        this.frmEmpresa = this.formBuilder.group({
            razonSocial: ['', Validators.required],
            razonSocialCorto: ['', Validators.required],
            imagen: ['', Validators.required],
            idTipoDocu: ['', Validators.required],
            nroDocu: ['', Validators.required],
            telefono: ['', Validators.required],
            contacto: ['', Validators.required],
            estado: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]]
        });
        if (this.accion == 'n') {
            this.empresaService.iniRegi().subscribe(function (res) {
                _this.lstTipoDocumento = res.lstTipoDocumento;
            }, function (error) {
                if (error.status == 403) {
                    _this.router.navigate(['/login']);
                }
            });
        }
        else { /*
            this.idTipoDocu = this.route.snapshot.paramMap.get('tip');
            this.nroDocu = this.route.snapshot.paramMap.get('doc');*/
            var data = localStorage.getItem('param');
            if (data == '') {
                debugger;
                this.router.navigate(['/empresas']);
            }
            else {
                var data2 = JSON.parse(localStorage.getItem('param'));
                localStorage.setItem('param', '');
                this.idTipoDocu = data2.idTipoDocu;
                this.nroDocu = data2.nroDocu;
                this.empresaService.iniAct(this.idTipoDocu, this.nroDocu).subscribe(function (res) {
                    _this.lstTipoDocumento = res.lstTipoDocumento;
                    _this.lstLocales = res.lstLocalEmpresa;
                    _this.empresaBean = res.empresa;
                    _this.cargarDatos();
                }, function (error) {
                    if (error.status == 403) {
                        _this.router.navigate(['/login']);
                    }
                });
            }
        }
    };
    RegistrarEmpresaComponent.prototype.abrirAgregar = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        this.modalOption.size = 'lg';
        var modalRef = this.modalService.open(AgregarLocalComponent, this.modalOption);
        modalRef.result.then(function (result) {
            if (result) {
                _this.lstLocales.push(result);
            }
        });
    };
    RegistrarEmpresaComponent.prototype.editar = function (id, index) {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        this.modalOption.size = 'lg';
        var local = this.lstLocales[index];
        var modalRef = this.modalService.open(EditarLocalComponent, this.modalOption);
        modalRef.componentInstance.local = local;
        modalRef.result.then(function (result) {
            if (result) {
                _this.lstLocales[index] = result;
            }
        });
    };
    RegistrarEmpresaComponent.prototype.eliminar = function (id, index) {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(EliminarLocalComponent, this.modalOption);
        modalRef.componentInstance.index = index;
        modalRef.result.then(function (result) {
            if (result) {
                if (_this.accion == 'n') {
                    _this.lstLocales.splice(result, 1);
                }
                else {
                    var local = _this.lstLocales[result];
                    if (local.accion == 'N') {
                        _this.lstLocales.splice(result, 1);
                    }
                    else {
                        local.accion = 'E';
                        _this.lstLocales[index] = local;
                    }
                }
            }
        });
    };
    RegistrarEmpresaComponent.prototype.onFileChange = function (files) {
        var _this = this;
        if (files.length === 0) {
            return;
        }
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        this.nombreArchivo = files[0].name;
        this.frmEmpresa.controls['imagen'].setValue(this.nombreArchivo);
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
        };
    };
    RegistrarEmpresaComponent.prototype.registrarEmpresa = function () {
        var _this = this;
        this.submitted = true;
        this.error = '';
        if (this.frmEmpresa.invalid) {
            return;
        }
        this.loading = true;
        var params = this.frmEmpresa.value;
        var empresa = {
            idTipoDocu: params.idTipoDocu,
            nroDocu: params.nroDocu,
            razonSocial: params.razonSocial,
            razonSocialCorto: params.razonSocialCorto,
            correoElect: params.correo,
            contacto: params.contacto,
            telefono: params.telefono,
            estado: params.estado,
            lstLocalEmpresa: this.lstLocales,
            imagen: this.imgURL == null || this.imgURL == '' ? null : this.imgURL.replace(/^data:image\/[a-z]+;base64,/, "")
        };
        this.loading = false;
        if (this.accion == 'n') {
            this.empresaService.registrar(empresa)
                .pipe(first())
                .subscribe(function (data) {
                _this.open();
            }, function (error) {
                _this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
                _this.loading = false;
            });
        }
        else {
            empresa.idTipoDocu = this.empresaBean.idTipoDocu;
            this.empresaService.actualizar(empresa)
                .pipe(first())
                .subscribe(function (data) {
                localStorage.setItem('param', '');
                _this.open();
            }, function (error) {
                _this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
                _this.loading = false;
            });
        }
    };
    Object.defineProperty(RegistrarEmpresaComponent.prototype, "f", {
        get: function () { return this.frmEmpresa.controls; },
        enumerable: true,
        configurable: true
    });
    RegistrarEmpresaComponent.prototype.cargarDatos = function () {
        this.frmEmpresa.controls['razonSocial'].setValue(this.empresaBean.razonSocial);
        this.frmEmpresa.controls['razonSocialCorto'].setValue(this.empresaBean.razonSocialCorto);
        this.frmEmpresa.controls['imagen'].setValue(this.empresaBean.urlImagen);
        this.frmEmpresa.controls['idTipoDocu'].setValue(this.empresaBean.idTipoDocu);
        this.frmEmpresa.controls['nroDocu'].setValue(this.empresaBean.nroDocu);
        this.frmEmpresa.controls['telefono'].setValue(this.empresaBean.telefono);
        this.frmEmpresa.controls['contacto'].setValue(this.empresaBean.contacto);
        this.frmEmpresa.controls['estado'].setValue(this.empresaBean.estado);
        this.frmEmpresa.controls['correo'].setValue(this.empresaBean.correoElect);
    };
    RegistrarEmpresaComponent.prototype.open = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        if (this.accion == 'n') {
            modalRef.componentInstance.mensaje = 'Se registro correctamente la empresa';
        }
        else {
            modalRef.componentInstance.mensaje = 'Se actualizó correctamente la empresa';
        }
        modalRef.result.then(function (result) {
            _this.router.navigate(['/empresas']);
        });
    };
    RegistrarEmpresaComponent.prototype.verImagen = function () {
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalImagenComponent, this.modalOption);
        modalRef.componentInstance.urlImagen = this.empresaBean.urlImagen;
    };
    RegistrarEmpresaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-registrar-empresa',
            templateUrl: './registrar-empresa.component.html',
            styleUrls: ['./registrar-empresa.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [EmpresaService,
            ActivatedRoute,
            FormBuilder,
            NgbModal,
            Router])
    ], RegistrarEmpresaComponent);
    return RegistrarEmpresaComponent;
}());
export { RegistrarEmpresaComponent };
//# sourceMappingURL=registrar-empresa.component.js.map