export interface Pupil {
  _id: string;
  class: string;
  contactEmail: string;
  name: string;
  email: string;
  phone?: string;
  needs: string[];
  isMature?: boolean;
  remoteOrStationary: number;
  mainNeeds?: string;
  tutorId?: string;
  notes: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  lessonsStatus: string;
  assignedTutorId?: string;
  assignedTutorName?: string;
  submittedBy: 'himself' | 'parent';
  alreadyAttended: boolean;
  previousTutor: string;
  submittedDate: Date;
  tutors?: string[];
}

export const defaultPupil = {
  _id: null,
  class: null,
  contactEmail: null,
  name: null,
  email: null,
  phone: null,
  needs: null,
  isMature: null,
  remoteOrStationary: null,
  mainNeeds: null,
  tutorId: null,
  notes: null,
  parentName: null,
  parentEmail: null,
  parentPhone: null,
  lessonsStatus: null,
  assignedTutorId: null,
  assignedTutorName: null,
  submittedBy: null,
  alreadyAttended: null,
  previousTutor: null,
  submittedDate: null,
};
