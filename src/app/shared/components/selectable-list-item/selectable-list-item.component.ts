import { Component, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-selectable-list-item',
  templateUrl: './selectable-list-item.component.html',
  styleUrls: ['./selectable-list-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectableListItemComponent),
      multi: true,
    },
  ],
})
export class SelectableListItemComponent implements ControlValueAccessor {
  @Input() title: string;
  @Input() labelWidth = 30;
  @Input() data: { [value: number]: string };

  @ViewChild('select') select: MatSelect;

  value: string;
  onChange = (_: any) => {};

  editMode = false;
  wasInsideClick = false;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  submit() {
    this.onChange(this.value);
  }

  triggerEdit() {
    this.editMode = true;
    setTimeout(() => {
      console.log(this.select);
      this.select.open();
    });
  }

  registerOnTouched(fn: any): void {}

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
