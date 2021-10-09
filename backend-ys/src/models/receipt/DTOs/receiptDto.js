receiptDto = (request) => {
    return {
        id: request._id,
        available: request.available,
        number: request.number,
        date: request.date,
        state: request.state,
        price: request.price,
        client: request.client,
        receiptDetail: request.receiptDetail,
    }
}
module.exports = { receiptDto }
