const Branch = require('../models/branchModel');
const _ =require('underscore');
const { validationResult} =require('express-validator');

class branchController {

    static async create(req, res){

        console.log(req.body);
        const errores = validationResult(req);
        if( !errores.isEmpty() ) {
            return res.status(400).json({errores: errores.array() })
        }
        
        const{name} = req.body;

        try {
            // Revisar que el usuario registrado sea unico
            let branch = await Branch.findOne({ name });
    
            if(branch) {
                return res.status(400).json({ msg: 'La Marca ya existe' });
            }

            branch = new Branch();
            branch.name = name;

            await branch.save();

            res.status(200).json({
                ok: true,
                message: `La marca ${branch.name} fue creada con exito` ,
            })
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    };

    static async getAll(req, res) {

        await Branch.find({available : 1})
            .exec((err, branches) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                Branch.countDocuments((err, conteo) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({
                        ok: true,
                        branches,
                        cuantos: conteo
                    })
                })
            });
    };   

    static async getOne(req, res) {

        let id = req.params.id;

        Branch.findById(id)
            .exec((err, branchDB)=>{

                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                };
                if (!branchDB){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message: 'El ID no es correcto'
                        }
                    });
                };
                res.json({
                    ok:true,
                    brancg:branchDB
                })
        });
    };   

    static async updateBranch(req, res){
        let id = req.params.id;
        let body = _.pick(req.body,['name']);

        await Branch.findByIdAndUpdate(id,body,(err,branchDB)=>{
            if (err){
                return res.status(400).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   localidad:{
                        message: `La marca ${branchDB.name} fue actualizado`
                   } 
               })
           }
        }); 
    };

    static async deleted(req,res){
        let id = req.params.id;
        let branch = await Branch.findById(id);
        let body = {available:!branch.available}

        await Branch.findByIdAndUpdate(id,body,(err,branchDB)=>{
            if (err){
                return res.status(400).json({
                   ok: false,
                   err
           })
            }else {
               res.status(200).json({
                   ok: true,
                   branch:{
                        message: `La marca ${branchDB.name} fue modificada`
                   } 
               })
           }
        }); 
    };

}

module.exports = branchController;