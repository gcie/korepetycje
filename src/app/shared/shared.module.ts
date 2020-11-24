import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { EditableListItemComponent } from './components/editable-list-item/editable-list-item.component';
import { MultiselectCheckboxComponent } from './components/multiselect-checkbox/multiselect-checkbox.component';
import { NoopCheckboxComponent } from './components/noop-checkbox/noop-checkbox.component';
import { SelectableListItemComponent } from './components/selectable-list-item/selectable-list-item.component';
import { LessonsModePipe } from './pipes/lessons-mode.pipe';
import { TeachesPipe } from './pipes/teaches.pipe';

@NgModule({
  declarations: [
    NoopCheckboxComponent,
    MultiselectCheckboxComponent,
    EditableListItemComponent,
    SelectableListItemComponent,
    TeachesPipe,
    LessonsModePipe,
  ],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    NoopCheckboxComponent,
    MultiselectCheckboxComponent,
    EditableListItemComponent,
    SelectableListItemComponent,
    TeachesPipe,
    LessonsModePipe,
  ],
})
export class SharedModule {}
