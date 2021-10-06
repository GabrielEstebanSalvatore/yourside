import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkRequest } from 'src/app/core/classes/network-request.class'
import { HttpMethodEnum } from 'src/app/core/enums/http-method.enum'
import { AuthRequest } from 'src/app/core/requests/auth.request'
import { RegisterRequest } from 'src/app/core/requests/register.request'
import { NetworkService } from 'src/app/core/services/network.service'
import { environment } from 'src/environments/environment'
import { AuthModel } from '../models/auth.model'

@Injectable({
    providedIn: 'root',
})
export class AuthApi extends BaseApi<AuthModel> {
    constructor(protected networkService: NetworkService) {
        super(networkService)
        this.apiEndpoint = 'auth'
    }
    public register(body: RegisterRequest): Observable<any> {
        return this.networkService.callApi(
            new NetworkRequest(
                HttpMethodEnum.httpPost,
                `${environment.HOST_API}clientes`,
                body
            )
        )
    }
    public login(user: AuthRequest): Observable<any> {
        return this.networkService.callApi(
            new NetworkRequest(
                HttpMethodEnum.httpPost,
                `${environment.HOST_API}${this.apiEndpoint}`,
                user
            )
        )
    }
}
