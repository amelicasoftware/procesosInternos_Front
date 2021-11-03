import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './components/forms/form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
<<<<<<< HEAD
import { FormDireccionDeTesisComponent } from './components/forms/form-direccion-de-tesis/form-direccion-de-tesis.component';
=======
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
>>>>>>> 3d712f7614d1d43fbfed4f192a98ac7d7d351109

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
<<<<<<< HEAD
    FormDireccionDeTesisComponent
=======
    HomeComponent
>>>>>>> 3d712f7614d1d43fbfed4f192a98ac7d7d351109
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
