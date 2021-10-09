cashRegisterDto = (request) => {
    return {
        id: request._id,
        available: request.available,
        number: request.number,
        openCheckoutDate: request.openCheckoutDate,
        closeCheckoutDate: request.closeCheckoutDate,
        totalSales: request.totalSales,
        receipts: request.receipts,
        receiptsAmount: request.receiptsAmount,
    }
}
module.exports = { cashRegisterDto }
