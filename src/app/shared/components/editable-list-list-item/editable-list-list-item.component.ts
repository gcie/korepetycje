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

  set value(value: { [name: string]: boolean }) {
    this._value = value;
    this.formattedValue = Object.keys(this.value)
      .filter((k) => this.value[k])
      .join(', ');
  }
  get value() {
    return this._value;
  }
  private _value: { [name: string]: boolean };

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
    const dialogRef = this.dialog.open(EditDialogComponent, { data: this.value });
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
