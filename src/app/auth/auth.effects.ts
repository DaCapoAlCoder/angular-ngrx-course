import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Login, Logout, AuthActions } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';


@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      }
    })
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
  })
  );

  @Effect()
  init$ = defer<AuthActions>(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      return of(new Login(JSON.parse(userData)));
    } else {
      return of(new Logout());

    }
  });

  constructor(private actions$: Actions, private router: Router) {}
}
