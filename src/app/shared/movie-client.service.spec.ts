import { TestBed } from '@angular/core/testing';

import { MovieClientService } from './movie-client.service';

describe('MovieClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieClientService = TestBed.get(MovieClientService);
    expect(service).toBeTruthy();
  });
});
