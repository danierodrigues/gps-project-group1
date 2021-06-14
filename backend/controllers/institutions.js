const InstitutionModel = require('../models/institution');
const fs = require('fs');
const backendVar = require('../config/backend');
const queryString = require('query-string');

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

        console.log(req.query);
        let filters = req.query;
        console.log(filters);
        let filtersQuery = {};
        console.log(!filters.openCand);
        console.log(!filters.openCand && filters.closCand);


        //Filters
        if((filters.openCand == 'false' && filters.closCand == 'true') || (filters.openCand == 'true' && filters.closCand == 'false') ){
            console.log("entrou dentro do if");
            filtersQuery.candidatureState = filters.openCand == 'true' ? 'open' : 'closed';
        }

        if((filters.opActInst == 'false' && filters.clActInst == 'true') || (filters.opActInst == 'true' && filters.clActInst == 'false') ){
            console.log("entrou dentro do if");
            filtersQuery.isActive = filters.opActInst == 'true' ? true : false;
        }

        if(filters.search){
            filtersQuery.$or = [
                {name: { $regex: '.*' + filters.search + '.*' }},
                {email: { $regex: '.*' + filters.search + '.*' }},
                {location: { $regex: '.*' + filters.search + '.*' }},
                {phone: { $regex: '.*' + filters.search + '.*' }},
            ]
        }

        
        console.log(filtersQuery);
       /* let teste = {
            $or:[
                {isActive: false},
                {isActive: true},
            ],
            $or:[
                {name: { $regex: '.*' + "sdfsd" + '.*' }},
                {email: { $regex: '.*' + "gmai" + '.*' }},
            ],
        } */

        let query = await InstitutionModel.find(filtersQuery);


        res.status(200).json({ok:true,data:query, backendURL:backendURL});
    },

    async create(req,res,next){
        console.log(req.file);
        req.body.presentationVideoPath = backendVar.videosURI + req.file.filename; 
        console.log(req.body.presentationVideoPath);

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

    updateVideo(req,res,next){
        console.log("entro no que tem update com video");
        let newData = req.body;

        console.log(req.file);
        newData.presentationVideoPath = backendVar.videosURI + req.file.filename; 
        console.log(newData.presentationVideoPath);

        console.log(newData);
        try{
            
            InstitutionModel.findOneAndUpdate({'_id':newData._id}, newData,{new:true}, function(error, data) {
                if(error){
                    res.status(500).json({'ok': false, 'error':error});
                    //Delete video
                    fs.unlinkSync(req.file.destination + '/' + req.file.filename);
                    return;
                }else if(data){
                    return res.status(200).json({'ok': true, 'data':data});
                }
            });
        }catch(error){
            return res.status(500).json({'ok':false, 'error':error});
        }
        
    },

    updateWithout(req,res,next){
        console.log("entro no que tem update withou video");
        let newData = req.body;
        console.log(newData);
        try{
            
            InstitutionModel.findOneAndUpdate({'_id':newData._id}, newData,{new:true}, function(error, data) {
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
        InstitutionModel.deleteOne({_id:req.body._id},(error,data)=>{
            if(error){
                return res.status(500).json({'ok': false, 'error':error});
            }else if(data){
                console.log(data);
                res.status(200).json({'ok': true, 'data':data});
                try{
                    //Delete video
                    fs.unlinkSync(backendURL + "/public/uploads" + req.body.presentationVideoPath);
                }catch(error){
                    console.log(error);
                }
                return;
            }    
        })
    }

}