receiptDetailDto = (request) => {
    return {
        id: request._id,
        available: request.available,
        articles: request.articles,
        amount: request.amount,
        price: request.price,
        state: request.state,
    }
}
module.exports = { receiptDetailDto }
