import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MessageListComponent} from './message-list.component';
import {MessageAuditService} from '../../services/message.service';
import {of} from 'rxjs';
import {TruncatePipe} from '../../../shared/pipes/truncate.pipe';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;
  let mockMessageAuditService: jasmine.SpyObj<MessageAuditService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    // Mock services
    mockMessageAuditService = jasmine.createSpyObj('MessageAuditService', ['getMessages']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    // Provide mock response for getMessages()
    const mockMessageResponse = {
      content: [
        {
          id: 1,
          jmsId: 'MSG001',
          inputDate: new Date(),
          content: 'Test message 1',
          targetQueue: 'Queue1',
          status: 'SUCCESS'
        },
        {
          id: 2,
          jmsId: 'MSG002',
          inputDate: new Date(),
          content: 'Test message 2',
          targetQueue: 'Queue2',
          status: 'FAILED'
        },
      ],
      totalElements: 2,
      totalPages: 1,
    };
    // @ts-ignore
    mockMessageAuditService.getMessages.and.returnValue(of(mockMessageResponse));

    await TestBed.configureTestingModule({
      declarations: [], // Component + TruncatePipe for the template
      imports: [MessageListComponent, TruncatePipe, MatTableModule, MatPaginatorModule], // Material modules
      providers: [
        {provide: MessageAuditService, useValue: mockMessageAuditService},
        {provide: MatDialog, useValue: mockDialog},
        DatePipe, // Date formatting in the template
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore any unknown template elements for simplicity
    }).compileComponents();

    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial rendering
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load messages on init', () => {
    expect(mockMessageAuditService.getMessages).toHaveBeenCalledOnceWith(0, 10, 'jmsId'); // Default page and size
    expect(component.totalElements).toBe(2); // Total number of elements in mock response
    expect(component.dataSource.data.length).toBe(2); // Two messages in the mock response
  });

  it('should render table with data', () => {
    // TODO should render table with data
  });

  it('should handle page change event', () => {
    const pageEvent: PageEvent = {pageIndex: 1, pageSize: 5, length: 0}; // Mock page event
    spyOn(component, 'loadMessages'); // Spy on the method to prevent actual execution

    component.onPageChange(pageEvent);
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(5);
    expect(component.loadMessages).toHaveBeenCalledOnceWith(1, 5, 'jmsId');
  });

  it('should open message dialog on row click', () => {
    // TODO should open message dialog on row click
  });

  it('should refresh messages when button is clicked', () => {
    spyOn(component, 'loadMessages'); // Spy on loadMessages to track calls

    // Find and click the refresh button
    const refreshButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    refreshButton.click();
    // Verify it loads the messages again
    expect(component.loadMessages).toHaveBeenCalledOnceWith(0, 10, 'jmsId');
  });
});
