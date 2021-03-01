import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { lessonsModeData } from 'src/app/core/enum/lessons-mode.enum';
import { Pupil } from 'src/app/core/models/pupil';
import { PupilsService } from 'src/app/core/services/pupils.service';
import { AdminChild } from '../../admin.component';

@Component({
  selector: 'app-pupil-detailed-view',
  templateUrl: './pupil-detailed-view.component.html',
  styleUrls: ['./pupil-detailed-view.component.scss'],
})
export class PupilDetailedViewComponent implements OnInit, AdminChild {
  title: Subject<string> = new BehaviorSubject<string>('Korepetytorzy');
  name = 'pupilDetails';
  canGoBack = true;

  id: string;
  pupil: Observable<Pupil>;
  pupilForm = new FormGroup({});
  pupilFormChangeSubscription: Subscription;
  initializedForm = false;
  lessonsModeData = lessonsModeData;

  constructor(private route: ActivatedRoute, private pupils: PupilsService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => (this.id = params.id)),
        mergeMap((params) => (this.pupil = this.pupils.getPupil(params.id))),
        tap(console.log)
      )
      .subscribe((pupil: Pupil) => {
        const pupilGroup: any = pupil;
        pupilGroup.needs = pupil.needs
          ? pupil.needs.reduce(
              (n, c) => {
                n[c] = true;
                return n;
              },
              {
                matematyka: false,
                fizyka: false,
                chemia: false,
                biologia: false,
                polski: false,
                historia: false,
                angielski: false,
                niemiecki: false,
              } as any
            )
          : {
              matematyka: false,
              fizyka: false,
              chemia: false,
              biologia: false,
              polski: false,
              historia: false,
              angielski: false,
              niemiecki: false,
            };
        this.pupilForm = this.formBuilder.group(pupilGroup);

        console.log(this.pupilForm);
        this.initializedForm = true;
        this.pupilFormSubToChange();
        this.title.next(`Korepetytorzy - ${pupil.name}`);
      });
  }

  pupilFormSubToChange() {
    this.pupilFormChangeSubscription?.unsubscribe();
    this.pupilFormChangeSubscription = this.pupilForm.valueChanges.subscribe(this.pupilFormValueChange.bind(this));
  }

  pupilFormValueChange(value: any) {
    console.log('[pupilForm]', value);
    value.needs = value.needs ? Object.keys(value.needs).filter((k) => value.needs[k]) : [];
    this.pupils.updatePupil(this.id, value);
  }
}
