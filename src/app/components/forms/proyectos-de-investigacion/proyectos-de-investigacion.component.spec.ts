import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosDeInvestigacionComponent } from './proyectos-de-investigacion.component';

describe('ProyectosDeInvestigacionComponent', () => {
  let component: ProyectosDeInvestigacionComponent;
  let fixture: ComponentFixture<ProyectosDeInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosDeInvestigacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosDeInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
