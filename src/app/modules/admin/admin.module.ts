import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdminHomeComponent } from './views/admin-home/admin-home.component';
import { TutorDetailedViewComponent } from './views/tutor-detailed-view/tutor-detailed-view.component';
import { TutorsListViewComponent } from './views/tutors-list-view/tutors-list-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    children: [
      { path: 'tutors', component: TutorsListViewComponent },
      { path: 'tutor/:id', component: TutorDetailedViewComponent },
    ],
  },
];

@NgModule({
  declarations: [AdminHomeComponent, TutorsListViewComponent, TutorDetailedViewComponent],
  imports: [CommonModule, SharedModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
