import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgumentsComponent } from './arguments.component';

describe('ArgumentsComponent', () => {
  let component: ArgumentsComponent;
  let fixture: ComponentFixture<ArgumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArgumentsComponent]
    });
    fixture = TestBed.createComponent(ArgumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
