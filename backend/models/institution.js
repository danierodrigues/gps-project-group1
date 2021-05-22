const mongoose = require('mongoose');
var moment = require('moment-timezone');

const Institution = new mongoose.Schema(
{
    name: { 
        type: String, 
        required: true,
        unique:true 
    },
    candidatureState: { 
        type: String, 
        required: true,
        default:'open'
    },
    isActive: {
        type:Boolean,
        required:true,
        default:true
    },
    presentationVideoPath: { 
        type: String,
        trim: true,
        required: [true,'Contacto tefónico obrigatório.'],
    },
    email: {
        type: String,
        unique:false,
        trim: true,
        lowercase: true,
        required: [true,'Email obrigatório.'],
        match: [/.+\@.+\..+/,'Email inválido'],
      //  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
},
{timestamps:{currentTime:()=> moment().tz("Europe/Lisbon").format("YYYY-MM-DD"+"T"+ "HH:mm:ss.ms")+"Z" } },
{ collection: 'institutions' },
)

module.exports = mongoose.model('Institution', Institution);