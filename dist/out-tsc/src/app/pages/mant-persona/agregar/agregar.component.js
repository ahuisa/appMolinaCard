import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../../../services/persona.service';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ModalComponent } from '../../util/modal/modal.component';
var AgregarPersonaComponent = /** @class */ (function () {
    function AgregarPersonaComponent(activeModal, formBuilder, modalService, personaService) {
        this.activeModal = activeModal;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.personaService = personaService;
        this.submitted = false;
        this.loading = false;
        this.error = '';
        //imagen
        this.nombreArchivo = 'Selecciones imagen';
        this.modalOption = {};
        this.max = 0;
    }
    AgregarPersonaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmPersona = this.formBuilder.group({
            idTipoDocu: ['', Validators.required],
            nroDocu: ['', Validators.required],
            nombres: ['', Validators.required],
            apePater: ['', Validators.required],
            apeMater: ['', Validators.required],
            fecNacimiento: ['', Validators.required],
            idSexo: ['', Validators.required],
            direccion: ['', Validators.required],
            estCivil: ['', Validators.required],
            correoElect: ['', [Validators.required, Validators.email]],
            telefono: ['', Validators.required],
            estado: ['', Validators.required],
            imagen: [''],
        });
        this.personaService.iniRegi().subscribe(function (res) {
            _this.lstTipoDocumento = res.lstTipoDocumento;
            _this.lstEstadoCivil = res.lstEstadoCivil;
        }, function (error) {
            if (error.status == 401) {
            }
        });
    };
    Object.defineProperty(AgregarPersonaComponent.prototype, "f", {
        get: function () { return this.frmPersona.controls; },
        enumerable: true,
        configurable: true
    });
    AgregarPersonaComponent.prototype.registrar = function () {
        var _this = this;
        console.log(new Date(this.frmPersona.value.fecNacimiento));
        this.submitted = true;
        this.error = '';
        if (this.frmPersona.invalid) {
            return;
        }
        this.loading = true;
        var params = this.frmPersona.value;
        var persona = {
            idTipoDocu: params.idTipoDocu,
            nroDocu: params.nroDocu,
            nombres: params.nombres,
            apePater: params.apePater,
            apeMater: params.apeMater,
            fecNacimiento: null,
            strFecNacimiento: this.getDateFormat(params.fecNacimiento),
            idSexo: params.idSexo,
            direccion: params.direccion,
            idEstadoCivil: params.estCivil,
            correoElect: params.correoElect,
            telefono: params.telefono,
            estado: params.estado,
            imagen: this.imgURL == null || this.imgURL == '' ? null : this.imgURL.replace(/^data:image\/[a-z]+;base64,/, "")
        };
        this.loading = false;
        this.personaService.registrar(persona)
            .pipe(first())
            .subscribe(function (data) {
            _this.open();
        }, function (error) {
            _this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
            _this.loading = false;
        });
    };
    AgregarPersonaComponent.prototype.onFileChange = function (files) {
        var _this = this;
        if (files.length === 0) {
            this.frmPersona.controls['imagen'].setValue('');
            return;
        }
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.frmPersona.controls['imagen'].setValue('');
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        this.nombreArchivo = files[0].name;
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
            _this.frmPersona.controls['imagen'].setValue(_this.nombreArchivo);
        };
    };
    AgregarPersonaComponent.prototype.open = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = 'Se registró correctamente la persona';
        modalRef.result.then(function (result) {
            _this.activeModal.close();
        });
    };
    AgregarPersonaComponent.prototype.getDateFormat = function (fecha) {
        var d = new Date(fecha), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('/');
    };
    AgregarPersonaComponent.prototype.cambiarTipo = function (e) {
        var tipo = e.target.value;
        if (tipo == '1' || tipo == '2')
            this.max = 8;
        else if (tipo == '3' || tipo == '5')
            this.max = 12;
        else if (tipo == '4')
            this.max = 11;
        else if (tipo == '6' || tipo == '7')
            this.max = 15;
        this.frmPersona.controls['nroDocu'].setValue('');
    };
    AgregarPersonaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-agregar',
            templateUrl: './agregar.component.html',
            styleUrls: ['./agregar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgbActiveModal,
            FormBuilder,
            NgbModal,
            PersonaService])
    ], AgregarPersonaComponent);
    return AgregarPersonaComponent;
}());
export { AgregarPersonaComponent };
//# sourceMappingURL=agregar.component.js.map