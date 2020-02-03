import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { NavComponent } from './nav/nav.component';
import { EventoComponent } from './Evento/Evento.component';
import { PalestranteComponent } from './Palestrante/Palestrante.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatoComponent } from './Contato/Contato.component';
import { DateTimeFormatPipePipe } from './helps/DateTimeFormatPipe.pipe';
import { TituloComponent } from './_shared/titulo/titulo.component';

import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      NavComponent,
      EventoComponent,
      PalestranteComponent,
      DashboardComponent,
      ContatoComponent,
      TituloComponent,
      DateTimeFormatPipePipe
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ToastrModule.forRoot({
         timeOut: 10000,
         positionClass: 'toast-bottom-right',
         preventDuplicates: true,
      }),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
