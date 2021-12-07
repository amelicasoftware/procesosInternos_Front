import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from '../app/pages/home/home.component';
import { ConsultaComponent } from '../app/pages/consulta/consulta.component';
import { LogginComponent } from '../app/pages/loggin/loggin.component';
import { ValidacionComponent } from '../app/pages/validacion/validacion.component';
import { DatosProyectoComponent } from '../app/pages/datos-proyecto/datos-proyecto.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'busquedas', component: ConsultaComponent },
    { path: 'loggin', component: LogginComponent },
    { path: 'validacion', component: ValidacionComponent },
    { path: 'proyecto/:cveProyecto/:tipoForm', component: DatosProyectoComponent },
    { path: '', pathMatch: 'full', redirectTo: 'loggin' },
    { path: '**', pathMatch: 'full', redirectTo: 'loggin' },
];