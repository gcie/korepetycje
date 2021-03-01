import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PromptStringValueDialogData {
  title?: string;
  prompt?: string;
  label?: string;
  value?: string;
  placeholder?: string;
}

@Component({
  selector: 'app-prompt-string-value-dialog',
  templateUrl: './prompt-string-value-dialog.component.html',
  styleUrls: ['./prompt-string-value-dialog.component.scss'],
})
export class PromptStringValueDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PromptStringValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromptStringValueDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  @HostListener('document:keydown.enter')
  onEnter() {
    this.dialogRef.close(this.data.value);
  }
}
