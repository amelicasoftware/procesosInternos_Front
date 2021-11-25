import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './components/forms/form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormDireccionDeTesisComponent } from './components/form-direccion-de-tesis/form-direccion-de-tesis.component';
import { EjemploComponent } from './components/ejemplo/ejemplo.component';
import { ConferenciasEspecializadasComponent } from './components/conferencias-especializadas/conferencias-especializadas.component';
import { CapLibroCientificoComponent } from './components/cap-libro-cientifico/cap-libro-cientifico.component';
import { LibroCientificoComponent } from './components/libro-cientifico/libro-cientifico.component';
import { ArticulosDeDivulgacionComponent } from './components/articulos-de-divulgacion/articulos-de-divulgacion.component';
import { LibrosDeDivulgacionComponent } from './components/libros-de-divulgacion/libros-de-divulgacion.component';
import { ProyectosDeInvestigacionComponent } from './components/proyectos-de-investigacion/proyectos-de-investigacion.component';
import { RedesComponent } from './components/redes/redes.component';
import { OtrasActividadesComponent } from './components/otras-actividades/otras-actividades.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ValidacionComponent } from './pages/validacion/validacion.component';
import { HeaderComponent } from './components/header/header.component';
import { DatosProyectoComponent } from './pages/datos-proyecto/datos-proyecto.component';
import { LogginComponent } from './pages/loggin/loggin.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormDireccionDeTesisComponent,
    EjemploComponent,
    ConferenciasEspecializadasComponent,
    CapLibroCientificoComponent,
    LibroCientificoComponent,
    ArticulosDeDivulgacionComponent,
    LibrosDeDivulgacionComponent,
    ProyectosDeInvestigacionComponent,
    RedesComponent,
    OtrasActividadesComponent,
    HomeComponent,
    ConsultaComponent,
    ValidacionComponent,
    HeaderComponent,
    DatosProyectoComponent,
    LogginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true}),
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
