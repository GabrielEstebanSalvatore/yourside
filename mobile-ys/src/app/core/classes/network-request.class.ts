import { HttpMethodEnum } from '../enums/http-method.enum'

export class NetworkRequest {
    httpMethod: HttpMethodEnum
    url: string
    body: any
    responseType: any

    constructor(
        httpMethod: HttpMethodEnum,
        url: string,
        body?: any,
        responseType?: any
    ) {
        this.httpMethod = httpMethod
        this.url = url
        this.body = body
        this.responseType = responseType
    }
}
