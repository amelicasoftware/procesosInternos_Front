import { Component, OnInit } from '@angular/core';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-datos-proyecto',
  templateUrl: './datos-proyecto.component.html',
  styleUrls: ['./datos-proyecto.component.css']
})
export class DatosProyectoComponent implements OnInit {
  cveProyecto: number = 0;
  proyecto: any;
  form!: FormGroup;

  constructor(
    private servicesForm: ServicesFormService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      TPOPROYINV: new FormControl('Artículos científicos'),
      RSMPROYINV: new FormControl(''),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(2021)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.required]),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('', [Validators.required]),
      INSPROYINV: new FormControl(''),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl('', [Validators.required]),
      PRDPROYINV: new FormControl(''),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(''),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl(''),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });
  }

  ngOnInit(): void {
    this.cveProyecto = this.rutaActiva.snapshot.params.cveProyecto;
    this.servicesForm.getProjectId(this.cveProyecto).subscribe(datos => {
      console.log(datos);
      this.proyecto = datos;
      this.form.controls.TITPROYINV.setValue(this.proyecto[0].titproyinv);
    });

  }

  campoEsValido(campo: string) {
    return this.form.controls[campo].errors
      && this.form.controls[campo].touched;
  }

}
