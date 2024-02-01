const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    //Método para conectar ao BD

    await mongoose.connect("mongodb+srv://luccabrasies:iMIWPebI85Ug0Uxn@cluster0.9cou70t.mongodb.net/rifas420" || 'mongodb://localhost/testeRifas', {
      //Essa opção informa ao Mongoose para usar o novo analisador de URL do MongoDB.
      useNewUrlParser: true,
      //Essa opção informa ao Mongoose para usar a nova camada de topo unificada do MongoDB.
      useUnifiedTopology: true,
    });
    console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
  } catch (err) {
    console.log('Erro ao conectar ao MongoDB Atlas:', err);
  }
};


module.exports = connectDB

