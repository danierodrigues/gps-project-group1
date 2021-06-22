const Faqsmodel = require('../models/faq');


module.exports = {
    async index(req,res,next){
        try{

            let filters = req.query;
            let filtersQuery = {};
            //Filters
            if((filters.opActFaqs == 'false' && filters.clActFaqs == 'true') || (filters.opActFaqs == 'true' && filters.clActFaqs == 'false') ){
                ("entrou dentro do if");
                filtersQuery.isActive = filters.opActFaqs == 'true' ? true : false;
            }

            if(filters.search){
                filtersQuery.$or = [
                    {question: { $regex: '.*' + filters.search + '.*' }},
                    {answer: { $regex: '.*' + filters.search + '.*' }},
                ]
            }

            const all = await Faqsmodel.find(filtersQuery);
            return res.status(200).json({ok:true,data:all});
        }catch(error){
            return res.status(500).json({'ok': false, 'error':error});
        }
    
    },

    async create(req,res,next){

        try{
            // const res = await CandidatureModel.create(req.body)
            const doc = new Faqsmodel(req.body);
             await doc.save((error, data) =>{
                if(error){
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
            Faqsmodel.findOneAndUpdate({'_id':newData._id}, newData, {new: true}, function(error, data) {
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
        Faqsmodel.deleteOne({_id:req.params.id},(error,data)=>{
            if(error){
                return res.status(500).json({'ok': false, 'error':error});
            }else if(data){
                return res.status(200).json({'ok': true, 'data':data});
            }    
        })
    }

}