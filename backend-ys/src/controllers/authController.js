const authService = require('../services/authService')
class AuthController {
    static async AuthenticateClient(req, res) {
        try {
            const response = await authService.AuthenticateClient(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
    static async AuthenticatedClient(req, res) {
        try {
            const response = await authService.AuthenticatedClient(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
}
module.exports = AuthController
