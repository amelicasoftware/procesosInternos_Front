import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './components/forms/form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EjemploComponent } from './components/ejemplo/ejemplo.component';
import { ConferenciasEspecializadasComponent } from './components/conferencias-especializadas/conferencias-especializadas.component';
import { CapLibroCientificoComponent } from './components/cap-libro-cientifico/cap-libro-cientifico.component';
import { LibroCientificoComponent } from './components/libro-cientifico/libro-cientifico.component';
import { ArticulosDeDivulgacionComponent } from './components/articulos-de-divulgacion/articulos-de-divulgacion.component';
import { LibrosDeDivulgacionComponent } from './components/libros-de-divulgacion/libros-de-divulgacion.component';
import { ProyectosDeInvestigacionComponent } from './components/proyectos-de-investigacion/proyectos-de-investigacion.component';
import { RedesComponent } from './components/redes/redes.component';
import { OtrasActividadesComponent } from './components/otras-actividades/otras-actividades.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    EjemploComponent,
    ConferenciasEspecializadasComponent,
    CapLibroCientificoComponent,
    LibroCientificoComponent,
    ArticulosDeDivulgacionComponent,
    LibrosDeDivulgacionComponent,
    ProyectosDeInvestigacionComponent,
    RedesComponent,
    OtrasActividadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
