import { TestBed } from '@angular/core/testing';

import { CollaborationProposalService } from './collaboration-proposal.service';

describe('CollaborationProposalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollaborationProposalService = TestBed.get(CollaborationProposalService);
    expect(service).toBeTruthy();
  });
});
