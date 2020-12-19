import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuccessDialogComponent } from './form-success-dialog.component';

describe('FormSuccessDialogComponent', () => {
  let component: FormSuccessDialogComponent;
  let fixture: ComponentFixture<FormSuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSuccessDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
