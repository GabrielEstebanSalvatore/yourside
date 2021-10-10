const articleDto = (response) => {
    return {
        id: response.id,
        description: response.description,
        code: response.code,
        name: response.name ? response.name : null,
        articleType: response.articleType
            ? {
                  name: response.articleType.name,
                  id: response.articleType.id,
              }
            : null,
        minimum: response.minimum,
        negativeStock: response.negativeStock,
        sellPrice: response.sellPrice,
        costPrice: response.costPrice,
        amount: response.amount,
        image: response.image ? response.image.path : null,
        brand: response.brand
            ? {
                  name: response.brand.name,
                  id: response.brand.id,
              }
            : null,
        offer: response.offer ? response.offer.percent : null,
    }
}
module.exports = { articleDto }
