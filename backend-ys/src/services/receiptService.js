const Receipt = require('../models/receipt/receiptModel')
const { receiptDto } = require('./../models/receipt/DTOs/receiptDto')
const { receiptInputDto } = require('./../models/receipt/DTOs/receiptInputDto')
const ObjectId = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')

class ReceiptService {
    static getAll = async () => {
        const receipts = await Receipt.find({ available: 1 })
            .populate('client')
            .populate('receiptDetail')
        const response = receipts.map((receipt) => receiptDto(receipt))
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
        const receipt = await Receipt.findById(id)
            .populate('client')
            .populate('receiptDetail')

        if (!receipt) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Receipt not found',
                    },
                },
            }
        }
        const input = receiptDto(receipt)
        return {
            status: 200,
            content: { receipt: input },
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
        const input = receiptInputDto(req.body)

        const receipt = await Receipt.findOne({ name: input.name })

        if (receipt) {
            return {
                status: 400,
                content: { msg: 'The receipt already exists' },
            }
        }
        const newReceipt = new Receipt(input)

        await newReceipt.save()
        return {
            status: 201,
            content: {
                ok: true,
                article: newReceipt,
                message: 'Receipt created successfully',
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
        const receipt = await Receipt.findByIdAndUpdate(id, body, {
            new: true,
        })

        if (!receipt) {
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
                article: receipt,
                message: `The receipt number ${receipt.number} was updated`,
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
        const receiptToDelete = await Receipt.findById(id)
        if (!receiptToDelete) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Receipt not found',
                    },
                },
            }
        }
        const receipt = await Receipt.findByIdAndUpdate(
            id,
            {
                available: !receiptToDelete.available,
            },
            { new: true }
        )

        return {
            status: 200,
            content: {
                ok: true,
                message: `The receipt number ${receipt.number} was ${
                    receipt.available === 0 ? 'removed' : 'put'
                }`,
            },
        }
    }
}
module.exports = ReceiptService
