export interface ArticleModel {
    id?: number
    name: string
    code: string
    description: string
    amount: number
    costPrice: number
    sellPrice: number
    minimum: number
    image: string
    negativeStock: boolean
    offer: boolean
    branch: object
    articleType: object
    sellPriceOffer?: number
    createdat?: Date
    updatedat?: Date
}
