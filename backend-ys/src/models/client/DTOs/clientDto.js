clientDto = (request) => {
    return {
        id: request._id,
        available: request.available,
        name: request.name,
        address: request.address,
        email: request.email,
        cell: request.cell,
        state: request.state,
        password: request.password,
        role: request.role,
        //trolley: request.trolley,
    }
}
module.exports = { clientDto }
