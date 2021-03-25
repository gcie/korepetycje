export enum LessonsMode {
  OnlyStationary = 1,
  PreferStationary,
  Indifferent,
  PreferRemote,
  OnlyRemote,
}

export const lessonsModeData = {
  'Tylko stacjonarnie': LessonsMode.OnlyStationary,
  'Lepiej stacjonarnie': LessonsMode.PreferStationary,
  'Bez różnicy': LessonsMode.Indifferent,
  'Lepiej zdalnie': LessonsMode.PreferRemote,
  'Tylko zdalnie': LessonsMode.OnlyRemote,
};
