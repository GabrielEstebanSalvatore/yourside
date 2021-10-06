import { Injectable } from '@angular/core'
import { BaseApi } from 'src/app/core/classes/base.api'
import { NetworkService } from 'src/app/core/services/network.service'
import { ArticleModel } from '../models/article.model'

@Injectable()
export class ArticleApi extends BaseApi<ArticleModel> {
    constructor(protected networkService: NetworkService) {
        super(networkService)
        this.apiEndpoint = 'articles'
    }
}
