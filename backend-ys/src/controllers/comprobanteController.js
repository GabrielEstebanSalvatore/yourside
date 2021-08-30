const Comprobante = require('../models/comprabanteModel');
const ComprobanteDetalle = require('../models/comprabanteDetalleModel');

const _ =require('underscore');
const { validationResult} =require('express-validator');

class comprobanteController {

    static async create(req, res){

         // revisar si hay errores
        const errores = validationResult(req);
        if( !errores.isEmpty() ) {
            return res.status(400).json({errores: errores.array() })
        }
        // const{article,amount,price,state} = req.body;

        try {
        
            let comprobante = new Comprobante(req.body);
            await comprobante.save();

        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    };

    static async getAll(req, res) {
        let id = req.body.id

        await Comprobante.find({client:id})
            .populate('comprobantDetail')
            .populate('client')
            .populate('comprobantDetail', 'article' )
            .exec((err, comprobantes) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                Comprobante.countDocuments((err, conteo) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({

                        
                        ok: true,
                        comprobantes,
                        cuantos: conteo
                    })
                })
            });
    };   
    static async getAllAdmin(req, res) {
        console.log("getAllAdmin",req.body)
        await Comprobante.find()
            .populate('comprobantDetail')
            .populate('client')
            .populate('comprobantDetail', 'article' )
            .exec((err, comprobantes) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                Comprobante.countDocuments((err, conteo) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({
                        ok: true,
                        comprobantes,
                        cuantos: conteo
                    })
                })
            });
    };   

    static async getOne(req, res) {

        let id = req.params.id;

        Article.findById(id)
            .exec((err, comprobanteDB)=>{

                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                };
                if (!comprobanteDB){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message: 'El ID no es correcto'
                        }
                    });
                };
                res.json({
                    ok:true,
                    comprobante:comprobanteDB
                })
        });
    };   

    static async updateComprobante(req, res){
        let id = req.params.id;
        let body = _.pick(req.body,['number','date','state','client']);

        await Comprobante.findByIdAndUpdate(id,body,(err,comprobanteDB)=>{
            if (err){
                return res.status(400).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   comprobante:{
                        message: `El comprobante ${comprobanteDB.name} fue actualizado`
                   } 
               })
           }
        }); 
    };

    static async deleted(req,res){
        const id = req.params.id;
        let comprobante = await Comprobante.findById(id);
        let body = {available:!comprobante.available}

        await Comprobante.findByIdAndUpdate(id,body,(err,comprobanteDB)=>{
            if (err){
                return res.status(500).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   comprobante:{
                        message: `El comprobante ${comprobanteDB.name} fue modificado`
                   } 
               })
           }
        })
    };

}

module.exports = comprobanteController;