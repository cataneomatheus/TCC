import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { NavComponent } from './nav/nav.component';
import { EventoComponent } from './Evento/Evento.component';
import { DateTimeFormatPipePipe } from './helps/DateTimeFormatPipe.pipe';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      NavComponent,
      EventoComponent,
      DateTimeFormatPipePipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
