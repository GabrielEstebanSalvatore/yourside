const Brand = require('../models/brand/brandModel')
const { brandDto } = require('./../models/brand/DTOs/brandDto')
const { brandInputDto } = require('./../models/brand/DTOs/brandInputDto')
const ObjectId = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')

class BrandService {
    static getAll = async () => {
        const brands = await Brand.find({ available: 1 })
        const response = brands.map((brand) => brandDto(brand))
        return {
            ok: true,
            response,
            brandsAmount: response.length,
        }
    }
    static get = async (id) => {
        if (!ObjectId.isValid(id)) {
            return {
                status: 400,
                content: {
                    ok: false,
                    err: {
                        message: 'El ID no es correcto',
                    },
                },
            }
        }
        const brand = await Brand.findById(id)

        if (!brand) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Brand not found',
                    },
                },
            }
        }
        const input = brandDto(brand)
        return {
            status: 200,
            content: { brand: input },
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
        const input = brandInputDto(req.body)

        const brand = await Brand.findOne({ name: input.name })

        if (brand) {
            return {
                status: 400,
                content: { msg: 'The brand already exists' },
            }
        }
        const newBrand = new Brand(input)

        await newBrand.save()
        return {
            status: 201,
            content: {
                ok: true,
                article: newBrand,
                message: 'Brand created successfully',
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
        const input = brandInputDto(body)
        const brand = await Brand.findByIdAndUpdate(id, input, { new: true })
        return {
            status: 200,
            content: {
                ok: true,
                article: brand,
                message: `The brand ${input.name} was updated`,
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
        const brandToDelete = await Brand.findById(id)
        if (!brandToDelete) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Brand not found',
                    },
                },
            }
        }
        const brand = await Brand.findByIdAndUpdate(
            id,
            {
                available: !brandToDelete.available,
            },
            { new: true }
        )

        return {
            status: 200,
            content: {
                ok: true,
                message: `The brand ${brand.name} was ${
                    brand.available === 0 ? 'removed' : 'put'
                }`,
            },
        }
    }
}
module.exports = BrandService
