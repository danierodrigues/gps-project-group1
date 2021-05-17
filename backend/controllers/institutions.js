const InstitutionModel = require('../models/institution');
const fs = require('fs');
const backendVar = require('../config/backend');

var backendURL = "";
if(process.env.NODE_ENV.trim() == "dev"){
    console.log("igual a dev");
    backendURL = backendVar.backendURLDEV;
}else if(process.env.NODE_ENV.trim() == "prod"){
    console.log("igual a prod");
    backendURL = backendVar.backendURLprod;
}



module.exports = {
    async index(req,res,next){
        const all = await InstitutionModel.find();
        res.status(200).json({ok:true,data:all});
    },

    async create(req,res,next){
        console.log(req.file);
        req.body.presentationVideoPath = backendVar.videosURI + req.file.filename; 

        try{
            // const res = await CandidatureModel.create(req.body)
            const doc = new InstitutionModel(req.body);
             await doc.save((error, data) =>{
                if(error){
                    res.status(500).json({'ok': false, 'error':error});
                    //Delete video
                    fs.unlinkSync(req.file.destination + '/' + req.file.filename);
                    return;
                }else if(data){
                    return res.status(200).json({'ok': true, 'data':data, 'backendURL':backendURL});
                }
             })
         }catch(error){
             return res.status(500).json({'ok':false, 'error':error});
         }


    },

    update(req,res,next){

        
    },

    delete(req,res,next){
        InstitutionModel.deleteOne({_id:req.params.id},(error,data)=>{
            if(error){
                return res.status(500).json({'ok': false, 'error':error});
            }else if(data){
                return res.status(200).json({'ok': true, 'data':data});
            }    
        })
    }

}