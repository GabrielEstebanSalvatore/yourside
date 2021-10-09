offerDto = (request) => {
    return {
        id: request._id,
        available: request.available,
        name: request.name,
        percent: request.percent ? request.percent : 1,
        disableDate: request.disableDate,
    }
}
module.exports = { offerDto }
