import { Injectable } from '@angular/core'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkService } from 'src/app/core/services/network.service'
import { OfferModel } from '../models/offer.model'

@Injectable()
export class OfferApi extends BaseApi<OfferModel> {
    constructor(protected networkService: NetworkService) {
        super(networkService)
        this.apiEndpoint = 'offers'
    }
}