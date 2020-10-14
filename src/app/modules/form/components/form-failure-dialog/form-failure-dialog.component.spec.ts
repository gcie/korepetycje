import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFailureDialogComponent } from './form-failure-dialog.component';

describe('FormFailureDialogComponent', () => {
  let component: FormFailureDialogComponent;
  let fixture: ComponentFixture<FormFailureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFailureDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFailureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
