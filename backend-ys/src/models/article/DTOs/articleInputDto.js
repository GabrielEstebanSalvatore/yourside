const articleInputDto = (response) => {
    return {
        description: response.description,
        code: response.code,
        name: response.name,
        articleType: response.articleType,
        minimum: response.minimum,
        negativeStock: response.negativeStock,
        sellPrice: response.sellPrice,
        costPrice: response.costPrice,
        amount: response.amount,
        image: response.image,
        brand: response.brand,
        offer: response.offer,
    }
}
module.exports = { articleInputDto }
