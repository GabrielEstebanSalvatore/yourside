import { Action } from "@ngrx/store";
import { UserModel } from "src/app/shared/models/user.model";
import { AuthRequest } from "../requests/auth.request";
import { AppConstant } from "./app.constant";

export class Login implements Action {
    readonly type = AppConstant.LOGIN;
    constructor(public payload: AuthRequest) {}
   }

   export class LoggedUser implements Action {
    readonly type = AppConstant.LOGGED_USER;
    constructor(public payload: UserModel) {}
   }

   export class Logout implements Action {
    readonly type = AppConstant.LOGOUT;
   }

   export class GetError implements Action {
    readonly type = AppConstant.ERROR;
    constructor(public payload: any) {}
   }

   export class GetAuthenticatedClient implements Action {
    readonly type = AppConstant.GET_AUTHENTICATED_CLIENT;
    constructor(public payload?: any) {}
   }

   export class AuthenticatedClient implements Action {
    readonly type = AppConstant.AUTHENTICATED_CLIENT;
    constructor(public payload: any){}
   }

   export class ChangeProfile implements Action {
    readonly type = AppConstant.CHANGE_PROFILE;
    constructor(public payload: any){}
   }
   
   export type AppActions 
   = Login
   | LoggedUser
   | Logout
   | GetError
   | GetAuthenticatedClient
   | AuthenticatedClient
   | ChangeProfile;