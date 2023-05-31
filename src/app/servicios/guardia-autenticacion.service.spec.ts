import { TestBed } from '@angular/core/testing';

import { GuardiaAutenticacionService } from './guardia-autenticacion.service';

describe('GuardiaAutenticacionService', () => {
  let service: GuardiaAutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardiaAutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
