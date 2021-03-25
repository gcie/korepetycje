export enum LessonsState {
  Inactive = 'Niezaczęte',
  Active = 'Aktywne',
  Suspended = 'Zawieszone',
  Finished = 'Zakończone',
}

export const lessonsStateData = {
  Niezaczęte: LessonsState.Inactive,
  Aktywne: LessonsState.Active,
  Zawieszone: LessonsState.Suspended,
  Zakończone: LessonsState.Finished,
};
