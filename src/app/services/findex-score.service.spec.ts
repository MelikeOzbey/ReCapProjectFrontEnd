import { TestBed } from '@angular/core/testing';

import { FindexScoreService } from './findex-score.service';

describe('FindexScoreService', () => {
  let service: FindexScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindexScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
