const Configuration = require('../models/configuration/configurationModel')
const {
    configurationDto,
} = require('./../models/configuration/DTOs/configurationDto')
const {
    configurationInputDto,
} = require('./../models/configuration/DTOs/configurationInputDto')
const ObjectId = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')

class ConfigurationService {
    static getAll = async () => {
        const configurations = await Configuration.find({ available: 1 })
        const response = configurations.map((configuration) =>
            configurationDto(configuration)
        )
        return {
            status: 200,
            content: {
                ok: true,
                response,
                amount: response.length,
            },
        }
    }
    static get = async (id) => {
        if (!ObjectId.isValid(id)) {
            return {
                status: 400,
                content: {
                    ok: false,
                    err: {
                        message: 'ID incorrect',
                    },
                },
            }
        }
        const configuration = await Configuration.findById(id)

        if (!configuration) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Configuration not found',
                    },
                },
            }
        }
        const input = configurationDto(configuration)
        return {
            status: 200,
            content: { configuration: input },
        }
    }
    static create = async (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return {
                status: 400,
                content: { errors: errors.array() },
            }
        }
        const input = configurationInputDto(req.body)

        const configuration = await Configuration.findOne({ name: input.name })

        if (configuration) {
            return {
                status: 400,
                content: { msg: 'The configuration already exists' },
            }
        }
        const newConfiguration = new Configuration(input)

        await newConfiguration.save()
        return {
            status: 201,
            content: {
                ok: true,
                configuration: newConfiguration,
                message: 'Configuration created successfully',
            },
        }
    }
    static update = async (id, body) => {
        if (!ObjectId.isValid(id)) {
            return {
                status: 400,
                content: {
                    ok: false,
                    err: {
                        message: 'ID incorrect',
                    },
                },
            }
        }
        const configuration = await Configuration.findByIdAndUpdate(id, body, {
            new: true,
        })
        if (!configuration) {
            return {
                status: 404,
                content: {
                    ok: false,
                    message: `Item not found`,
                },
            }
        }
        return {
            status: 200,
            content: {
                ok: true,
                article: configuration,
                message: `The configuration ${configuration.name} was updated`,
            },
        }
    }
}
module.exports = ConfigurationService
