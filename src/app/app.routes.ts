import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from '../app/pages/home/home.component';
import { ConsultaComponent } from '../app/pages/consulta/consulta.component';
import { ValidacionComponent } from '../app/pages/validacion/validacion.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'busquedas', component: ConsultaComponent },
    { path: 'validacion', component: ValidacionComponent },
    // { path: '', pathMatch: 'full', redirectTo: 'home' },
    // { path: '**', pathMatch: 'full', redirectTo: 'home' },
];