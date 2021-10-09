const Client = require('../models/client/clientModel')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

class AuthService {
    static AuthenticateClient = async (req) => {
        // revisar si hay errores
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return {
                status: 400,
                content: {
                    ok: false,
                    message: `Bad Request`,
                    errors: errors.array(),
                },
            }
        }

        // extraer el email y password
        const { email, password } = req.body

        try {
            // Revisar que sea un usuario registrado
            const client = await Client.findOne({ email })
            if (!client) {
                return {
                    status: 400,
                    content: {
                        ok: false,
                        message: `The client doesn't exists`,
                    },
                }
            }

            // Revisar el password
            const checkPass = await bcryptjs.compare(password, client.password)
            if (!checkPass) {
                return {
                    status: 401,
                    content: {
                        ok: false,
                        message: 'Invalid password',
                    },
                }
            }

            // Si todo es correcto Crear y firmar el JWT
            const payload = {
                client: {
                    id: client.id,
                },
            }

            // firmar el JWT
            const token = await new Promise((resolve, reject) => {
                jwt.sign(
                    payload,
                    process.env.REACT_APP_PALABRA_SECRETA,
                    {
                        expiresIn: 3600, // 1 hora
                    },
                    (error, token) => {
                        if (error) throw error
                        resolve(token)
                    }
                )
            })

            return {
                status: 200,
                content: {
                    ok: true,
                    token,
                },
            }
        } catch (error) {
            console.log(error)
        }
    }
    static AuthenticatedClient = async (req) => {
        try {
            const client = await Client.find({ _id: req.client.id })
                .select('-password')
                .populate({
                    path: 'trolley',
                    populate: {
                        path: 'articles',
                        populate: { path: 'articleType' },
                    },
                })

            //VERIFICO SI ES ADMIN O USER
            if (client.role === 'USER_ROLE') {
                return {
                    status: 200,
                    content: {
                        ok: true,
                        client,
                    },
                }
            } else {
                return {
                    status: 200,
                    content: {
                        ok: true,
                        client,
                        role: client.role,
                    },
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 401,
                content: {
                    ok: false,
                    message: `Unauthorized`,
                },
            }
        }
    }
}
module.exports = AuthService
