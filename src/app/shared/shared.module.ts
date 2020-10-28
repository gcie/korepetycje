import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { EditableListItemComponent } from './editable-list-item/editable-list-item.component';
import { MultiselectCheckboxComponent } from './multiselect-checkbox/multiselect-checkbox.component';
import { NoopCheckboxComponent } from './noop-checkbox/noop-checkbox.component';
import { SelectableListItemComponent } from './selectable-list-item/selectable-list-item.component';

@NgModule({
  declarations: [NoopCheckboxComponent, MultiselectCheckboxComponent, EditableListItemComponent, SelectableListItemComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [NoopCheckboxComponent, MultiselectCheckboxComponent, EditableListItemComponent, SelectableListItemComponent],
})
export class SharedModule {}
