import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { PartnerListComponent } from './partner-list.component';
import { PartnerService } from '../service/partner.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PartnerEditDialogComponent } from '../partner-dialog/partner-edit-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

describe('PartnerListComponent', () => {
  let component: PartnerListComponent;
  let fixture: ComponentFixture<PartnerListComponent>;
  let mockPartnerService: jasmine.SpyObj<PartnerService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    // Mock PartnerService
    mockPartnerService = jasmine.createSpyObj('PartnerService', ['getPartners', 'save', 'delete']);
    const mockPartnerData = {
      content: [
        { id: 1, alias: 'Partner1', type: 'Type1', direction: 'Inbound', application: 'App1', flowType: 'Sync', description: 'Description1' },
        { id: 2, alias: 'Partner2', type: 'Type2', direction: 'Outbound', application: 'App2', flowType: 'Async', description: 'Description2' },
      ],
      totalElements: 2,
      totalPages: 1,
    };
    // @ts-ignore
    mockPartnerService.getPartners.and.returnValue(of(mockPartnerData));

    // Mock MatDialog
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    const mockDialogRef = {
      afterClosed: () => of(true), // Simulate closing dialog with result
    };
    // @ts-ignore
    mockDialog.open.and.returnValue(mockDialogRef);

    await TestBed.configureTestingModule({
      declarations: [], // Component under test
      imports: [PartnerListComponent, MatTableModule, MatPaginatorModule],
      providers: [
        { provide: PartnerService, useValue: mockPartnerService },
        { provide: MatDialog, useValue: mockDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load partners on init', () => {
    expect(mockPartnerService.getPartners).toHaveBeenCalledWith(0, 10, 'id'); // Verify initial load
    expect(component.dataSource.data.length).toBe(2);
    expect(component.totalElements).toBe(2);
  });

  it('should render table with data', () => {
    // TODO fix test
  });

  it('should handle pagination events', () => {
    spyOn(component, 'loadPartners'); // Spy on loadPartners
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 25, length: 0 };

    component.onPageChange(pageEvent);

    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(25);
    expect(component.loadPartners).toHaveBeenCalledWith(1, 25, 'id');
  });

  it('should open edit dialog and save partner', () => {
    // Spy save method
    const mockPartner = {
      id: 1,
      alias: 'UpdatedPartner',
      type: 'Type1',
      direction: 'Inbound',
      application: 'App1',
      flowType: 'Sync',
      description: 'Description1'
    };
    // @ts-ignore
    mockDialog.open.and.returnValue({
      afterClosed: () => of(mockPartner),
    });
    // @ts-ignore
    mockPartnerService.save.and.returnValue(of(mockPartner));

    // @ts-ignore
    component.editPartnerDialog(mockPartner);

    expect(mockDialog.open).toHaveBeenCalledWith(PartnerEditDialogComponent, jasmine.any(Object));
    // @ts-ignore
    expect(mockPartnerService.save).toHaveBeenCalledWith(mockPartner);
  });
});

