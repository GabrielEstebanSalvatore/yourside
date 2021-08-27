const Configuration = require('../models/configurationModel');
const _ =require('underscore');
const { validationResult} =require('express-validator');

class configurationController {

    static async create(req, res){

        console.log(req.body)
        const errores = validationResult(req);
        if( !errores.isEmpty() ) {
            return res.status(400).json({errores: errores.array() })
        }
        const{name} = req.body;

        try {
            let configuration = await Configuration.findOne({ name });
    
            if(configuration) {
                return res.status(400).json({ msg: 'La configuracion ya existe' });
            }

            let newConfiguration = new Configuration(req.body);
            await newConfiguration.save();

            res.json({
                ok: true,
                message:"Configuración creada con Exito",
                newConfiguration
            })
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }; 

    static async getAll(req, res) {

        var response = await Configuration.findOne()
            .exec((err, configuration) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    configuration
                })
            });

            console.log('config',response)
    };   

    static async updateConfiguration(req, res){
        let id = req.params.id;
        let body = _.pick(req.body,['name','adminCode','demo','lastSellName','useDecimal','address','cellPhone']);

        await Configuration.findByIdAndUpdate(id,body,(err,configurationDB)=>{
            if (err){
                return res.status(400).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   message: `La configuración ${configurationDB.name} fue actualizada`
                   
               })
           }
        }); 
    };

}

module.exports = configurationController;