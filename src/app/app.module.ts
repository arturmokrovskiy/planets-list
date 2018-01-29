import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PlanetsService } from './services/planets.service';

import { AppComponent } from './app.component';
import { PlanetsComponent } from './planets/planets.component';
import { MatSortModule } from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { ViewPlanetComponent } from './planets/view-planet/view-planet.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanetsComponent,
    ViewPlanetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    MatDividerModule,
    MatListModule
    ],
  providers: [PlanetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
