import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario.service';
import { first } from 'rxjs/operators';
import { ModalComponent } from '../../util/modal/modal.component';
var AgregarUsuarioComponent = /** @class */ (function () {
    function AgregarUsuarioComponent(formBuilder, activeModal, modalService, usuarioService) {
        this.formBuilder = formBuilder;
        this.activeModal = activeModal;
        this.modalService = modalService;
        this.usuarioService = usuarioService;
        this.submitted = false;
        this.loading = false;
        this.error = '';
        this.isVecino = false;
        this.lstRoles = [];
        this.modalOption = {};
    }
    AgregarUsuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmUsuario = this.formBuilder.group({
            idTipoDocu: ['', Validators.required],
            nroDocu: ['', Validators.required],
            razonSocial: ['', Validators.required],
            idTipoDocuPadre: [''],
            nroDocuPadre: [''],
            contribuyente: [''],
            username: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            idTipoUsuario: ['', Validators.required],
            descripcion: [''],
            canjearXDni: ['true'],
            correo: ['', [Validators.required, Validators.email]],
            lstRol: new FormArray([])
        });
        this.usuarioService.iniRegi().subscribe(function (res) {
            _this.lstRol = res.lstRol;
            _this.lstTipoDocumento = res.lstTipoDocumento;
            _this.lstTipoUsuario = res.lstTipoUsuario;
            _this.addCheckboxes();
        }, function (error) {
            if (error.status == 401) {
            }
        });
    };
    AgregarUsuarioComponent.prototype.addCheckboxes = function () {
        var _this = this;
        this.lstRol.map(function (o, i) {
            var control = new FormControl(i === 0); // if first item set to true, else false
            _this.frmUsuario.controls.lstRol.push(control);
        });
    };
    AgregarUsuarioComponent.prototype.validarPersona = function () {
        var _this = this;
        var params = this.frmUsuario.value;
        var tipoUsuario = params.idTipoUsuario.split("-");
        var tipoDocu = params.idTipoDocu.split("-");
        var nroDocu = params.nroDocu;
        this.usuarioService.getPersona(tipoDocu[0], nroDocu, tipoDocu[1], tipoUsuario[1]).subscribe(function (res) {
            if (res == null || res.nombreUsu == null) {
                _this.frmUsuario.controls['razonSocial'].setValue('');
            }
            else {
                _this.frmUsuario.controls['razonSocial'].setValue(res.nombreUsu);
            }
        }, function (error) {
            if (error.status == 401) {
            }
        });
    };
    AgregarUsuarioComponent.prototype.cambiarTipo = function (event) {
        this.frmUsuario.controls['nroDocu'].setValue('');
        this.frmUsuario.controls['razonSocial'].setValue('');
    };
    AgregarUsuarioComponent.prototype.cambiarTipoPadre = function (event) {
        this.frmUsuario.controls['nroDocuPadre'].setValue('');
        this.frmUsuario.controls['contribuyente'].setValue('');
    };
    AgregarUsuarioComponent.prototype.validarContribuyente = function () {
        var _this = this;
        var params = this.frmUsuario.value;
        var tipoDocu = params.idTipoDocuPadre;
        var nroDocu = params.nroDocuPadre;
        this.usuarioService.getContribuyente(tipoDocu, nroDocu).subscribe(function (res) {
            if (res == null || res.contribuyente == null) {
                _this.frmUsuario.controls['contribuyente'].setValue('');
            }
            else {
                _this.frmUsuario.controls['contribuyente'].setValue(res.contribuyente);
            }
        }, function (error) {
            if (error.status == 401) {
            }
        });
    };
    AgregarUsuarioComponent.prototype.cambioTipoUsuario = function (event) {
        var val = event.target.value;
        var tipoDocu = val.split("-");
        if (tipoDocu[0] == '2')
            this.isVecino = true;
        else
            this.isVecino = false;
    };
    AgregarUsuarioComponent.prototype.generarRoles = function (roles) {
        for (var i = 0; i < roles.length; i++) {
            var item = {
                idRol: roles[i]
            };
            this.lstRoles.push(item);
        }
        ;
    };
    AgregarUsuarioComponent.prototype.validarUsuario = function () {
        var _this = this;
        var params = this.frmUsuario.value;
        this.usuarioService.getUsuario(params.username).subscribe(function (res) {
            if (res != null) {
                _this.frmUsuario.controls['username'].setValue('');
            }
        }, function (error) {
            if (error.status == 401) {
            }
        });
    };
    AgregarUsuarioComponent.prototype.agregarUsuario = function () {
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
        var tipoUsuario = params.idTipoUsuario.split("-");
        var tipoDocu = params.idTipoDocu.split("-");
        var usuario = {
            idTipoDocu: tipoDocu[0],
            nroDocu: params.nroDocu,
            idTipoDocuPadre: params.idTipoDocuPadre,
            nroDocuPadre: params.nroDocuPadre,
            username: params.username,
            password: params.password,
            idTipoUsuario: tipoUsuario[0],
            verificado: false,
            validado: false,
            correoElect: params.correo,
            lstRol: this.lstRoles,
            canjearXDni: params.canjearXDni
        };
        this.loading = false;
        this.usuarioService.registrar(usuario)
            .pipe(first())
            .subscribe(function (data) {
            _this.open();
        }, function (error) {
            _this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
            _this.loading = false;
        });
    };
    AgregarUsuarioComponent.prototype.open = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = 'Se registró correctamente el usuario';
        modalRef.result.then(function (result) {
            _this.activeModal.close();
        });
    };
    Object.defineProperty(AgregarUsuarioComponent.prototype, "f", {
        get: function () { return this.frmUsuario.controls; },
        enumerable: true,
        configurable: true
    });
    AgregarUsuarioComponent = tslib_1.__decorate([
        Component({
            selector: 'app-agregarusuario',
            templateUrl: './agregar.component.html',
            styleUrls: ['./agregar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            NgbActiveModal,
            NgbModal,
            UsuarioService])
    ], AgregarUsuarioComponent);
    return AgregarUsuarioComponent;
}());
export { AgregarUsuarioComponent };
//# sourceMappingURL=agregar.component.js.map