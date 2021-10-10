configurationDto = (request) => {
    return {
        id: request._id,
        available: request.available,
        name: request.name,
        adminCode: request.adminCode,
        demo: request.demo,
        lastSellName: request.lastSellName,
        useDecimal: request.useDecimal,
        address: request.address,
        cellPhone: request.cellPhone,
    }
}
module.exports = { configurationDto }
