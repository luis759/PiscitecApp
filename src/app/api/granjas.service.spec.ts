import { TestBed } from '@angular/core/testing';

import { GranjasService } from './granjas.service';

describe('GranjasService', () => {
  let service: GranjasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GranjasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
