import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './Evento/Evento.component';
import { PalestranteComponent } from './Palestrante/Palestrante.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatoComponent } from './Contato/Contato.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { EventoEditComponent } from './Evento/eventoEdit/eventoEdit.component';
import { ConsultaComponent } from './Consulta/Consulta.component';
import { ConsultaEditComponent } from './Consulta/consultaEdit/consultaEdit.component';
import { SimulacaoComponent } from './Simulacao/Simulacao.component';


const routes: Routes = [
  { path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },

  { path: 'consultas', component: ConsultaComponent, canActivate: [AuthGuard] },
  { path: 'consulta/:id/edit', component: ConsultaEditComponent, canActivate: [AuthGuard] },
  { path: 'simulacao/:id/edit', component: SimulacaoComponent, canActivate: [AuthGuard] },
  { path: 'eventos', component: EventoComponent, canActivate: [AuthGuard] },
  { path: 'evento/:id/edit', component: EventoEditComponent, canActivate: [AuthGuard] },
  { path: 'palestrantes', component: PalestranteComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'contatos', component: ContatoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'consultas', pathMatch: 'full' },
  { path: '**', redirectTo: 'consultas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
