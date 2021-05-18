const mongoose = require('mongoose');
var moment = require('moment-timezone');

const Faqs = new mongoose.Schema(
{
    question: { 
        type: String, 
        required: [true, 'Preenchimento da questão obrigatória.' ]
    },
    answer: { 
        type: String, 
        required: [true, 'Preenchimento da resposta obrigatória.' ]
    },
    isActive: { 
        type: Boolean,
        default:true,
        required: true,
    },
},
{timestamps:{currentTime:()=> moment().tz("Europe/Lisbon").format("YYYY-MM-DD"+"T"+ "HH:mm:ss.ms")+"Z" } },
{ collection: 'faqs' },
)

module.exports = mongoose.model('Faqs', Faqs);