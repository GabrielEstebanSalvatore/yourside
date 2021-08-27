const Tipoarticulo = require('../models/tipoArticuloModel');
const _ =require('underscore');
const { validationResult} =require('express-validator');

class tipoArticuloController {

    static async create(req, res){

        const errores = validationResult(req);
        if( !errores.isEmpty() ) {
            return res.status(400).json({errores: errores.array() })
        }
        
        const{name} = req.body;

        try {
            let tipoArticulo = await Tipoarticulo.findOne({ name });
    
            if(tipoArticulo) {
                return res.status(400).json({ msg: 'El pais ya existe' });
            }
            tipoArticulo = new Tipoarticulo(req.body);
            await tipoArticulo.save();

            res.status(200).json({
                ok: true,
                message: `El tipo de articulo ${tipoArticulo.name} fue creado con exito` 
            })
            
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    };

    static async getAll(req, res) {

        await Tipoarticulo.find({available : 1})
            .exec((err, tipoarticulos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                Tipoarticulo.countDocuments((err, conteo) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({
                        ok: true,
                        tipoarticulos,
                        cuantos: conteo
                    })
                })
            });
    };   

    static async getOne(req, res) {

        let id = req.params.id;

        Tipoarticulo.findById(id)
            .exec((err, tipoarticuloDB)=>{

                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                };
                if (!tipoarticuloDB){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message: 'El ID no es correcto'
                        }
                    });
                };
                res.json({
                    ok:true,
                    tipoarticulo:tipoarticuloDB
                })
        });
    };   

    static async updateTipoArticulo(req, res){
        let id = req.params.id;
        let body = _.pick(req.body,['name']);

        await Tipoarticulo.findByIdAndUpdate(id,body,(err,tipoarticuloDB)=>{
            if (err){
                return res.status(400).json({
                   ok: false,
                   err
           })
            }else {
                res.status(200).json({
                    ok: true,
                    message: `El tipo de articulo ${tipoarticuloDB.name} fue actualizado`
                        
                })
           }
        }); 
    };

    static async deleted(req,res){

        const id = req.params.id;
        let tipoarticulo = await Tipoarticulo.findById(id);
        let body = {available:!tipoarticulo.available}

        await Tipoarticulo.findByIdAndUpdate(id,body,(err,tipoarticuloDB)=>{
            if (err){
                return res.status(500).json({
                   ok: false,
                   err
           })
            }else {
                res.status(200).json({
                    ok: true,
                    tipoarticulo:{
                        message: `El tipo de articulo ${tipoarticuloDB.name} fue eliminado`
                    } 
                })
           }
        })
    };

}

module.exports = tipoArticuloController;