const UserModel = require("../models/user");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/crypto');

module.exports = {
    async index(req,res,next){
        const all = await UserModel.find();
        res.status(200).json({ok:true,data:all});
    },

    async login(req,res,next){



        try{
            await UserModel.findOne({'email':req.body.email}, function(error, user) {
                if(error){
                    return res.status(500).json({ok:false, errorMessage:"Email ou Password incorreto."});
                }
                console.log(user);

                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(err){
                        return res.status(500).json({ok:false, errorMessage:"Error."});
                    };
                    console.log(result);
                    
                    if(result){
                        console.log("antes do token");
                        var token = jwt.sign({'_id':user._id, 'role':user.role}, config.privateKEY, config.signOptions);
                        console.log("Token - " + token);

                        if(token){
                            return res.status(200).json({'ok': true,'token': token});
                        }else{
                            return res.status(500).json({'ok': false,'errorMessage': "Erro."});
                        }
                    }else{
                        return res.status(500).json({'ok': false,'errorMessage': "Email ou Password incorreto."});
                    }
                });
            });
        }catch(error){
            return res.status(500).json({'ok':false, 'error':error});
        }

    },

    async resgister(req,res,next){

        try{

            console.log(req.body.password);

            bcrypt.hash(req.body.password, config.saltRounds, function(err, hashedPassword) {
                if(err){
                    return res.status(500).json({ok:false, errorMessage:"Error hashing password."});
                };

                // const res = await CandidatureModel.create(req.body)
                const user = new UserModel({name: req.body.name, surname: req.body.surname, email: req.body.email, password: hashedPassword, role: req.body.role});

                    user.save((error, data) =>{
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
                            var token = jwt.sign({'_id':user._id, 'role':user.role}, config.privateKEY, config.signOptions);
                            console.log("Token - " + token);

                            return res.status(200).json({'ok': true, 'data':data, 'token':token});
                        }
                    });
            });
        }catch(error){
            return res.status(500).json({'ok':false, 'error':error});
        } 
    },

    
    async update(req,res,next){
        let newData = req.body;
        try{
            if(newData.password){
                let hashedPassword = await bcrypt.hash(req.body.password, config.saltRounds);
                console.log(hashedPassword);
                newData.password = hashedPassword;
            }

            console.log("depois do cb");
            UserModel.findOneAndUpdate({'_id':newData._id}, newData,{new:true}, function(error, data) {
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
        UserModel.deleteOne({_id:req.body._id},(error,data)=>{
            if(error){
                return res.status(500).json({'ok': false, 'error':error});
            }else if(data){
                return res.status(200).json({'ok': true, 'data':data});
            }    
        })
        
    },

}