import { ReactiveFormsModule } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { HttpMethodEnum } from '../enums/http-method.enum'
import { NetworkService } from '../services/network.service'
import { NetworkRequest } from './network-request.class'

export abstract class BaseApi<T> {
    protected apiEndpoint: string = ''
    protected networkService: NetworkService
    constructor(networkServiceHttp: NetworkService) {
        this.networkService = networkServiceHttp
    }
    public all(): Observable<Array<T>> {
        return this.networkService
            .callApi(
                new NetworkRequest(
                    HttpMethodEnum.httpGet,
                    `${environment.HOST_API}${this.apiEndpoint}`
                )
            )
            .pipe(
                map((records: any) => records.response ?? records),
                shareReplay()
            )
    }
    public get(id: number): Observable<Array<T>> {
        return this.networkService
            .callApi(
                new NetworkRequest(
                    HttpMethodEnum.httpGet,
                    `${environment.HOST_API}/${this.apiEndpoint}/${id}`
                )
            )
            .pipe(map((record: any) => record.data ?? record))
    }
    public create(payload: any): Observable<Array<T>> {
        return this.networkService.callApi(
            new NetworkRequest(
                HttpMethodEnum.httpPost,
                `${environment.HOST_API}/${this.apiEndpoint}/`,
                payload
            )
        )
    }
    public edit(id: number, payload: any): Observable<Array<T>> {
        return this.networkService.callApi(
            new NetworkRequest(
                HttpMethodEnum.httpPut,
                `${environment.HOST_API}/${this.apiEndpoint}/${id}`,
                payload
            )
        )
    }
    public remove(id: number): Observable<Array<T>> {
        return this.networkService.callApi(
            new NetworkRequest(
                HttpMethodEnum.httpDelete,
                `${environment.HOST_API}/${this.apiEndpoint}/${id}`
            )
        )
    }
}
