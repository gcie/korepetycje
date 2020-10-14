import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopCheckboxComponent } from './noop-checkbox.component';

describe('NoopCheckboxComponent', () => {
  let component: NoopCheckboxComponent;
  let fixture: ComponentFixture<NoopCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoopCheckboxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoopCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
