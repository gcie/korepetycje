import { Pipe, PipeTransform } from '@angular/core';
import { LessonsMode, lessonsModeData } from 'src/app/core/enum/lessons-mode.enum';

@Pipe({
  name: 'lessonsMode',
})
export class LessonsModePipe implements PipeTransform {
  transform(value: LessonsMode, ...args: unknown[]): unknown {
    return lessonsModeData[value];
  }
}
