const ReceiptDetail = require('../models/receipt/receiptDetailModel')
const {
    receiptDetailDto,
} = require('./../models/receipt/DTOs/receiptDetailDto')
const {
    receiptDetailInputDto,
} = require('./../models/receipt/DTOs/receiptDetailInputDto')
const ObjectId = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')

class ReceiptDetailService {
    static getAll = async () => {
        const receiptsDetail = await ReceiptDetail.find({ available: 1 })

        const response = receiptsDetail.map((receiptDetail) =>
            receiptDetailDto(receiptDetail)
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
        const receiptDetail = await ReceiptDetail.findById(id)

        if (!receiptDetail) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Receipt detail not found',
                    },
                },
            }
        }
        const input = receiptDetailDto(receiptDetail)
        return {
            status: 200,
            content: { receiptDetail: input },
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
        const input = receiptDetailInputDto(req.body)
        const newReceiptDetail = new ReceiptDetail(input)

        await newReceiptDetail.save()
        return {
            status: 201,
            content: {
                ok: true,
                article: newReceiptDetail,
                message: 'Receipt detail created successfully',
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
        const receiptDetail = await ReceiptDetail.findByIdAndUpdate(id, body, {
            new: true,
        })
        if (!receiptDetail) {
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
                article: receiptDetail,
                message: `The receipt detail was updated`,
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
        const receiptDetailToDelete = await ReceiptDetail.findById(id)
        if (!receiptDetailToDelete) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Receipt detail not found',
                    },
                },
            }
        }
        const receiptDetail = await ReceiptDetail.findByIdAndUpdate(
            id,
            {
                available: !receiptDetailToDelete.available,
            },
            { new: true }
        )

        return {
            status: 200,
            content: {
                ok: true,
                message: `The receipt detail was ${
                    receiptDetail.available === 0 ? 'removed' : 'put'
                }`,
            },
        }
    }
}
module.exports = ReceiptDetailService
