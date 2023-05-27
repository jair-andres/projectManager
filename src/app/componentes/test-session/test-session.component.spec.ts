import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSessionComponent } from './test-session.component';

describe('TestSessionComponent', () => {
  let component: TestSessionComponent;
  let fixture: ComponentFixture<TestSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSessionComponent]
    });
    fixture = TestBed.createComponent(TestSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
