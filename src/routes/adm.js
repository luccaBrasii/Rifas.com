//MODULOS
const bodyParser = require("body-parser");
const ApostasController = require('../controllers/ApostasController')

//MIDDLEWARE
const { middleware, eAdmin } = require('../helpers/middleware')


module.exports = app => {
    //CONFIG
    app.use(bodyParser.json())

    //ROTAS PRINCIPAIS

    //PAGINA INICIAL
    app.get('/', ApostasController.buscaNumeros)

    app.post('/enviar-dados', ApostasController.criarAposta);


    app.get('/adm-painel', eAdmin, ApostasController.listaApostas);


    app.get('/pagamento/:id', ApostasController.postUnico);

    //LIBERA APOSTA
    app.get('/liberaAposta/:id', eAdmin, ApostasController.liberaAposta);

    //DELETA APOSTA
    app.get('/deletaAposta/:id', eAdmin, ApostasController.deleteAposta)


    //ROTA DE VISUALIZAR APOSTAS USUARIOS
    app.get('/participantes', ApostasController.listaApostasUSER)

}