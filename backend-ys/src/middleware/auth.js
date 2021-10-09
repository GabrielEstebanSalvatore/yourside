const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // Leer el token del header
    var token = req.header('x-auth-token')
    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'There is no valid Token' })
    }
    // validar el token
    try {
        const cifrado = jwt.verify(token, process.env.REACT_APP_PALABRA_SECRETA)
        req.client = cifrado.client
        next()
    } catch (error) {
        res.status(401).json({ msg: 'There is no valid Token' })
    }
}
