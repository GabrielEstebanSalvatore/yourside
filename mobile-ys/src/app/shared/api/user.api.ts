import { Injectable } from '@angular/core'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkService } from 'src/app/core/services/network.service'
import { UserModel } from '../models/user.model'
@Injectable({
    providedIn: 'root',
})
export class UserApi extends BaseApi<UserModel> {
    constructor(networkService: NetworkService) {
        super(networkService)
        this.apiEndpoint = 'users'
    }
}
