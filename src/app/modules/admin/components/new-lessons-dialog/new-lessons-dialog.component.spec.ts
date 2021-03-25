import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewLessonsDialogComponent } from './new-lessons-dialog.component';

describe('NewLessonsDialogComponent', () => {
  let component: NewLessonsDialogComponent;
  let fixture: ComponentFixture<NewLessonsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewLessonsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLessonsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
