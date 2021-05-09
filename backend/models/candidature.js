const mongoose = require('mongoose');

const Candidature = new mongoose.Schema(
{
    name: { 
        type: String, 
        required: true },
    surname: { 
        type: String, 
        required: true 
    },
    mobile: { 
        type: String,
        trim: true,
        required: [true,'Contacto tefónico obrigatório'],
        unique: [true, 'Já existe candidatura com esse Nº de telemóvel.'],
        minlength: [9, 'Contacto tefónico inválido. Requer 9 digitos.'],
        maxlength: [9, 'Contacto tefónico inválido. Requer 9 digitos.'],
        match: [/9[1236][0-9]{7}|2[1-9]{1,2}[0-9]{7}/,'Contacto tefónico inválido'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true,'Email obrigatório'], 
        unique: [true, 'á existe candidatura com esse email.'],
        match: [/.+\@.+\..+/,'Email inválido'],
      //  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    institutution: {
        type: String,
    },
},
{ collection: 'candidatures' }
)

module.exports = mongoose.model('Candidature', Candidature);