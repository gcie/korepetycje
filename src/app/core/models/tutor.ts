import { LessonsMode } from '../enum/lessons-mode.enum';

export interface Tutor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  teaches: {
    [subject: string]: {
      sp: boolean;
      lo: boolean;
      matura: boolean;
    };
  };
  activeLessons: {
    pupilId?: string;
    pupilName?: string;
    subject: string;
    date: Date;
    since: Date;
    form: string;
    notes: string;
  };
  remoteOrStationary: LessonsMode;
  notes: string;
  submittedDate: Date;
}
