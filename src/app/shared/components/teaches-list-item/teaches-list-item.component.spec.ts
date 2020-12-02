import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachesListItemComponent } from './teaches-list-item.component';

describe('TeachesListItemComponent', () => {
  let component: TeachesListItemComponent;
  let fixture: ComponentFixture<TeachesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
