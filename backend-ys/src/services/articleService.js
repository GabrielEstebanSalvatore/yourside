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

    const article = await Article.findOne({ code: input.code })

    if (article) {
        return {
            status: 400,
            content: { msg: 'The article already exists' },
        }
    }
    const newArticle = new Article(input)

    await newArticle.save()
    return {
        status: 201,
        content: {
            ok: true,
            article: newArticle,
            message: 'Article created successfully',
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
                    message: 'ID incorrect',
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
            message: `The article ${input.name} was updated`,
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
                    message: 'ID incorrect',
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
                    message: 'Article not found',
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
            message: `The article ${article.name} was removed`,
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
            message: 'Image created successfully',
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
