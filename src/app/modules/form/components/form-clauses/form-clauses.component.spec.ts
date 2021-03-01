import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClausesComponent } from './form-clauses.component';

describe('FormClausesComponent', () => {
  let component: FormClausesComponent;
  let fixture: ComponentFixture<FormClausesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormClausesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClausesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
