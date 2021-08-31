const Client = require('../models/clienteModel')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.AuthenticateClient = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer el email y password
    const { email, password } = req.body

    try {
        // Revisar que sea un usuario registrado
        let client = await Client.findOne({ email })
        if (!client) {
            return res.status(400).json({ msg: 'El cliente no existe' })
        }

        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, client.password)
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Password Incorrecto' })
        }

        // Si todo es correcto Crear y firmar el JWT
        const payload = {
            client: {
                id: client.id,
            },
        }

        // firmar el JWT
        jwt.sign(
            payload,
            process.env.REACT_APP_PALABRA_SECRETA,
            {
                expiresIn: 3600, // 1 hora
            },
            (error, token) => {
                if (error) throw error

                // Mensaje de confirmación
                res.json({ token })
            }
        )
    } catch (error) {
        console.log(error)
    }
}

exports.AuthenticatedClient = async (req, res) => {
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
            res.json({ client })
        } else {
            res.json({ client, role: client.role })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}
