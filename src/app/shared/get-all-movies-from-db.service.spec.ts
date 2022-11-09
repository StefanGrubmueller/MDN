import { TestBed } from '@angular/core/testing';

import { GetAllMoviesFromDBService } from './get-all-movies-from-db.service';

describe('GetAllMoviesFromDBService', () => {
  let service: GetAllMoviesFromDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllMoviesFromDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
