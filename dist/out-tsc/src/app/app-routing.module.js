import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BeneficiosComponent } from './pages/beneficios/beneficios.component';
import { RegistrarBeneficioComponent } from './pages/registrar-beneficio/registrar-beneficio.component';
import { RegistrarEmpresaComponent } from './pages/registrar-empresa/registrar-empresa.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { EditarBeneficioComponent } from './pages/editar-beneficio/editar-beneficio.component';
import { MantPersonaComponent } from './pages/mant-persona/mant-persona.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BeneficiosEmpresaComponent } from './pages/beneficios/empresa/empresa.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
var routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'beneficios',
        canActivate: [AuthGuard],
        component: BeneficiosComponent
    },
    {
        path: 'registrar-beneficio',
        canActivate: [AuthGuard],
        component: RegistrarBeneficioComponent
    },
    {
        path: 'empresas',
        canActivate: [AuthGuard],
        component: EmpresasComponent
    },
    {
        path: 'empresa/:accion',
        canActivate: [AuthGuard],
        component: RegistrarEmpresaComponent
    },
    {
        path: 'editar-beneficio',
        canActivate: [AuthGuard],
        component: EditarBeneficioComponent
    },
    {
        path: 'personas',
        canActivate: [AuthGuard],
        component: MantPersonaComponent
    },
    {
        path: 'usuarios',
        canActivate: [AuthGuard],
        component: UsuarioComponent
    },
    {
        path: 'beneficios-empresa',
        canActivate: [AuthGuard],
        component: BeneficiosEmpresaComponent
    },
    {
        path: 'restablecerContrasena/:token',
        component: ContrasenaComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map