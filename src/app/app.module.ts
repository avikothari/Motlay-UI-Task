import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { LayoutsModule } from './layouts/layouts.module';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PassengerDetailsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
