const jwt = require('jsonwebtoken');
const config = require('../config/crypto');

module.exports = {

    verifyToken(req,res,next){

        try{
            const token = req.headers.authorization;
            if(token){
                let isAuth = jwt.verify(token,config.publicKEY,config.signOptions);
                if(isAuth){
                    req.isAuth = isAuth;
                    return next();
                }else{
                    return res.status(500).json({'ok': false,'errorMessage': "Token inválido."});
                }
            }else{
                return res.status(500).json({'ok': false,'errorMessage': "Necessário token."});
            }
        }catch(error){
            return res.status(500).json({'ok':false, 'error':error});
        }
    },

    verifyRole(req,res,next){
        if(req.isAuth.role == 'admin'){
            return next();
        }else{
            return res.status(500).json({'ok': false,'errorMessage': "Sem permissões."});
        }
    }




    
}