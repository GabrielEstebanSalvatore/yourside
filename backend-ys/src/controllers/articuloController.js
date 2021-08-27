const Article = require('../models/articleModel');
const Comprabante = require('../models/comprabanteModel');
const Ticket = require('../models/ticket');
const ComprobanteDetalle = require('../models/comprabanteDetalleModel');
const Configuration = require('../models/configurationModel');
const Box = require('../models/boxModel');
const Image = require('../models/imageModel')
const _ =require('underscore');
const { validationResult} =require('express-validator');

class articuloController {

    static async createImage(req, res){
        console.log(req.file)
        console.log(req.article)
        
        try {
            const image = new Image();
            image.title = req.body.title;
            image.description = req.body.description;
            image.filename = req.file.filename;
            image.path = '/img/uploads/' + req.file.filename;
            image.originalname = req.file.originalname;
            image.mimetype = req.file.mimetype;
            image.size = req.file.size;

            await image.save().then(
               res.json({
                ok:true,
                img:image
                })
            )

        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }  
    };

    static async create(req, res){
        const errores = validationResult(req);
        if( !errores.isEmpty() ) {
            return res.status(400).json({errores: errores.array() })
        }

        const{description,code,name,location,articleType,minimum,
            negativeStock,sellPrice,costPrice,amount,image, branch,offer} = req.body;

        try {
            let articulo = await Articulo.findOne({ code });
    
            if(articulo) {
                return res.status(400).json({ msg: 'El articulo ya existe' });
            }

            let articuloNuevo = new Article({
                name: name,
                code: code,
                location: location,
                articleType: articleType,
                minimum: minimum,
                negativeStock: negativeStock,
                sellPrice:sellPrice,
                costPrice:costPrice,
                amount:amount,
                description:description,
                image:image,
                branch: branch,
                offer:offer
            });

            await articuloNuevo.save().then(
                res.json({
                    ok:true,
                    article:articuloNuevo,
                    message:'Articulo creado con exito'
                })
            );

        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    };

    static async getAll(req, res) {

        //await Articulo.find( name: /c/i }, 'name',{available : 1})
        await Article.find({available : 1})
            .populate('articleType')
            .populate('image')
            .populate('branch')
            .populate('offer')
            .exec((err, articles) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                articles.map((article)=>{
                    if(article.offer){
                        
                        article.sellPriceOffer = article.sellPrice * (100 - article.offer.percent )/100
                        
                    }
                })

                Article.countDocuments((err, amount) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({
                        ok: true,
                        articles,
                        articlesAmount: amount
                    })
                })
            });
    };   

    static async getOne(req, res) {

        let id = req.params.id;

        Article.findById(id)
            .exec((err, articuloDB)=>{

                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                };
                if (!articuloDB){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message: 'El ID no es correcto'
                        }
                    });
                };
                res.json({
                    ok:true,
                    articulo:articuloDB
                })
        });
    };   

    static async updateArticulo(req, res){
        
        let id = req.params.id;
        let body = _.pick(req.body,['description','code','name','location','articleType','minimum','negativeStock','sellPrice','costPrice','amount','image','branch','offer']);

        await Article.findByIdAndUpdate(id,body,(err,articuloDB)=>{
            if (err){
                return res.status(400).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   message: `El tipo de articulo ${articuloDB.name} fue actualizado` 
               })
           }
        }); 
    };

    static async deleted(req,res){
        const id = req.params.id;
        let article = await Article.findById(id);
        let body = {available:!article.available}

        await Article.findByIdAndUpdate(id,body,(err,articleDB)=>{
            if (err){
                return res.status(500).json({
                   ok: false,
                   err
           })
            }else {
                res.status(200).json({
                    ok: true,
                    message: `El articulo ${articleDB.name} fue modificado` 
                })
           }
        })
    };

    static async articlesSold(req,res){

        const body = req.body.trolley;
        const cliente = req.body.client;

        let idArray =[]
        let totalPrice = 0;

        try {
        
            //ARMADO DEL COMPROBANTE DETALLE
            for(const element of body){
                idArray.push(element._id)
                totalPrice += element.sellPrice
            };

            let comprobanteDetalle = new ComprobanteDetalle({
                article:idArray,
                price:totalPrice
            });

            let respuestaComprobanteDetalle = await comprobanteDetalle.save();
            //MODIFICO LA CONFIGURACION
            //ARMADO DEL COMPROBANTE
            let configuration = await Configuration.findOne()
            let comprobante = new Comprabante({
                number : configuration.lastSellName,
                client : cliente._id,
                comprobantDetail:respuestaComprobanteDetalle._id,
                price:totalPrice,
            });
            await comprobante.save();
         

            for(const element of body){
                try{
                    var articulo = await Articulo.findOne({_id:element._id})
                    var id = articulo._id
                    await Articulo.replaceOne({id}, { amount: articulo.amount-- });
                    await articulo.save()
                }catch (error){ 
                    return res.status(200).json({
                        ok: true,
                        message:`Error en la venta` 
        
                    })
                }
            };

            //CREO EL TICKET
            const ticket = new Ticket({
                number:configuration.lastSellName++,
                desk:null
            })
            
            await ticket.save()
            
            let condiguracionId = configuration._id
            await Configuration.replaceOne({condiguracionId}, { lastSellName: configuration.lastSellName++ });
            await Configuration.save()
    
            //MODIFICO LA CAJA
            const currentBox = await Box.findOne({
                closeBoxDate: {
                $eq: null
            }});
       
            currentBox.comprobantes.push(comprobante._id);
            currentBox.comprobantesAmount ++;
            currentBox.totalSales += totalPrice;

            await currentBox.save();

            return res.status(200).json({
                ok: true,
                message:`Venta realizada con éxito`

            })
            
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error,
                response:{message:`Error en la venta`}  
            });
        }
    };
}

module.exports = articuloController;