import { Pipe, PipeTransform } from '@angular/core';
import { LessonsMode, lessonsModeData } from 'src/app/core/enum/lessons-mode.enum';

@Pipe({
  name: 'lessonsMode',
})
export class LessonsModePipe implements PipeTransform {
  lessonsModeReverseData = Object.entries(lessonsModeData).reduce((o, [k, v]) => {
    o[v] = k;
    return o;
  }, {});

  transform(value: LessonsMode): string {
    return this.lessonsModeReverseData[value];
  }
}
