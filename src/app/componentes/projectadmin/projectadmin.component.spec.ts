import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectadminComponent } from './projectadmin.component';

describe('ProjectadminComponent', () => {
  let component: ProjectadminComponent;
  let fixture: ComponentFixture<ProjectadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectadminComponent]
    });
    fixture = TestBed.createComponent(ProjectadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
