import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export function ofType<K extends string[]>(
  ...type: K
): <A extends Action>(
  actions$: Observable<A>,
) => Observable<A & Action<K[number]>> {
  return (actions$) =>
    actions$.pipe(filter((action) => type.includes(action.type)));
}
