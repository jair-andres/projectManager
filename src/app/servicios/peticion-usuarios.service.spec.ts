import { TestBed } from '@angular/core/testing';

import { PeticionUsuariosService } from './peticion-usuarios.service';

describe('PeticionUsuariosService', () => {
  let service: PeticionUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
