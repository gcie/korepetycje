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
  pupilId?: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
