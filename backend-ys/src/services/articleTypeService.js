const ArticleType = require('../models/articleType/articleTypeModel')
const {
    articleTypeDto,
} = require('./../models/articleType/DTOs/articleTypeDto')
const {
    articleTypeInputDto,
} = require('./../models/articleType/DTOs/articleTypeInputDto')
const ObjectId = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')

class ArticleTypeService {
    static getAll = async () => {
        const articlesType = await ArticleType.find({ available: 1 })
        const response = articlesType.map((brand) => articleTypeDto(brand))
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
                        message: 'El ID no es correcto',
                    },
                },
            }
        }
        const articleType = await ArticleType.findById(id)

        if (!articleType) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Article Type not found',
                    },
                },
            }
        }
        const input = articleTypeDto(articleType)
        return {
            status: 200,
            content: { articleType: input },
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
        const input = articleTypeInputDto(req.body)

        const articleType = await ArticleType.findOne({ name: input.name })

        if (articleType) {
            return {
                status: 400,
                content: { msg: 'The article type already exists' },
            }
        }
        const newArticleType = new ArticleType(input)

        await newArticleType.save()
        return {
            status: 201,
            content: {
                ok: true,
                article: newArticleType,
                message: 'Article type created successfully',
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
        const articleType = await ArticleType.findByIdAndUpdate(id, body, {
            new: true,
        })
        if (!articleType) {
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
                article: articleType,
                message: `The article type ${articleType.name} was updated`,
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
        const articleTypeToDelete = await ArticleType.findById(id)
        if (!articleTypeToDelete) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Article type not found',
                    },
                },
            }
        }
        const articleType = await ArticleType.findByIdAndUpdate(
            id,
            {
                available: !articleTypeToDelete.available,
            },
            { new: true }
        )

        return {
            status: 200,
            content: {
                ok: true,
                message: `The brand ${articleType.name} was ${
                    articleType.available === 0 ? 'removed' : 'put'
                }`,
            },
        }
    }
}
module.exports = ArticleTypeService
