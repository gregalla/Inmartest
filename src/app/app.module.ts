import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BarchartComponent } from '../shared/barchart/barchart.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';

import { UserService } from './user.service';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { EditCountryComponent } from '../edit-country/edit-country.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heatmap', component : HeatmapComponent},
  { path: 'addEditData', component : AddEditComponent},
  { path : 'editCountry/:name' ,component: EditCountryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    BarchartComponent,
    HeatmapComponent,
    AddEditComponent,
    EditCountryComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,RouterModule.forRoot(routes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
