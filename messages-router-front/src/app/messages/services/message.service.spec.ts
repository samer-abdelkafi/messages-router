import { TestBed } from '@angular/core/testing';

import { MessageAuditService } from './message.service';

describe('MessagesService', () => {
  let service: MessageAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
