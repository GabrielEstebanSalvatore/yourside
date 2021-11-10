import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkRequest } from 'src/app/core/classes/network-request.class'
import { HttpMethodEnum } from 'src/app/core/enums/http-method.enum'
import { NetworkService } from 'src/app/core/services/network.service'
import { environment } from 'src/environments/environment'
import { ArticleModel } from '../models/article.model'

@Injectable()
export class ArticleApi extends BaseApi<ArticleModel> {
    client: any
    constructor(protected networkService: NetworkService) {
        super(networkService)
        this.apiEndpoint = 'articles'
    }
    public makePurchase(
        client: any,
        articles: Array<ArticleModel>
    ): Observable<any> {
        return this.networkService.callApi(
            new NetworkRequest(
                HttpMethodEnum.httpPost,
                `${environment.HOST_API}soldarticles/`,
                { client: client, trolley: articles }
            )
        )
    }
}
