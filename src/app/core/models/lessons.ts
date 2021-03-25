import { LessonsMode } from '../enum/lessons-mode.enum';
import { LessonsState } from '../enum/lessons-state.enum';

export interface Lessons {
  _id: string;
  tutorId: string;
  pupilId: string;
  state: LessonsState;
  remoteOrStationary: LessonsMode;
  subject: string;
  notes: string;
  started: Date;
  finished: Date;
}

export const defaultLessons = {
  _id: null,
  tutorId: null,
  pupilId: null,
  state: null,
  remoteOrStationary: null,
  subject: null,
  notes: null,
  started: null,
  finished: null,
};
