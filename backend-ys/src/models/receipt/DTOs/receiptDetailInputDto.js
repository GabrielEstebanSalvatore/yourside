receiptDetailInputDto = (request) => {
    return {
        articles: request.articles,
        amount: request.amount ? request.amount : 1,
        price: request.price,
    }
}
module.exports = { receiptDetailInputDto }
