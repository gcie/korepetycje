import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsListViewComponent } from './tutors-list-view.component';

describe('TutorsListViewComponent', () => {
  let component: TutorsListViewComponent;
  let fixture: ComponentFixture<TutorsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorsListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
