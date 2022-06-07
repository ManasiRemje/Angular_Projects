import { TestBed } from '@angular/core/testing';

import { SalonapiService } from './salonapi.service';

describe('SalonapiService', () => {
  let service: SalonapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalonapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
