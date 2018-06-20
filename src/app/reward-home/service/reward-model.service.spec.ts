import { TestBed, inject } from '@angular/core/testing';

import { RewardModelService } from './reward-model.service';

describe('RewardModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RewardModelService]
    });
  });

  it('should be created', inject([RewardModelService], (service: RewardModelService) => {
    expect(service).toBeTruthy();
  }));
});
