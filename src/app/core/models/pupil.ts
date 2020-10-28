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
  createdAt: Date;
  updatedAt: Date;
}
