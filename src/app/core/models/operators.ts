import { combineLatest, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function all(...observables: Observable<any>[]): Observable<boolean> {
  return forkJoin(observables).pipe(map((results) => results.reduce((a, b) => !!a && !!b)));
}

export function any(...observables: Observable<any>[]): Observable<boolean> {
  return combineLatest(observables).pipe(map((results) => results.reduce((a, b) => !!a || !!b)));
}
