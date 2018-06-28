import { TestBed, inject } from '@angular/core/testing';

import { DateFormatService } from './date-format.service';

describe('DateFormatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateFormatService]
    });
  });

  it('should be created', inject([DateFormatService], (service: DateFormatService) => {
    expect(service).toBeTruthy();
  }));
});
