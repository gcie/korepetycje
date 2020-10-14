import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormResultDialogData } from '../form-success-dialog/form-success-dialog.component';

@Component({
  selector: 'app-form-failure-dialog',
  templateUrl: './form-failure-dialog.component.html',
  styleUrls: ['./form-failure-dialog.component.scss'],
})
export class FormFailureDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FormResultDialogData) {}
}
