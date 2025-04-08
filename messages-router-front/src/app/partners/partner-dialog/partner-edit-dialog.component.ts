
import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Partner, PartnerDirectionEnum, PartnerFlowTypeEnum} from '../model/partner.model';
import {NgForOf, NgIf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-partner-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatFormField,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatLabel,
    MatSelect,
    MatInput,
    NgIf,
    NgForOf,
    MatOption
  ],
  templateUrl: './partner-edit-dialog.component.html',
  styleUrl: './partner-edit-dialog.component.scss'
})
export class PartnerEditDialogComponent {

  partnerForm: FormGroup;

  directions = Object.values(PartnerDirectionEnum);
  flowTypes = Object.values(PartnerFlowTypeEnum);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PartnerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partner
  ) {
    this.partnerForm = this.fb.group({
      alias: [data?.alias || '', [Validators.required, Validators.minLength(3)]],
      type: [data?.type || '', Validators.required],
      direction: [data?.direction || '', Validators.required],
      application: [data?.application || ''],
      flowType: [data?.flowType || '', Validators.required],
      description: [data?.description || '', [Validators.required, Validators.minLength(10)]],
    });
  }

  save() {
    if (this.partnerForm.valid) {
      this.dialogRef.close(this.partnerForm.value);
    }
  }

  close() {
    this.dialogRef.close(null);
  }


}
