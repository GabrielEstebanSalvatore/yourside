import { ArticleModel } from './article.model'
export interface ReceiptDetailModel {
    _id?: number
    available: boolean
    amount: number
    state: number
    price: number
    articles: Array<ArticleModel>
    createdat?: Date
    updatedat?: Date
}
