import { ArticleModel } from "./article.model";
import { ClientModel } from "./client.model";
//import { TrolleyDetailModel } from "./trolleyDetail.model";

/*export interface TrolleyModel {
    id?: string
    client: Cliente
    available: boolean
    date: string
    total: number
    articles: TrolleyDetailModel[]
}*/
export interface TrolleyModel {
    id?: string
    client?: ClientModel
    available: boolean
    date: string
    total: number
    articles: ArticleModel[]
}