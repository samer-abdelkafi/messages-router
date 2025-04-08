
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageAudit } from '../models/message-audit.model';
import {Page} from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class MessageAuditService {
  private readonly baseUrl = '/api/v1/messages';

  constructor(private http: HttpClient) {}

  getMessages(page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<Page<MessageAudit>> {
    return this.http.get<Page<MessageAudit>>(`${this.baseUrl}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }
  
}
