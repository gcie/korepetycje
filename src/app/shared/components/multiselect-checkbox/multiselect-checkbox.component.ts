import { Component, ElementRef, forwardRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

export function selectBetween(from: number, to: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let occurences = 0;
    for (let x in control.value) if (control.value[x]) occurences++;
    if (from <= occurences && occurences <= to) return null;
    return {
      notEnough: from > occurences ? { value: control.value } : null,
      tooMany: occurences > to ? { value: control.value } : null,
    };
  };
}

@Component({
  selector: 'multiselect-checkbox',
  templateUrl: './multiselect-checkbox.component.html',
  styleUrls: ['./multiselect-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectCheckboxComponent),
      multi: true,
    },
  ],
})
export class MultiselectCheckboxComponent implements ControlValueAccessor {
  valueKeys: string[] = [];
  value: { [name: string]: boolean } = {};

  customValue: boolean[] = [];
  customName: string[] = [];
  customId: number[] = [];

  newCustomCheckboxState = false;

  _onChange = (_: any) => {};

  @Input() allowCustom: number | string;
  @Input() customPlaceholder: string;

  @ViewChildren('customInput') customInput: QueryList<ElementRef>;
  @ViewChild('newCustomCheckbox') newCustomCheckbox: MatCheckbox;

  writeValue(value: any): void {
    this.value = value;
    this.valueKeys = value ? Object.keys(value) : [];
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched() {}

  onChange() {
    this._onChange(
      Object.assign(
        {},
        this.value,
        this.customName.reduce((o, n, i) => {
          o[n] = this.customValue[i];
          return o;
        }, {})
      )
    );
  }

  addCustom() {
    this.customName.push('');
    this.customValue.push(true);
    this.customId.push(this.customId.length);
    setTimeout(() => this.customInput.last.nativeElement.focus(), 0);
  }
}
