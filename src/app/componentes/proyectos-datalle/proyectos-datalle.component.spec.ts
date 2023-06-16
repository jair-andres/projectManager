import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosDatalleComponent } from './proyectos-datalle.component';

describe('ProyectosDatalleComponent', () => {
  let component: ProyectosDatalleComponent;
  let fixture: ComponentFixture<ProyectosDatalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectosDatalleComponent]
    });
    fixture = TestBed.createComponent(ProyectosDatalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
