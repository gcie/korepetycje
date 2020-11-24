import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiselectCheckboxComponent } from './multiselect-checkbox.component';

describe('MultiselectChecboxComponent', () => {
  let component: MultiselectCheckboxComponent;
  let fixture: ComponentFixture<MultiselectCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectCheckboxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
