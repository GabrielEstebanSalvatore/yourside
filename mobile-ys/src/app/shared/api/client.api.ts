import { Injectable } from '@angular/core'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkService } from 'src/app/core/services/network.service'
import { ClientModel } from '../models/client.model'
@Injectable()
export class ClientApi extends BaseApi<ClientModel> {
    constructor(protected networkService: NetworkService) {
        super(networkService)
        this.apiEndpoint = 'clients'
    }
}