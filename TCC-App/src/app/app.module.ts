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
import { BsDropdownModule, TooltipModule, ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
