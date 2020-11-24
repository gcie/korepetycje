import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-editable-list-item',
  templateUrl: './editable-list-item.component.html',
  styleUrls: ['./editable-list-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableListItemComponent),
      multi: true,
    },
  ],
})
export class EditableListItemComponent implements ControlValueAccessor {
  @Input() type: string;
  @Input() labelWidth = 30;

  value: string;
  onChange = (_: any) => {};

  editMode = false;
  wasInsideClick = false;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnTouched(fn: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  submit() {
    this.editMode = false;
    this.onChange(this.value);
  }

  cancel() {
    this.editMode = false;
  }

  @HostListener('click')
  clickInside() {
    this.wasInsideClick = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInsideClick) {
      this.cancel();
    }
    this.wasInsideClick = false;
  }
}
