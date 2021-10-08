const articleDto = (response) => {
    return {
        id: response._id,
        available: response.available,
        description: response.description,
        code: response.code,
        name: response.name == undefined ? '' : response.name,
        articleType: response.create == 1 ? response.articleType : response.articleType.name,
        minimum: response.minimum,
        negativeStock: response.negativeStock,
        sellPrice: response.sellPrice,
        costPrice: response.costPrice,
        amount: response.amount,
        image: response.create == 1 ? response.imageId : response.image.path,
        brand: response.create == 1 ? response.brand : response.brand.name == undefined ? null : response.brand.name,
        offer: response.offer
    }
}
module.exports = { articleDto }
