configurationInputDto = (request) => {
    return {
        name: request.name,
        adminCode: request.adminCode,
        demo: request.demo,
        lastSellName: request.lastSellName,
        useDecimal: request.useDecimal,
        address: request.address,
        cellPhone: request.cellPhone,
    }
}
module.exports = { configurationInputDto }
