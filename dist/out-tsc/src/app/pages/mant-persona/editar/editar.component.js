import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../../../services/persona.service';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../util/modal/modal.component';
import { ModalImagenComponent } from '../../util/modal-imagen/modal-imagen.component';
var EditarPersonaComponent = /** @class */ (function () {
    function EditarPersonaComponent(activeModal, formBuilder, personaService, modalService, route, router) {
        this.activeModal = activeModal;
        this.formBuilder = formBuilder;
        this.personaService = personaService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.submitted = false;
        this.loading = false;
        this.error = '';
        //imagen
        this.nombreArchivo = 'Selecciones imagen';
        this.modalOption = {};
    }
    EditarPersonaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmPersona = this.formBuilder.group({
            idTipoDocu: [''],
            nroDocu: [''],
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
        this.personaService.iniAct(this.persona.idTipoDocu, this.persona.nroDocu).subscribe(function (res) {
            _this.lstTipoDocumento = res.lstTipoDocumento;
            _this.lstEstadoCivil = res.lstEstadoCivil;
            _this.personaBean = res.persona;
            _this.cargarDatos();
        }, function (error) {
            if (error.status == 401) {
                _this.router.navigate(['/login']);
            }
        });
    };
    EditarPersonaComponent.prototype.cargarDatos = function () {
        this.frmPersona.controls['idTipoDocu'].setValue(this.personaBean.idTipoDocu);
        this.frmPersona.controls['nroDocu'].setValue(this.personaBean.nroDocu);
        this.frmPersona.controls['nombres'].setValue(this.personaBean.nombres);
        this.frmPersona.controls['apePater'].setValue(this.personaBean.apePater);
        this.frmPersona.controls['apeMater'].setValue(this.personaBean.apeMater);
        this.frmPersona.controls['idSexo'].setValue(this.personaBean.idSexo);
        this.frmPersona.controls['direccion'].setValue(this.personaBean.direccion);
        this.frmPersona.controls['estCivil'].setValue(this.personaBean.idEstadoCivil);
        this.frmPersona.controls['correoElect'].setValue(this.personaBean.correoElect);
        this.frmPersona.controls['telefono'].setValue(this.personaBean.telefono);
        this.frmPersona.controls['estado'].setValue(this.personaBean.estado);
        this.frmPersona.controls['imagen'].setValue(this.personaBean.urlImagen);
        var fecNacim = new Date(this.personaBean.fecNacimiento);
        fecNacim.setDate(fecNacim.getDate() + 1);
        this.frmPersona.controls['fecNacimiento'].setValue(fecNacim);
        /*
        let date = new Date(this.personaBean.fecNacimiento);
        let dd = date.getUTCDate() + "";
        let mm = date.getUTCMonth() + "";
        let yyyy = date.getUTCFullYear() + "";


        this.frmPersona.controls['fecNacimiento'].setValue({
            year: parseInt(yyyy, 10),
            month: parseInt(mm, 10),
            day: parseInt(dd, 10)
        }); */
    };
    EditarPersonaComponent.prototype.actualizar = function () {
        var _this = this;
        this.submitted = true;
        this.error = '';
        if (this.frmPersona.invalid) {
            return;
        }
        this.loading = true;
        var params = this.frmPersona.value;
        var persona = {
            idTipoDocu: this.personaBean.idTipoDocu,
            nroDocu: this.personaBean.nroDocu,
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
        this.personaService.actualizar(persona)
            .pipe(first())
            .subscribe(function (data) {
            _this.open();
        }, function (error) {
            _this.error = 'Ocurrió un error al registrar el beneficio, vuelva a intentarlo.';
            _this.loading = false;
        });
    };
    EditarPersonaComponent.prototype.onFileChange = function (files) {
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
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
        };
    };
    EditarPersonaComponent.prototype.getDateFormat = function (fecha) {
        var d = new Date(fecha), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('/');
    };
    EditarPersonaComponent.prototype.open = function () {
        var _this = this;
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalComponent, this.modalOption);
        modalRef.componentInstance.mensaje = 'Se actualizó correctamente la persona';
        modalRef.result.then(function (result) {
            _this.activeModal.close();
        });
    };
    Object.defineProperty(EditarPersonaComponent.prototype, "f", {
        get: function () { return this.frmPersona.controls; },
        enumerable: true,
        configurable: true
    });
    EditarPersonaComponent.prototype.verImagen = function () {
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        var modalRef = this.modalService.open(ModalImagenComponent, this.modalOption);
        modalRef.componentInstance.urlImagen = this.personaBean.urlImagen;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], EditarPersonaComponent.prototype, "persona", void 0);
    EditarPersonaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-editarpersona',
            templateUrl: './editar.component.html',
            styleUrls: ['./editar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgbActiveModal,
            FormBuilder,
            PersonaService,
            NgbModal,
            ActivatedRoute,
            Router])
    ], EditarPersonaComponent);
    return EditarPersonaComponent;
}());
export { EditarPersonaComponent };
//# sourceMappingURL=editar.component.js.map