import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptStringValueDialogComponent } from './prompt-string-value-dialog.component';

describe('PromptStringValueDialogComponent', () => {
  let component: PromptStringValueDialogComponent;
  let fixture: ComponentFixture<PromptStringValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptStringValueDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptStringValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
