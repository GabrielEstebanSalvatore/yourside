const Article = require('../models/article/articleModel')
const { articleDto } = require('./../models/article/DTOs/articleDto')
const { validationResult } = require('express-validator')
const Image = require('../models/imageModel')
const ObjectId = require('mongoose').Types.ObjectId

class articleService {
    static async getCurrentBox(box) {}
    static getAll = async () => {
        const articles = await Article.find({ available: 1 })
            .populate('articleType')
            .populate('image')
            .populate('brand')
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
            amount: response.length,
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
    static create = async (req) => {
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
        const input = articleDto(body)
        const article = await Article.findByIdAndUpdate(id, input, {
            new: true,
        })
        return {
            status: 200,
            content: {
                ok: true,
                article: article,
                message: `The article ${input.name} was updated`,
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
        const article = await Article.findByIdAndUpdate(
            id,
            {
                available: !articleToDelete.available,
            },
            { new: true }
        )

        return {
            status: 200,
            content: {
                ok: true,
                message: `The brand ${brand.name} was ${
                    article.available === 0 ? 'removed' : 'put'
                }`,
            },
        }
    }
    static createImage = async (req) => {
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
}

module.exports = articleService
