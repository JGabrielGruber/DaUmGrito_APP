import { TestBed } from '@angular/core/testing';

import { ResolucoesService } from './resolucoes.service';

describe('ResolucoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolucoesService = TestBed.get(ResolucoesService);
    expect(service).toBeTruthy();
  });
});
