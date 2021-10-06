import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { NetworkRequest } from '../classes/network-request.class'
import { HttpMethodEnum } from '../enums/http-method.enum'

@Injectable({
    providedIn: 'root',
})
export class NetworkService {
    constructor(private httpClient: HttpClient) {}

    callApi(networkRequest: NetworkRequest): Observable<any> {
        return this.getRequest(networkRequest)
    }

    private getRequest(networkRequest: NetworkRequest): Observable<any> {
        switch (networkRequest.httpMethod) {
            case HttpMethodEnum.httpGet:
                return this.httpClient.get<any>(networkRequest.url, {
                    responseType: networkRequest.responseType,
                })
            case HttpMethodEnum.httpPut:
                return this.httpClient.put<any>(
                    networkRequest.url,
                    networkRequest.body
                )
            case HttpMethodEnum.httpPost:
                return this.httpClient.post<any>(
                    networkRequest.url,
                    networkRequest.body
                )
            case HttpMethodEnum.httpDelete:
                return this.httpClient.delete<any>(networkRequest.url)
        }
    }
}
