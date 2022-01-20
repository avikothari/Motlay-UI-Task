import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';

const routes: Routes = [
  {path :'', component: HomeComponent},
  {path : 'passenger-details', component: PassengerDetailsComponent},
  {path :'**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
