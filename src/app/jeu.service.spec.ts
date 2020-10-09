import { TestBed } from '@angular/core/testing';

import { JeuService } from './jeu.service';

describe('JeuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JeuService = TestBed.get(JeuService);
    expect(service).toBeTruthy();
  });
});
