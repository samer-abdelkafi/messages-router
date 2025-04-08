import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-message-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss'
})
export class MessageDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { content: string }) {}


}
