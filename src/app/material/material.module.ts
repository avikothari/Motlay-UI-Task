import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';


const material = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  NgxMatIntlTelInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatButtonModule,
  MatDialogModule,
  MatTableModule
];

@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule { }