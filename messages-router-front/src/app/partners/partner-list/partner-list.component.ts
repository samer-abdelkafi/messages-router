import {Component, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Partner} from '../model/partner.model';
import {PartnerService} from '../service/partner.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {PartnerEditDialogComponent} from '../partner-dialog/partner-edit-dialog.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-partners',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.scss'
})
export class PartnerListComponent {


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'alias', 'type', 'direction', 'application', 'flowType', 'description', 'action'];

  dataSource: MatTableDataSource<Partner> = new MatTableDataSource<Partner>();

  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;


  constructor(private partnerService: PartnerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadPartners(0, this.pageSize, 'id');
  }

  /**
   * Charge une page de messages
   */
  loadPartners(page: number, size: number, sortBy: string): void {
    this.partnerService.getPartners(page, size, sortBy).subscribe(
      data => {
        this.dataSource.data = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPartners(this.currentPage, this.pageSize, 'id');
  }

  refresh(): void {
    this.loadPartners(this.currentPage, this.pageSize, 'id');
  }


  editPartnerDialog(partner: Partner | undefined): void {
    const dialogRef = this.dialog.open(PartnerEditDialogComponent, {
      width: '600px',
      data: {partner: partner}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form data saved: ', result);
        this.partnerService.save(result).subscribe(
          data => {
            this.refresh();
          }
        )
      }
    });
  }

  deletePartner(row: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to permanently delete this item? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Proceed with delete operation if user confirms
        this.partnerService.delete(row.id).subscribe({
          next: () => {
            this.refresh()
          },
          error: err => console.error('Error deleting partner:', err),
        });
      }
    });
  }


}
