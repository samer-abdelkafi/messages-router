import {Component, ViewChild} from '@angular/core';
import {MessageAudit} from '../../models/message-audit.model';
import {MessageAuditService} from '../../services/message.service';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {TruncatePipe} from '../../../shared/pipes/truncate.pipe';
import { MatDialog } from '@angular/material/dialog';
import {MessageDialogComponent} from '../../message-dialog/message-dialog.component';
import {DatePipe} from '@angular/common';



@Component({
  selector: 'app-messages',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    TruncatePipe,
    DatePipe
  ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['id','jmsId','inputDate','content','targetQueue','status'];
  dataSource:MatTableDataSource<MessageAudit>=new MatTableDataSource<MessageAudit>();

  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;


  constructor(private messageAuditService: MessageAuditService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMessages(0, this.pageSize, 'jmsId');
  }

  /**
   * Charge une page de messages
   */
  loadMessages(page: number, size: number, sortBy: string): void {
    this.messageAuditService.getMessages(page, size, sortBy).subscribe(
     data => {
        this.dataSource.data = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      }
    );
  }


  /**
   * Gestion de l'événement de pagination
   */
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMessages(this.currentPage, this.pageSize, 'jmsId');
  }


  openMessageDialog(messageContent: string): void {
    this.dialog.open(MessageDialogComponent, {
      width: '600px',
      data: { content: messageContent }, // Passage de la donnée à la boîte de dialogue
    });
  }




}
