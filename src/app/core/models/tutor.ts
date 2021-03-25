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
  remoteOrStationary: LessonsMode;
  notes: string;
  students?: string[];
  submittedDate: Date;
}

export const defaultTutor = {
  _id: null,
  name: null,
  email: null,
  phone: null,
  teaches: null,
  remoteOrStationary: null,
  notes: null,
  submittedDate: null,
};
