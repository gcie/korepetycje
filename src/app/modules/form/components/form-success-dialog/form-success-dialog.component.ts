import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FormResultDialogData {
  mode: 'pupil' | 'parent' | 'tutor';
  email: string;
}

@Component({
  selector: 'app-form-success-dialog',
  templateUrl: './form-success-dialog.component.html',
  styleUrls: ['./form-success-dialog.component.scss'],
})
export class FormSuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FormResultDialogData) {}
}
