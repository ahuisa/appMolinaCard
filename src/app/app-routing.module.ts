import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
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

const routes: Routes = [
	{
	    path : '',
	    pathMatch : 'full',
	    redirectTo : 'login'
  	},
  	{
    	path : 'login',
    	component: LoginComponent
  	},
    {
      path : 'beneficios',
      canActivate: [AuthGuard],
      component: BeneficiosComponent
    },
    {
      path : 'registrar-beneficio',
      canActivate: [AuthGuard],
      component: RegistrarBeneficioComponent
    },
    {
      path : 'empresas',
      canActivate: [AuthGuard],
      component: EmpresasComponent
    },
    {
      path : 'empresa/:accion',
      canActivate: [AuthGuard],
      component: RegistrarEmpresaComponent
    },
    {
      path : 'editar-beneficio',
      canActivate: [AuthGuard],
      component: EditarBeneficioComponent
    },
    {
      path : 'personas',
      //canActivate: [AuthGuard],
      component: MantPersonaComponent
    },
    {
      path : 'usuarios',
      canActivate: [AuthGuard],
      component: UsuarioComponent
    },
    {
      path : 'beneficios-empresa',
      canActivate: [AuthGuard],
      component: BeneficiosEmpresaComponent
    },
    {
      path : 'olvide-contrasena/:username',
      component: ContrasenaComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
