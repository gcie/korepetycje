import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PupilDetailedViewComponent } from './pupil-detailed-view.component';

describe('PupilDetailedViewComponent', () => {
  let component: PupilDetailedViewComponent;
  let fixture: ComponentFixture<PupilDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupilDetailedViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
