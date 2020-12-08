import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserConfigResolver } from 'src/app/core/resolvers/user-config.resolver';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdminComponent } from './admin.component';
import { TutorDetailedViewComponent } from './views/tutor-detailed-view/tutor-detailed-view.component';
import { TutorsListViewComponent } from './views/tutors-list-view/tutors-list-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'tutors', component: TutorsListViewComponent, resolve: { config: UserConfigResolver } },
      { path: 'tutor/:id', component: TutorDetailedViewComponent },
    ],
  },
];

@NgModule({
  declarations: [TutorsListViewComponent, TutorDetailedViewComponent, AdminComponent],
  imports: [CommonModule, MaterialModule, SharedModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
