import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseUIModule } from 'firebaseui-angular';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), FirebaseUIModule, FlexLayoutModule, MaterialModule],
})
export class LoginModule {}
