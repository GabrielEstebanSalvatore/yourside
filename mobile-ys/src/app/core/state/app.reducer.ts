import { AppActions } from "./app.action";
import { AppConstant } from "./app.constant";
import { State } from "./app.state";

const initialState: State = {
  user: {email:'', password:''},
  token: '',
  loggedIn : false,
  isLoading: false,
  errorMessage: '',
  hasError: false,
  client: {},
  clientAuth: false
}

export const appReducer = (state: [], action: AppActions) => {
    switch(action.type){
            case AppConstant.LOGIN:
                return {
                    ...state,
                    hasError: false,
                    errorMessage: null,
                    isLoading: true
                }
              case AppConstant.LOGGED_USER:
                return {
                  ...state,
                  loggedIn: true,
                  token: action.payload,
                  isLoading: false,
                };
              case AppConstant.LOGOUT:
                  return {
                    ...state,
                    token: null,
                    clientAuth: false,
                    client: null,
                    loggedIn: false
                }
              case AppConstant.ERROR:
                return {
                  ...state,
                  errorMessage: action.payload,
                  hasError: true,
                  isLoading: false,
                };
              case AppConstant.GET_AUTHENTICATED_CLIENT:
                  return {
                    ...state,
                    clientAuth: true
                }
              case AppConstant.AUTHENTICATED_CLIENT:
                return {
                  ...state,
                  client: action.payload,
                  hasError: false
                }
              case AppConstant.CHANGE_PROFILE:
                return{
                  ...state,
                  client: action.payload,
                  hasError: false
                }
        default: 
        return state;
    }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const selectUser = (state: State) => state.user;
export const errorMessage = (state: State) => state.errorMessage;
export const hasError = (state: State) => state.hasError;
export const isLoading = (state: State) => state.isLoading;
export const clientAuth = (state: State) => state.clientAuth;
export const client = (state: State) => state.client;
