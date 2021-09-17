const Comprabante = require('../models/comprabanteModel')
const Article = require('../models/articleModel')
const { articleDto } = require('./../DTOs/articleDto')
const { validationResult } = require('express-validator')
const Image = require('../models/imageModel')
const ObjectId = require('mongoose').Types.ObjectId
class articleService {
    static async getCurrentBox(box) {}
}
const getAll = async () => {
    const articles = await Article.find({ available: 1 })
        .populate('articleType')
        .populate('image')
        .populate('branch')
        .populate('offer')
    const response = articles.map((article) => articleDto(article))
    response.map((article) => {
        if (article.offer) {
            article.sellPriceOffer =
                (article.sellPrice * (100 - article.offer)) / 100
        }
    })
    return {
        ok: true,
        response,
        articlesAmount: response.length,
    }
}
const get = async (id) => {
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
    const article = await Article.findById(id)

    if (!article) {
        return {
            status: 404,
            content: {
                ok: false,
                err: {
                    message: 'Artículo no encontrado',
                },
            },
        }
    }
    const input = articleDto(article)
    return {
        status: 200,
        content: { article: input },
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
    const input = articleDto(req.body)

    const articulo = await Article.findOne({ code: input.code })

    if (articulo) {
        return {
            status: 400,
            content: { msg: 'El articulo ya existe' },
        }
    }
    const articuloNuevo = new Article(input)

    await articuloNuevo.save()
    return {
        status: 201,
        content: {
            ok: true,
            article: articuloNuevo,
            message: 'Articulo creado con exito',
        },
    }
}
const update = async (id, body) => {
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
    const input = articleDto(body)
    const article = await Article.findByIdAndUpdate(id, input)
    return {
        status: 200,
        content: {
            ok: true,
            article: article,
            message: `El articulo ${input.name} fue actualizado`,
        },
    }
}
const remove = async (id) => {
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
    const articleToDelete = await Article.findById(id)
    if (!articleToDelete) {
        return {
            status: 404,
            content: {
                ok: false,
                err: {
                    message: 'Artículo no encontrado',
                },
            },
        }
    }
    const article = await Article.findByIdAndUpdate(id, {
        available: !articleToDelete.available,
    })

    return {
        status: 204,
        content: {
            ok: true,
            message: `El articulo ${article.name} fue eliminado`,
        },
    }
}
const createImage = async (req) => {
    const image = new Image()
    image.title = req.body?.title
    image.description = req.body?.description
    image.filename = req.file?.filename
    image.path = '/img/uploads/' + req.file?.filename
    image.originalname = req.file?.originalname
    image.mimetype = req.file?.mimetype
    image.size = req.file?.size
    await image.save()
    return {
        status: 201,
        content: {
            ok: true,
            img: image,
            message: 'Imagen creada éxito',
        },
    }
}

module.exports = {
    articleService,
    getAll,
    create,
    get,
    update,
    remove,
    createImage,
}
