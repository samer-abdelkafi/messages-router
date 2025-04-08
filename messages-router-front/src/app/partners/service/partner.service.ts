import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../../messages/models/page.model';
import {Partner} from '../model/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private readonly baseUrl = '/api/v1/partners';

  constructor(private http: HttpClient) {}

  getPartners(page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<Page<Partner>> {
    return this.http.get<Page<Partner>>(`${this.baseUrl}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  save(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(`${this.baseUrl}`, partner);
  }

  /**
   * Deletes a partner by ID
   * @param id - ID of the partner to delete
   * @returns An Observable for the HTTP response
   */
  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }


}
