import { TestBed } from '@angular/core/testing';

import { FisicoquimicosService } from './fisicoquimicos.service';

describe('FisicoquimicosService', () => {
  let service: FisicoquimicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FisicoquimicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
