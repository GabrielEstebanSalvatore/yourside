const Offer = require('../models/offer/offerModel')
const { offerDto } = require('./../models/offer/DTOs/offerDto')
const { offerInputDto } = require('./../models/offer/DTOs/offerInputDto')
const ObjectId = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')

class OfferService {
    static getAll = async () => {
        const offers = await Offer.find({ available: 1 })
        const response = offers.map((offer) => offerDto(offer))
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
        const offer = await Offer.findById(id)

        if (!offer) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Offer not found',
                    },
                },
            }
        }
        const input = offerDto(offer)
        return {
            status: 200,
            content: { offer: input },
        }
    }
    static create = async (req) => {
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return {
                status: 400,
                content: { errores: errores.array() },
            }
        }
        const input = offerInputDto(req.body)

        const offer = await Offer.findOne({ name: input.name })

        if (offer) {
            return {
                status: 400,
                content: { msg: 'The offer already exists' },
            }
        }
        const newOffer = new Offer(input)

        await newOffer.save()
        return {
            status: 201,
            content: {
                ok: true,
                article: newOffer,
                message: 'Offer created successfully',
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
        const input = offerInputDto(body)
        const offer = await Offer.findByIdAndUpdate(id, input, { new: true })
        if (!offer) {
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
                article: offer,
                message: `The offer ${input.name} was updated`,
            },
        }
    }
    static remove = async (id) => {
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
        const offerToDelete = await Offer.findById(id)
        if (!offerToDelete) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Offer not found',
                    },
                },
            }
        }
        const offer = await Offer.findByIdAndUpdate(
            id,
            {
                available: !offerToDelete.available,
            },
            { new: true }
        )

        return {
            status: 200,
            content: {
                ok: true,
                message: `The offer ${offer.name} was ${
                    offer.available === 0 ? 'removed' : 'put'
                }`,
            },
        }
    }
}
module.exports = OfferService
