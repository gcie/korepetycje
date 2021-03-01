import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableListListItemComponent } from './editable-list-list-item.component';

describe('EditableListListItemComponent', () => {
  let component: EditableListListItemComponent;
  let fixture: ComponentFixture<EditableListListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditableListListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableListListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
