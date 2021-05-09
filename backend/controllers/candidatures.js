const CandidatureModel = require("../models/candidature");
const mongoose = require('mongoose');

module.exports = {
    async index(req,res,next){
        const all = await CandidatureModel.find();
        res.status(200).json({ok:true,candidatures:all});
    },

    async create(req,res,next){

        try{
           // const res = await CandidatureModel.create(req.body)
           const doc = new CandidatureModel(req.body);
            await doc.save((error, data) =>{
                if(error){
                    /*if (error.name === 'MongoError' && error.code === 11000) {
                        if(error.keyPattern.mobile){
                            return res.status(500).json({'ok': false, 'errorMessage':'Já existe candidatura com esse Nº de telemóvel.'});
                        }else if(error.keyPattern.email){
                            return res.status(500).json({'ok': false, 'errorMessage':'Já existe candidatura com esse email.'});
                        }
                    }else{
                        return res.status(500).json({'ok': false, 'error':error});
                    }*/
                    return res.status(500).json({'ok': false, 'error':error});
                }else if(data){
                    return res.status(200).json({'ok': true, 'data':data});
                }
            })
        }catch(error){
            return res.status(500).json({'ok':false, 'error':error});
        }
            
    },
    
    update(req,res,next){
        let newData = req.body;
        
        try{
        CandidatureModel.findOneAndUpdate({'_id':newData._id}, newData, {upsert: true}, function(error, data) {
            if(error){
                /*if (error.name === 'MongoError' && error.code === 11000) {
                    if(error.keyPattern.mobile){
                        return res.status(500).json({'ok': false, 'errorMessage':'Já existe candidatura com esse Nº de telemóvel.'});
                    }else if(error.keyPattern.email){
                        return res.status(500).json({'ok': false, 'errorMessage':'Já existe candidatura com esse email.'});
                    }
                }else{
                    return res.status(500).json({'ok': false, 'error':error});
                }*/
                return res.status(500).json({'ok': false, 'error':error});
            }else if(data){
                return res.status(200).json({'ok': true, 'data':data});
            }
        });
        }catch(error){
            return res.status(500).json({'ok':false, 'error':error});
        }


    },

    delete(req,res,next){
        CandidatureModel.deleteOne({_id:req.params.id},(error,data)=>{
            if(error){
                return res.status(500).json({'ok': false, 'error':error});
            }else if(data){
                return res.status(200).json({'ok': true, 'data':data});
            }    
        })
        
    },

}