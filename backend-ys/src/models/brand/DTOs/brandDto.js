brandDto = (request) => {
    return {
        id: request._id,
        available: request.available,
        name: request.name,
    }
}
module.exports = { brandDto }
