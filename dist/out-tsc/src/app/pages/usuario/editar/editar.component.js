import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario.service';
import { first } from 'rxjs/operators';
import { ModalComponent } from '../../util/modal/modal.component';
var EditarUsuarioComponent = /** @class */ (function () {
    function EditarUsuarioComponent(formBuilder, activeModal, modalService, usuarioService) {
        this.formBuilder = formBuilder;
        this.activeModal = activeModal;
        this.modalService = modalService;
        this.usuarioService = usuarioService;
        this.submitted = false;
        this.loading = false;
        this.error = '';
        this.isDataCargada = false;
        this.isVecino = false;
        this.lstRoles = [];
        this.modalOption = {};
    }
    EditarUsuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmUsuario = this.formBuilder.group({
            idTipoDocu: [''],
            nroDocu: [''],
            razonSocial: [''],
            idTipoDocuPadre: [''],
            nroDocuPadre: [''],
            contribuyente: [''],
            username: [''],
            password: [''],
            idTipoUsuario: [''],
            descripcion: [''],
            correo: [''],
            canjearXDni: [''],
            lstRol: new FormArray([])
        });
        this.usuarioService.iniAct(this.usuario.username).subscribe(function (res) {
            _this.lstRol = res.lstRol;
            _this.lstRolTemp = res.lstRol;
            _this.lstTipoDocumento = res.lstTipoDocumento;
            _this.lstTipoUsuario = res.lstTipoUsuario;
            _this.usuarioBean = res.usuario;
            _this.addCheckboxes();
            _this.cargarDatos();
        }, function (error) {
            if (error.status == 401) {
            }
        });
    };
    EditarUsuarioComponent.prototype.addCheckboxes = function () {
        var _this = this;
        this.lstRol.map(function (o, i) {
            var control = new FormControl(i === 0); // if first item set to true, else false
            _this.frmUsuario.controls.lstRol.push(control);
        });
    };
    EditarUsuarioComponent.prototype.cargarDatos = function () {
        this.frmUsuario.controls['idTipoDocu'].setValue(this.usuarioBean.idTipoDocu);
        this.frmUsuario.controls['nroDocu'].setValue(this.usuarioBean.nroDocu);
        this.frmUsuario.controls['razonSocial'].setValue(this.usuarioBean.razonSocial);
        this.frmUsuario.controls['idTipoDocuPadre'].setValue(this.usuarioBean.idTipoDocuPadre);
        this.frmUsuario.controls['nroDocuPadre'].setValue(this.usuarioBean.nroDocuPadre);
        this.frmUsuario.controls['contribuyente'].setValue(this.usuarioBean.contribuyente);
        this.frmUsuario.controls['username'].setValue(this.usuarioBean.username);
        this.frmUsuario.controls['idTipoUsuario'].setValue(this.usuarioBean.idTipoUsuario);
        this.frmUsuario.controls['descripcion'].setValue(this.usuarioBean.descripcion);
        this.frmUsuario.controls['correo'].setValue(this.usuarioBean.correoElect);
        this.frmUsuario.controls['canjearXDni'].setValue(this.usuarioBean.canjearXDni.toString());
        this.isVecino = this.usuarioBean.idTipoUsuario == '2';
        this.isDataCargada = true;
    };
    EditarUsuarioComponent.prototype.guardarUsuario = function () {
        var _this = this;
        this.submitted = true;
        this.error = '';
        if (this.frmUsuario.invalid) {
            return;
        }
        this.loading = true;
        var params = this.frmUsuario.value;
        var roles = this.frmUsuario.value.lstRol
            .map(function (v, i) { return v ? _this.lstRol[i].idRol : null; })
            .filter(function (v) { return v !== null; });
        this.generarRoles(roles);
        for (var i = 0; i < this.lstRolTemp.length; i++) {
            var item = this.lstRolTemp[i];
            var flag = false;
            for (var e = 0; e < roles.length; e++) {
                if (roles[e] == item.idRol) {
                    flag = true;
                }
            }
            ;
            if (item.username != null && !flag) {
                this.lstRolTemp[i].flag = 'E';
            }
            if (item.username == null && flag) {
                this.lstRolTemp[i].flag = 'N';
            }
            if (item.username == null && !flag) {
                this.lstRolTemp.splice(i, 1);
                i--;
            }
        }
        ;
        var usuario = {
            username: this.usuarioBean.username,
            password: params.password == null || params.password == '' ? null : params.password,
            lstRol: this.lstRolTemp,
            estado: '1',
            verificado: this.usuarioBean.verificado,
            validado: this.usuarioBean.validado,
            idTipoDocuPadre: this.usuarioBean.idTipoDocuPadre == null ? '' : this.usuarioBean.idTipoDocuPadre,
            nroDocuPadre: this.usuarioBean.nroDocuPadre == null ? '' : this.usuarioBean.nroDocuPadre,
            correoElect: params.correo,
            canjearXDni: params.canjearXDni
        };
        this.loading = false;
        this.usuarioService.actualizar(usuario)
            .pipe(first())
            .subscribe(function (data) {
            _this.open();
        }, function (error) {
            _this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
            _this.loading = false;
        });
    };
    EditarUsuarioComponent.prototype.open = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = 'Se actualizó correctamente el usuario';
        modalRef.result.then(function (result) {
            _this.activeModal.close();
        });
    };
    EditarUsuarioComponent.prototype.generarRoles = function (roles) {
        for (var i = 0; i < roles.length; i++) {
            var item = {
                idRol: roles[i]
            };
            this.lstRoles.push(item);
        }
        ;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], EditarUsuarioComponent.prototype, "usuario", void 0);
    EditarUsuarioComponent = tslib_1.__decorate([
        Component({
            selector: 'app-editarusuario',
            templateUrl: './editar.component.html',
            styleUrls: ['./editar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            NgbActiveModal,
            NgbModal,
            UsuarioService])
    ], EditarUsuarioComponent);
    return EditarUsuarioComponent;
}());
export { EditarUsuarioComponent };
//# sourceMappingURL=editar.component.js.map