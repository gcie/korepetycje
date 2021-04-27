import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function all(...observables: Observable<any>[]): Observable<boolean> {
  return combineLatest(observables).pipe(map((results) => results.reduce((a, b) => !!a && !!b)));
}

export function any(...observables: Observable<any>[]): Observable<boolean> {
  return combineLatest(observables).pipe(map((results) => results.reduce((a, b) => !!a || !!b)));
}

export function firstNonNull() {
  return function <T>(source: Observable<T>): Observable<boolean> {
    return new Observable((subscriber) => {
      return source.subscribe({
        next(value) {
          if (!!value) {
            subscriber.next(true);
            subscriber.complete();
          }
        },
        complete() {
          subscriber.complete();
        },
        error(error) {
          subscriber.error(error);
        },
      });
    });
  };
}
