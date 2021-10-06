import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthApi } from 'src/app/shared/api/auth.api'
import { AuthRequest } from '../requests/auth.request'
import { RegisterRequest } from '../requests/register.request'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private authApi: AuthApi) {}

    register(request: RegisterRequest): Observable<any> {
        return this.authApi.register(request)
    }

    login(login: AuthRequest): Observable<any> {
        return this.authApi.login(login)
    }
}
