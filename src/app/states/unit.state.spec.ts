import { TestBed } from '@angular/core/testing';

import { UnitState } from './unit.state';

describe('UnitState', () => {
  let service: UnitState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
