import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PupilFormComponent } from './pupil-form.component';

describe('PupilFormComponent', () => {
    let component: PupilFormComponent;
    let fixture: ComponentFixture<PupilFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilFormComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PupilFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
