const articleDto = (response) => {
    return {
        id: response._id,
        available: response.available,
        description: response.description,
        code: response.code,
        name: response.name,
        articleType: response.articleType?.name,
        minimum: response.minimum,
        negativeStock: response.negativeStock,
        sellPrice: response.sellPrice,
        costPrice: response.costPrice,
        amount: response.amount,
        image: response.image?.path,
        brand: response.brand?.name,
        offer: response.offer?.percent,
    }
}
module.exports = { articleDto }
