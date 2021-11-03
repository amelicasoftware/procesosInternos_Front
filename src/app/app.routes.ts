import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from '../app/pages/home/home.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    // { path: '', pathMatch: 'full', redirectTo: 'home' },
    // { path: '**', pathMatch: 'full', redirectTo: 'home' },
];