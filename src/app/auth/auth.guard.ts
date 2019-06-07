import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.pipe(
            select(isLoggedIn),
            tap( loggedIn => {
                if (!loggedIn) {
                    this.router.navigateByUrl('login');
                }
            })
        );
    }


}