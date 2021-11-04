import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Login, LoggedUser, GetError, GetAuthenticatedClient, AuthenticatedClient, Logout } from "./app.action";
import { AppConstant } from "./app.constant";

@Injectable()
export class AppEffects{
    @Effect()
    postLogin$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(AppConstant.LOGIN), 
    map(action => action.payload),
    exhaustMap(auth => {
        return this.authService.login(auth).pipe(
            map(response => new LoggedUser(response),
            catchError(error => of(new GetError(error))))
        )
    }) 
    );

    @Effect()
    getClient$: Observable<Action> = this.actions$.pipe(
    ofType<GetAuthenticatedClient>(AppConstant.GET_AUTHENTICATED_CLIENT), 
    switchMap(() => {
           return this.authService.authenticatedClient().pipe(
            map(response => new AuthenticatedClient(response.client[0]),
            catchError(error => of(new GetError(error))))
        )
    }) 
    );

    @Effect({dispatch: false})
    loginError$: Observable<Action> = this.actions$.pipe(
        ofType<GetError>(AppConstant.ERROR),
        map(data => data)
        
    )

    @Effect({dispatch: false})
    logout$: Observable<Action> = this.actions$.pipe(
                ofType<Logout>(AppConstant.LOGOUT),
                tap(action => {
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                })
    )

    @Effect({dispatch: false})
    loggedUser$: Observable<Action> = this.actions$.pipe(
        ofType<LoggedUser>(AppConstant.LOGGED_USER),
        tap((r:any) => {
            localStorage.setItem('token', r.payload.token);
            this.router.navigate(['/home']);
        })
    )

    @Effect({dispatch: false})
    loggedClient$: Observable<Action> = this.actions$.pipe(
        ofType<AuthenticatedClient>(AppConstant.AUTHENTICATED_CLIENT),
        tap(r => { console.log(r)})
    )

   constructor(private actions$: Actions, private authService: AuthService, private router: Router){}
}

