import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { MultiselectCheckboxComponent } from './multiselect-checkbox/multiselect-checkbox.component';
import { NoopCheckboxComponent } from './noop-checkbox/noop-checkbox.component';

@NgModule({
  declarations: [NoopCheckboxComponent, MultiselectCheckboxComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [NoopCheckboxComponent, MultiselectCheckboxComponent],
})
export class SharedModule {}
