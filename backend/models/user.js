const mongoose = require('mongoose');
var moment = require('moment-timezone');

const User = new mongoose.Schema(
{
    name: { 
        type: String, 
        required: true 
    },
    surname: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true,'Email obrigatório'], 
        unique: [true, 'Já existe candidatura com esse email.'],
        match: [/.+\@.+\..+/,'Email inválido'],
      //  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    password: {
        type: String,
        required: [true,'Password obrigatório'], 
    },
    role: {
        type: String,
        required: [true],
        default: 'user'
    },
},
//{ timestamps: true },
{timestamps:{currentTime:()=> moment().tz("Europe/Lisbon").format("YYYY-MM-DD"+"T"+ "HH:mm:ss.ms")+"Z" } },
{ collection: 'users' },

)

module.exports = mongoose.model('User', User);