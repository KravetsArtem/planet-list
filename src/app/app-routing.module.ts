import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlanetsListComponent} from './planets-list/planets-list.component';
import {PlanetComponent} from './planet/planet.component';
import {ErrorPageComponent} from './error-page/error-page.component';

const routes: Routes = [
  { path: '', component: PlanetsListComponent },
  { path: 'planet/:id', component: PlanetComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
