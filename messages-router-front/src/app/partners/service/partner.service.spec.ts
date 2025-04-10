import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {PartnerService} from './partner.service';
import {Page} from '../../messages/models/page.model';
import {Partner, PartnerDirectionEnum, PartnerFlowTypeEnum} from '../model/partner.model';
import {provideHttpClient} from '@angular/common/http';

describe('PartnerService', () => {
  let service: PartnerService;
  let httpMock: HttpTestingController;

  const mockPartnersResponse: Page<Partner> = {
    content: [
      {
        id: 1,
        alias: 'PartnerOne',
        type: 'Internal',
        direction: PartnerDirectionEnum.INBOUND,
        application: 'App1',
        flowType: PartnerFlowTypeEnum.MESSAGE,
        description: 'Description for PartnerOne',
      },
      {
        id: 2,
        alias: 'PartnerTwo',
        type: 'External',
        direction: PartnerDirectionEnum.OUTBOUND,
        application: 'App2',
        flowType: PartnerFlowTypeEnum.MESSAGE,
        description: 'Description for PartnerTwo',
      }
    ],
    totalElements: 1,
    totalPages: 1,
    size: 1,
    number: 1
  };

  const mockPartner: Partner = {
    id: 3,
    alias: 'NewPartner',
    type: 'Internal',
    direction: PartnerDirectionEnum.OUTBOUND,
    application: 'App3',
    flowType: PartnerFlowTypeEnum.MESSAGE,
    description: 'Description for NewPartner',
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [PartnerService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PartnerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPartners', () => {
    it('should call getPartners with default parameters and return data', () => {
      service.getPartners().subscribe((response) => {
        expect(response).toEqual(mockPartnersResponse);
        expect(response.content.length).toBe(2);
        expect(response.content[0].alias).toBe('PartnerOne');
      });

      const req = httpMock.expectOne('/api/v1/partners?page=0&size=10&sortBy=id');
      expect(req.request.method).toBe('GET');
      req.flush(mockPartnersResponse);
    });

    it('should call getPartners with specified parameters', () => {
      service.getPartners(1, 5, 'name').subscribe((response) => {
        expect(response).toEqual(mockPartnersResponse);
      });

      const req = httpMock.expectOne('/api/v1/partners?page=1&size=5&sortBy=name');
      expect(req.request.method).toBe('GET');
      req.flush(mockPartnersResponse);
    });
  });

  describe('save', () => {
    it('should call save and return the saved partner', () => {
      service.save(mockPartner).subscribe((response) => {
        expect(response).toEqual(mockPartner);
        expect(response.alias).toBe('NewPartner');
      });

      const req = httpMock.expectOne('/api/v1/partners');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockPartner);
      req.flush(mockPartner);
    });
  });

  describe('delete', () => {
    it('should call delete and send a DELETE request to the correct URL', () => {
      const partnerId = 1;

      service.delete(partnerId).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`/api/v1/partners/${partnerId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
