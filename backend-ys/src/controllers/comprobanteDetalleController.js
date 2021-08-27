const ComprobanteDetalle = require('../models/comprabanteDetalleModel');
const _ =require('underscore');
const { validationResult} =require('express-validator');

class comprobanteDetalleController {

    static async create(req, res){

         // revisar si hay errores
        const errores = validationResult(req);
        if( !errores.isEmpty() ) {
            return res.status(400).json({errores: errores.array() })
        }
        // const{article,amount,price,state} = req.body;

        try {
        
            let comprobanteDetalle = new ComprobanteDetalle(req.body);
            await comprobanteDetalle.save();

        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    };

    static async getAll(req, res) {

        await ComprobanteDetalle.find()
            .populate('article')
            .exec((err, comprobanteDetalles) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                ComprobanteDetalle.countDocuments((err, conteo) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({
                        ok: true,
                        comprobanteDetalles,
                        cuantos: conteo
                    })
                })
            });
    };   

    static async getOne(req, res) {

        let id = req.params.id;

        ComprobanteDetalle.findById(id)
            .populate('article')
            .exec((err, comprobanteDetalleDB)=>{

                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                };
                if (!comprobanteDetalleDB){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message: 'El ID no es correcto'
                        }
                    });
                };
                res.json({
                    ok:true,
                    comprobanteDetalle:comprobanteDetalleDB
                })
        });
    };   

    static async updateComprobanteDetalle(req, res){
        let id = req.params.id;
        let body = _.pick(req.body,['article','amount','price','state']);

        await ComprobanteDetalle.findByIdAndUpdate(id,body,(err,comprobanteDetalleDB)=>{
            if (err){
                return res.status(400).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   comprobanteDetalle:{
                        message: `El comprobante Detalle ${comprobanteDetalleDB.name} fue actualizado`
                   } 
               })
           }
        }); 
    };

    static async deleted(req,res){
        const id = req.params.id;
        let comprobanteDetalle = await ComprobanteDetalle.findById(id);
        let body = {available:!comprobanteDetalle.available}

        await ComprobanteDetalle.findByIdAndUpdate(id,body,(err,comprobanteDetalleDB)=>{
            if (err){
                return res.status(500).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   ComprobanteDetalle:{
                        message: `El comprobante Detalle ${comprobanteDetalleDB.name} fue modificado`
                   } 
               })
           }
        })
    };

}

module.exports = comprobanteDetalleController;