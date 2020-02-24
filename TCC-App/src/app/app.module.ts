import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { EventoComponent } from './Evento/Evento.component';
import { PalestranteComponent } from './Palestrante/Palestrante.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatoComponent } from './Contato/Contato.component';
import { DateTimeFormatPipePipe } from './helps/DateTimeFormatPipe.pipe';
import { TituloComponent } from './_shared/titulo/titulo.component';

import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { EventoService } from './services/evento.service';
import { ConsultaService } from './services/Consulta/consulta.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EventoEditComponent } from './Evento/eventoEdit/eventoEdit.component';
import { ConsultaComponent } from './Consulta/Consulta.component';
import { ConsultaEditComponent } from './Consulta/consultaEdit/consultaEdit.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      EventoComponent,
      EventoEditComponent,
      PalestranteComponent,
      DashboardComponent,
      ContatoComponent,
      TituloComponent,
      DateTimeFormatPipePipe,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      ConsultaComponent,
      ConsultaEditComponent
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      NgxMaskModule.forRoot(),
      NgxCurrencyModule,
      ToastrModule.forRoot({
         timeOut: 3000,
         preventDuplicates: true,
         progressBar: true
      }),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      ReactiveFormsModule
   ],
   providers: [
      EventoService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      },
      ConsultaService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      },
      { 
         provide: LOCALE_ID, 
         useValue: 'pt'
      }
      
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
