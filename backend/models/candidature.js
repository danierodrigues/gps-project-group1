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
        required: [true,'Contacto móvel obrigatório.'],
        unique: [true, 'Já existe uma candidatura registada com o contacto móvel inserido.'],
        minlength: [9, 'Contacto móvel inválido, requer 9 digitos.'],
        maxlength: [9, 'Contacto móvel inválido, requer 9 digitos.'],
        match: [/9[1236][0-9]{7}|2[1-9]{1,2}[0-9]{7}/,'Contacto móvel inválido'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true,'Email obrigatório.'], 
        unique: [true, 'Já existe uma candidatura registada com o email inserido.'],
        match: [/.+\@.+\..+/,'Estrutura de email inválida.'],
    },
    institution: {
        type: String,
    },
},
{ collection: 'candidatures' }
)

module.exports = mongoose.model('Candidature', Candidature);