import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { InsufficientPermissionsComponent } from './insufficient-permissions/insufficient-permissions.component';

const routes: Route[] = [{ path: 'insufficient-permissions', component: InsufficientPermissionsComponent }];

@NgModule({
  declarations: [InsufficientPermissionsComponent],
  imports: [CommonModule, SharedModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild(routes)],
})
export class ErrorModule {}
