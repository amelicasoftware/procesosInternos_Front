import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDireccionDeTesisComponent } from './form-direccion-de-tesis.component';

describe('FormDireccionDeTesisComponent', () => {
  let component: FormDireccionDeTesisComponent;
  let fixture: ComponentFixture<FormDireccionDeTesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDireccionDeTesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDireccionDeTesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
