const brandDto = (response) => {
    return {
        id: response._id,
        available: response.available,
        name: response.name,
    }
}
module.exports = { brandDto }
