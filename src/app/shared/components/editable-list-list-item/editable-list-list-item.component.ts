import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-editable-list-list-item',
  templateUrl: './editable-list-list-item.component.html',
  styleUrls: ['./editable-list-list-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableListListItemComponent),
      multi: true,
    },
  ],
})
export class EditableListListItemComponent implements ControlValueAccessor {
  @Input() type: string;
  @Input() labelWidth = 30;
  @Input() options: string[] = [];

  set value(value: string[]) {
    this._value = value;
    this.formattedValue = this.value.join(', ');
  }
  get value() {
    return this._value;
  }
  private _value: string[];

  formattedValue: string;
  onChange = (_: any) => {};

  wasInsideClick = false;

  constructor(private dialog: MatDialog) {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnTouched(fn: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  edit() {
    const data = {};
    this.options.forEach((o) => (data[o] = false));
    this.value.forEach((v) => (data[v] = true));
    const dialogRef = this.dialog.open(EditDialogComponent, { data });
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.value = value;
        this.submit();
      }
    });
  }

  submit() {
    this.onChange(this.value);
  }
}
