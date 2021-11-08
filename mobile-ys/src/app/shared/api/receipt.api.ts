import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkRequest } from 'src/app/core/classes/network-request.class'
import { HttpMethodEnum } from 'src/app/core/enums/http-method.enum'
import { NetworkService } from 'src/app/core/services/network.service'
import { environment } from 'src/environments/environment'
import { ReceiptModel } from '../models/receipt.model'
@Injectable({
    providedIn: 'root',
})
export class ReceiptApi extends BaseApi<ReceiptModel> {
    constructor(networkService: NetworkService) {
        super(networkService)
        this.apiEndpoint = 'receipts'
    }
    public getReceiptsByClient(id: number): Observable<any> {
        return this.networkService.callApi(
            new NetworkRequest(
                HttpMethodEnum.httpGet,
                `${environment.HOST_API}receiptsclient?client=${id}`
            )
        )
    }
}