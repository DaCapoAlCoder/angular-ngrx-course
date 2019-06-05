import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActionTypes } from './auth.actions';
import { AuthActions } from './auth.actions';


export interface Authstate {
  loggedIn: boolean,
  user: User

}

export const initialState: Authstate = {
  loggedIn: false,
  user: undefined

};

export function authReducer(state = initialState, action: AuthActions): Authstate {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user
      };
      case AuthActionTypes.LogoutAction:
        return {
          loggedIn: false,
          user: undefined
        };

    default:
      return state;
  }
}
