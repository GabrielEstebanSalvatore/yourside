const articleDto = (response) => {
    return {
        id: response.id,
        description: response.description,
        code: response.code,
        name: response.name ? response.name : null,
        articleType: response.articleType ? response.articleType.name : null,
        minimum: response.minimum,
        negativeStock: response.negativeStock,
        sellPrice: response.sellPrice,
        costPrice: response.costPrice,
        amount: response.amount,
        image: response.image ? response.image.path : null,
        brand: response.brand ? response.brand.name : null,
        offer: response.offer ? response.offer.percent : null,
    }
}
module.exports = { articleDto }
