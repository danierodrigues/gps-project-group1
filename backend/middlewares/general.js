


function verifyBody(req,res,next){
    if(req.body){
        return next();
    }else{
        return res.status(500).json({'ok': false,'errorMessage': "Dados vazios."}); 
    }
};

module.exports = {
    verifyBody:verifyBody
};



