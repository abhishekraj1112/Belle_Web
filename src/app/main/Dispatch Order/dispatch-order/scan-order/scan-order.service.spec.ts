import { TestBed } from '@angular/core/testing';

import { ScanOrderService } from './scan-order.service';

describe('ScanOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScanOrderService = TestBed.get(ScanOrderService);
    expect(service).toBeTruthy();
  });
});
