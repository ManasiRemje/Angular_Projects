import { TestBed } from '@angular/core/testing';

import { GiveRatingApiService } from './give-rating-api.service';

describe('GiveRatingApiService', () => {
  let service: GiveRatingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiveRatingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
