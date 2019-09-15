import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BeneficiosComponent } from './pages/beneficios/beneficios.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { RegistrarBeneficioComponent } from './pages/registrar-beneficio/registrar-beneficio.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { RegistrarEmpresaComponent } from './pages/registrar-empresa/registrar-empresa.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MsesionComponent } from './componentes/msesion/msesion.component';

import { JwtModule } from "@auth0/angular-jwt";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { EditarBeneficioComponent } from './pages/editar-beneficio/editar-beneficio.component';
import { MantPersonaComponent } from './pages/mant-persona/mant-persona.component';
import { AgregarPersonaComponent } from './pages/mant-persona/agregar/agregar.component';
import { AgregarLocalComponent } from './pages/registrar-empresa/agregar/agregar.component';
import { EditarLocalComponent } from './pages/registrar-empresa/editar/editar.component';
import { EliminarLocalComponent } from './pages/registrar-empresa/eliminar/eliminar.component';
import { EditarPersonaComponent } from './pages/mant-persona/editar/editar.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AgregarUsuarioComponent } from './pages/usuario/agregar/agregar.component';
import { EditarUsuarioComponent } from './pages/usuario/editar/editar.component';
import { BeneficiosEmpresaComponent } from './pages/beneficios/empresa/empresa.component';
import { CodigoComponent } from './pages/beneficios/codigo/codigo.component';
import { ModalComponent } from './pages/util/modal/modal.component';
import { DataTablesModule } from 'angular-datatables';
import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
import { ModalImagenComponent } from './pages/util/modal-imagen/modal-imagen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        BeneficiosComponent,
        CabeceraComponent,
        MenuComponent,
        RegistrarBeneficioComponent,
        EmpresasComponent,
        RegistrarEmpresaComponent,
        FooterComponent,
        MsesionComponent,
        ModalComponent,
        EditarBeneficioComponent,
        MantPersonaComponent,
        AgregarPersonaComponent,
        AgregarLocalComponent,
        EditarLocalComponent,
        EliminarLocalComponent,
        EditarPersonaComponent,
        UsuarioComponent,
        AgregarUsuarioComponent,
        EditarUsuarioComponent,
        BeneficiosEmpresaComponent,
        CodigoComponent,
        ModalComponent,
        ContrasenaComponent,
        ModalImagenComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {}
        }),
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgbDatepickerModule,
        DataTablesModule,
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule
    ],
    entryComponents: [
        ModalComponent,
        AgregarPersonaComponent,
        AgregarLocalComponent,
        EditarLocalComponent,
        EliminarLocalComponent,
        EditarPersonaComponent,
        AgregarUsuarioComponent,
        EditarUsuarioComponent,
        CodigoComponent,
        ModalImagenComponent
    ],
    providers: [FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
