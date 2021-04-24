import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  level = environment.log;

  debug(...data: any[]) {
    if (this.level == 'debug') {
      console.log(...data);
    }
  }

  info(...data: any[]) {
    if (this.level == 'debug' || this.level == 'info') {
      console.log(...data);
    }
  }

  warn(...data: any[]) {
    if (this.level == 'debug' || this.level == 'info' || this.level == 'warn') {
      console.warn(...data);
    }
  }

  error(...data: any[]) {
    if (this.level == 'debug' || this.level == 'info' || this.level == 'warn' || this.level == 'error') {
      console.error(...data);
    }
  }
}
