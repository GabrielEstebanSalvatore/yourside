import { Injectable } from '@angular/core'
import { AppState } from '@capacitor/app'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkRequest } from 'src/app/core/classes/network-request.class'
import { HttpMethodEnum } from 'src/app/core/enums/http-method.enum'
import { NetworkService } from 'src/app/core/services/network.service'
import { StateService } from 'src/app/core/services/state.service'
import { environment } from 'src/environments/environment'
import { ReceiptModel } from '../models/receipt.model'
@Injectable({
    providedIn: 'root',
})
export class ReceiptApi extends BaseApi<ReceiptModel> {
    constructor(
        networkService: NetworkService,
        private stateProvider: StateService
    ) {
        super(networkService)
        this.apiEndpoint = 'receipts'
    }
    getState = async () => {
        const state = await this.stateProvider.getCurrentCustomer
    }
    public getReceiptsByClient(): Observable<any> {
        this.getState()

        const clientId = this.stateProvider.getCurrentCustomer.app.client._id
        return this.networkService.callApi(
            new NetworkRequest(
                HttpMethodEnum.httpGet,
                `${environment.HOST_API}receiptsclient?client=${clientId}`
            )
        )
    }
}
