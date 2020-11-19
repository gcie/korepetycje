import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAlertDialogComponent } from './covid-alert-dialog.component';

describe('CovidAlertDialogComponent', () => {
  let component: CovidAlertDialogComponent;
  let fixture: ComponentFixture<CovidAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidAlertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
