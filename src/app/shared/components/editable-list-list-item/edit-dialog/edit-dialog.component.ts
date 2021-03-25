import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  value: { [name: string]: boolean };

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.value = data;
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(Object.keys(this.value).filter((k) => this.value[k]));
  }
}
