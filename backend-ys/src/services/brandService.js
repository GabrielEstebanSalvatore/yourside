const Brand = require('../models/brandModel')
const { validationResult } = require('express-validator')
const { brandDto } = require('../dtos/brandDto')
const getAll = async () => {
    const brands = await Brand.find({ available: 1 })
    const response = brands.map((brand) => brandDto(brand))
    return {
        status: 200,
        content: {
            ok: true,
            response,
            brandsAmount: response.length,
        },
    }
}
const create = async (req) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return {
            status: 400,
            content: { errores: errores.array() },
        }
    }

    const { name } = req.body
    // Revisar que el usuario registrado sea unico
    const brand = await Brand.findOne({ name })
    if (brand) {
        return {
            status: 409,
            content: {
                ok: false,
                message: `The brand ${brand.name} already exists`,
            },
        }
    }
    const newBrand = new Brand()
    newBrand.name = name

    await newBrand.save()
    return {
        status: 201,
        content: {
            ok: true,
            brand: brandDto(newBrand),
            message: `The brand ${newBrand.name} was created successfully`,
        },
    }
}
module.exports = {
    getAll,
    create,
}
