const Comprabante = require('../models/comprabanteModel')
const {
    cashRegisterInputDto,
} = require('./../models/cashRegister/DTOs/cashRegisterInputDto')
const {
    cashRegisterDto,
} = require('../models/cashRegister/DTOs/cashRegisterDto')
const { validationResult } = require('express-validator')
const CashRegister = require('../models/cashRegister/cashRegisterModel')
const ObjectId = require('mongoose').Types.ObjectId

class checkoutService {
    static create = async (req) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return {
                status: 400,
                content: { errors: errors.array() },
            }
        }
        const input = cashRegisterInputDto(req.body)

        const cashRegister = await CashRegister.findOne({
            number: input.number,
        })
        console.log('test')
        if (cashRegister) {
            return {
                status: 400,
                content: { msg: 'The cash register already exists' },
            }
        }

        const newCashRegister = new CashRegister({ number: input.number })
        await newCashRegister.save()

        return {
            status: 201,
            content: {
                ok: true,
                cashRegister: newCashRegister,
                message: 'Cash register created successfully',
            },
        }
    }

    static getAll = async () => {
        const cashRegisters = await CashRegister.find({ available: 1 })
        const response = cashRegisters.map((cashRegister) =>
            cashRegisterDto(cashRegister)
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
        console.log('test')
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

        const cashRegister = await CashRegister.findById(id)

        if (!cashRegister) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Cash register not found',
                    },
                },
            }
        }
        const input = cashRegisterDto(cashRegister)
        return {
            status: 200,
            content: { cashRegister: input },
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
        const cashRegisterToDelete = await CashRegister.findById(id)
        if (!cashRegisterToDelete) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Cash register not found',
                    },
                },
            }
        }
        const cashRegister = await CashRegister.findByIdAndUpdate(
            id,
            {
                available: !cashRegisterToDelete.available,
            },
            { new: true }
        )

        return {
            status: 200,
            content: {
                ok: true,
                message: `The cash register number ${cashRegister.number} was ${
                    cashRegister.available === 0 ? 'removed' : 'put'
                }`,
            },
        }
    }
}

module.exports = checkoutService
