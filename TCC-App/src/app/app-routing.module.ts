import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './Evento/Evento.component';
import { PalestranteComponent } from './Palestrante/Palestrante.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatoComponent } from './Contato/Contato.component';


const routes: Routes = [
  { path: 'eventos', component: EventoComponent },
  { path: 'palestrantes', component: PalestranteComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contatos', component: ContatoComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dasboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
