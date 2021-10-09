clientInputDto = (request) => {
    return {
        name: request.name,
        address: request.address,
        email: request.email,
        cell: request.cell,
        state: request.state ? request.state : 1,
        trolley: request.trolley,
        password: request.password,
        role: request.role ? request.role : 'USER_ROLE',
    }
}
module.exports = { clientInputDto }
