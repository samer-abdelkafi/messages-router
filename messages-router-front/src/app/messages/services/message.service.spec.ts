import { TestBed } from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import { Page } from '../models/page.model'; // Adjust import based on your project structure
import { MessageAudit } from '../models/message-audit.model';
import {MessageAuditService} from './message.service';
import {provideHttpClient} from '@angular/common/http'; // Adjust import based on your project structure

describe('MessageAuditService', () => {
  let service: MessageAuditService;
  let httpMock: HttpTestingController;

  const mockResponse: Page<MessageAudit> = {
    content: [
      { id: 1,
        jmsId: "strin",
        inputDate: 'inputDate',
        content: 'content1',
        targetQueue: 'targetQueue1',
        status: 'OK'}
    ],
    totalElements: 1,
    totalPages: 1,
    size: 1,
    number: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MessageAuditService, provideHttpClient(), provideHttpClientTesting() ],
    });

    service = TestBed.inject(MessageAuditService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMessages with default parameters and return data', () => {
    service.getMessages().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.content.length).toBe(1);
      expect(response.content[0].content).toBe('content1');
    });

    const req = httpMock.expectOne(`/api/v1/messages?page=0&size=10&sortBy=id`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate returning mockResponse
  });

  it('should call getMessages with specified parameters', () => {
    service.getMessages(1, 5, 'id').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`/api/v1/messages?page=1&size=5&sortBy=id`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
