import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app.routing';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class LayoutsModule { }
