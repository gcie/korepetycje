export enum LessonsMode {
  OnlyStationary = 1,
  PreferStationary,
  Indifferent,
  PreferRemote,
  OnlyRemote,
}

export const lessonsModeData = {
  [LessonsMode.OnlyStationary]: 'Tylko stacjonarnie',
  [LessonsMode.PreferStationary]: 'Lepiej stacjonarnie',
  [LessonsMode.Indifferent]: 'Bez różnicy',
  [LessonsMode.PreferRemote]: 'Lepiej zdalnie',
  [LessonsMode.OnlyRemote]: 'Tylko zdalnie',
};
