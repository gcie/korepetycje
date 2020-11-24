import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teaches',
})
export class TeachesPipe implements PipeTransform {
  transform(
    value: {
      [subject: string]: {
        sp: boolean;
        lo: boolean;
        matura: boolean;
      };
    },
    ...args: unknown[]
  ): string {
    return Object.keys(value)
      .map((subject) => {
        if (value[subject].sp && value[subject].lo && value[subject].matura) return subject;
        else {
          let modes = Object.keys(value[subject]).filter((key) => value[subject][key]);
          return `${subject} (${modes.join('+')})`;
        }
      })
      .join(', ');
  }
}
