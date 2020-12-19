import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableListItemComponent } from './selectable-list-item.component';

describe('SelectableListItemComponent', () => {
  let component: SelectableListItemComponent;
  let fixture: ComponentFixture<SelectableListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectableListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
