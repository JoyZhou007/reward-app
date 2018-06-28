import { TestBed, inject } from '@angular/core/testing';

import { EscapeHtmlService } from './escape-html.service';

describe('EscapeHtmlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscapeHtmlService]
    });
  });

  it('should be created', inject([EscapeHtmlService], (service: EscapeHtmlService) => {
    expect(service).toBeTruthy();
  }));
});
