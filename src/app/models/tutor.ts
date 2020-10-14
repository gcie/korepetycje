export interface Tutor {
  _id?: string;
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
  remoteOrStationary: number;
  pupilId?: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
