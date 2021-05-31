const CandidatureModel = require("../models/candidature");
const InstitutionModel = require('../models/institution');

module.exports = {
    async index(req,res,next){
        const all = await CandidatureModel.find();
        res.status(200).json({ok:true,data:all});
    },

    async create(req,res,next){

        try{

            InstitutionModel.findOne({'name':req.body.institution,'isActive':true}, function(error, institution) {
                if(error || !institution)
                    return res.status(500).json({'ok':false, 'errorMessage':"Instituição que selecionou não existe"});
                
                const doc = new CandidatureModel(req.body);
                doc.save((error, data) =>{
                    if(error){
                        return res.status(500).json({'ok': false, 'error':error});
                    }else if(data){
                        return res.status(200).json({'ok': true, 'data':data});
                    }
                })
            });
        }catch(error){
            return res.status(500).json({'ok':false, 'error':error});
        }
            
    },
    
    update(req,res,next){
        let newData = req.body;
        
        try{
        CandidatureModel.findOneAndUpdate({'_id':newData._id}, newData, {new: true}, function(error, data) {
            if(error){
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