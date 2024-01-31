//Módulos
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CRIANDO UM SCHEMA
const ApostasSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    numeros: {
        type: [String],
        required: true,
        default: 'Aguardando Pagamento'
    },
    status: {
        type: String,
        required: true
    },
    valorAposta: {
        type: String,
        required: true
    },
    insta:{
        type: String
    },
    data:{
        type: Date,
        default: Date.now
    }
});

//CRIANDO UMA COLLECTION
const Apostas = mongoose.model('Apostas', ApostasSchema);

module.exports = Apostas