import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { EditableListItemComponent } from './components/editable-list-item/editable-list-item.component';
import { EditDialogComponent } from './components/editable-list-list-item/edit-dialog/edit-dialog.component';
import { EditableListListItemComponent } from './components/editable-list-list-item/editable-list-list-item.component';
import { MultiselectCheckboxComponent } from './components/multiselect-checkbox/multiselect-checkbox.component';
import { NoopCheckboxComponent } from './components/noop-checkbox/noop-checkbox.component';
import { PromptStringValueDialogComponent } from './components/prompt-string-value-dialog/prompt-string-value-dialog.component';
import { SelectableListItemComponent } from './components/selectable-list-item/selectable-list-item.component';
import { TeachesListItemComponent } from './components/teaches-list-item/teaches-list-item.component';
import { LessonsModePipe } from './pipes/lessons-mode.pipe';
import { TeachesPipe } from './pipes/teaches.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    NoopCheckboxComponent,
    MultiselectCheckboxComponent,
    EditableListItemComponent,
    EditableListListItemComponent,
    SelectableListItemComponent,
    TeachesPipe,
    LessonsModePipe,
    TeachesListItemComponent,
    PromptStringValueDialogComponent,
    EditDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    NoopCheckboxComponent,
    MultiselectCheckboxComponent,
    EditableListItemComponent,
    EditableListListItemComponent,
    SelectableListItemComponent,
    TeachesPipe,
    LessonsModePipe,
    TeachesListItemComponent,
    PromptStringValueDialogComponent,
    EditDialogComponent,
  ],
})
export class SharedModule {}
