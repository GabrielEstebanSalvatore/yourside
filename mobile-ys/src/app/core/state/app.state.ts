import { AuthRequest } from "../requests/auth.request";

export interface State {
    user: AuthRequest;
    token: string;
    loggedIn: boolean;
    isLoading: boolean;
    errorMessage: string;
    hasError: boolean;
    clientAuth: boolean;
    client: any;
}