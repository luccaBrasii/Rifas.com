//MODULOS
const bodyParser = require("body-parser");
const ApostasController = require('../controllers/ApostasController')

//MIDDLEWARE
const { middleware } = require('../helpers/middleware')


module.exports = app => {
    //CONFIG
    app.use(bodyParser.json())

    //ROTAS PRINCIPAIS

    //PAGINA INICIAL
    app.get('/', (req, res) => {
        res.render('index')
    })

    app.post('/enviar-dados', ApostasController.criarAposta);


    app.get('/adm-painel', ApostasController.listaApostas);


    app.get('/pagamento/:id', ApostasController.postUnico);

    //LIBERA APOSTA
    app.get('/liberaAposta/:id', ApostasController.liberaAposta);

    //DELETA APOSTA
    app.get('/deletaAposta/:id', ApostasController.deleteAposta)


    //ROTA DE VISUALIZAR APOSTAS USUARIOS
    app.get('/participantes', ApostasController.listaApostasUSER)

    //MinhasCotas
    app.get('/minhas-cotas', (req, res) => {
        res.render('usuarios/minhasCotas')
    })

    app.post('/minhas-cotas', ApostasController.acessarAposta)

}