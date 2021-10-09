offerInputDto = (request) => {
    return {
        name: request.name,
        percent: request.percent ? request.percent : 1,
        disableDate: request.disableDate,
    }
}
module.exports = { offerInputDto }
