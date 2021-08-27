const Offer = require('../models/offerModel');
const { validationResult} =require('express-validator');

class offerController {

    static async create(req, res){
        console.log("offerController",req.body)
        const errores = validationResult(req);
        if( !errores.isEmpty() ) {
            return res.status(400).json({errores: errores.array() })
        }

        const{percent,name,active} = req.body;

        try {
           
            let newOffer = new Offer({
                percent:percent,
                name:name,
                active:active
            });

            await newOffer.save().then(
                res.json({
                 ok:true,
                 offer:newOffer,
                 message:'La oferta se creo con exito'
                })
            );

        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    };

    static async getAll(req, res) {

        await Offer.find({available : 1})
            .exec((err, offers) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                
                Offer.countDocuments((err, conteo) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({
                        ok: true,
                        offers,
                        cuantos: conteo
                    })
                })
            });
    };   

    static async getOne(req, res) {

        let id = req.params.id;

        Offer.findById(id)
            .exec((err, offerDB)=>{

                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                };
                if (!offerDB){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message: 'El ID no es correcto'
                        }
                    });
                };
                res.json({
                    ok:true,
                    offer:offerDB
                })
        });
    };   

    static async deleted(req,res){
        let id = req.params.id;

        let offer = await Offer.findById(id);
        let body = {available:!offer.available}

        await Offer.findByIdAndUpdate(id,body,(err,offerDB)=>{
            if (err){
                return res.status(400).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   box:{
                        message: `La oferta ${offerDB.name} fue modificada`
                   } 
               })
           }
        }); 
    };
   
}

module.exports = offerController;