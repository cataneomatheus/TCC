import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { ConsultaComponent } from './Consulta/Consulta.component';
import { ConsultaEditComponent } from './Consulta/consultaEdit/consultaEdit.component';
import { SimulacaoComponent } from './Simulacao/Simulacao.component';
import { AlunoComponent } from './Aluno/Aluno.component';
import { config } from 'rxjs';
import { RoleGuardService } from './guards/role-guard.service';
import { ResultadoComponent } from './Resultado/Resultado.component';
import { ResultadoEditComponent } from './Resultado/resultadoEdit/resultadoEdit.component';


const routes: Routes = [
  { path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },

  { path: 'consultas', component: ConsultaComponent, canActivate: [RoleGuardService], data: { expectedRole: "Admin"} },
  { path: 'resultados', component: ResultadoComponent, canActivate: [AuthGuard] },
  { path: 'resultado/:id/edit', component: ResultadoEditComponent, canActivate:[AuthGuard] },
  { path: 'consulta/:id/edit', component: ConsultaEditComponent, canActivate:[RoleGuardService], data: { expectedRole: "Admin"} },
  { path: 'simulacao/:id/edit', component: SimulacaoComponent, canActivate: [AuthGuard] },
  { path: 'aluno', component: AlunoComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'aluno', pathMatch: 'full' },
  { path: '**', redirectTo: 'aluno', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
