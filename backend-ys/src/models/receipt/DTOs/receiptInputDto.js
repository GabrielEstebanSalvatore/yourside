receiptInputDto = (request) => {
    return {
        number: request.number,
        price: request.price ? request.price : 0,
        client: request.client,
        receiptDetail: request.receiptDetail,
    }
}
module.exports = { receiptInputDto }
