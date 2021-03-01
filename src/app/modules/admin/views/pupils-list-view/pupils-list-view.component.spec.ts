import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PupilsListViewComponent } from './pupils-list-view.component';

describe('PupilsListViewComponent', () => {
  let component: PupilsListViewComponent;
  let fixture: ComponentFixture<PupilsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupilsListViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
