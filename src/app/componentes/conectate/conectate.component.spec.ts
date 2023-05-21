import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectateComponent } from './conectate.component';

describe('ConectateComponent', () => {
  let component: ConectateComponent;
  let fixture: ComponentFixture<ConectateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConectateComponent]
    });
    fixture = TestBed.createComponent(ConectateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
