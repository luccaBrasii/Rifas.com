//CARREGANDO SCHEMA CATEGORIA
const Apostas = require('../models/Apostas')


//CONTROLLER
class ApostasController {

    //CREATE
    static async criarAposta(req, res) {


        const dadosRecebidos = req.body;





        //Cria o DOC
        const newAposta = {
            nome: dadosRecebidos.usuario.nome,
            telefone: dadosRecebidos.usuario.telefone,
            insta: dadosRecebidos.usuario.insta,
            numeros: dadosRecebidos.numeros,
            valorAposta: dadosRecebidos.valor,
            status: 'Aguardando pagamento..',
            data: Date.now()
        };

        try {
            //Salva o DOC no banco de dados
            var NovaAposta = await new Apostas(newAposta).save();
            //Armazena a mensagem na varivel flash 'success_msg'
            console.log('Salvo com sucesso!, dados: ' + NovaAposta)
            /*
            req.flash('success_msg',`aposta registrada com sucesso!`)
            res.redirect('/')
            */

            const apostaId = NovaAposta._id;
            // Armazena a mensagem na variável flash 'success_msg'
            req.flash('success_msg', 'Aposta registrada com sucesso!');
            // Envia o ID da aposta como resposta JSON
            res.status(200).json({ success: true, apostaId });
        } catch (err) {
            //Armazena a mensagem na varivel flash 'error_msg'
            console.log('Erro ao cadastrar!', err);
            req.flash('error_msg', 'Houve um erro ao registrar a aposta, tente novamente!')

            res.redirect('/')
        }

    }

    //READ
    static async listaApostas(req, res) {
        await Apostas.find().sort({ data: "desc" }).then((apostas) => {
            res.render('admin/liberaAposta', { apostas: apostas })
        }).catch((err) => {
            console.log('ERRO: ' + err);
            req.flash('error_msg', 'Houve um erro ao listar as apostas.. tente novamente')
            res.redirect('/')
        })
    }

    //FIND ONE
    static async postUnico(req, res) {
        Apostas.findOne({ _id: req.params.id }).then((apostas) => {
            if (apostas) {
                res.render('pagamentos/pagamentos', { apostas: apostas })
            } else {
                req.flash('error_msg', 'Esta postagem não existe!')
                res.redirect('/')
            }
        }).catch((err) => {
            console.log('ERRO: ' + err)
            req.flash('error_msg', 'Erro interno, tente novamente!')
            res.redirect('/')

        })
    }

    //LIBERA APOSTA
    static async liberaAposta(req, res) {
        //BUSCA A POSTAGEM NO BD
        await Apostas.findOne({ _id: req.params.id }).then(async (postagens) => {

            let cotas = geraCotas(postagens.numeros);

            postagens.numeros = cotas
            postagens.status = 'Pago'


            postagens.save().then(() => {
                req.flash('success_msg', 'Aposta atualizada com sucesso!')
                res.redirect('/adm-painel')
            }).catch(err => {
                console.log('ERRO: ' + err);
                req.flash('error_msg', 'Erro ao atualizar a aposta!')
                res.redirect('/adm-painel')
            })
        })
    }

    //DELETE POSTAGEM
    static async deleteAposta(req, res) {


        try {
            await Apostas.findOneAndRemove({ _id: req.params.id });

            req.flash("success_msg", "aposta apagada com sucesso!");
            res.redirect('/adm-painel');
        } catch (err) {
            console.log(err);
            req.flash("error_msg", "Post apagado com sucesso!");
            res.redirect('/adm-painel');
        }
    }

    //BUSCA NUMEROS
    static async buscaNumeros(req, res) {
        await Apostas.find().then((apostas) => {

            const numeros = extraiNumeros(apostas)

            res.render('index', { numeros: numeros })
        }).catch((err) => {
            console.log('ERRO: ' + err);
            req.flash('error_msg', 'Houve um erro ao listar as apostas.. tente novamente')
            res.redirect('/')
        })
    }

    //LISTA APOSTAS PRO USUARIO
    static async listaApostasUSER(req, res) {
        await Apostas.find().sort({ numeros: "asc" }).then((apostas) => {
            res.render('usuarios/listaApostas', { apostas: apostas })
        }).catch((err) => {
            console.log('ERRO: ' + err);
            req.flash('error_msg', 'Houve um erro ao listar as apostas.. tente novamente')
            res.redirect('/')
        })
    }
}


module.exports = ApostasController

function extraiNumeros(numeros) {
    var lista = []
    numeros.forEach(element => {
        element.numeros.forEach(e => {
            lista.push(e)
        })
    });

    return lista
}

function geraCotas(qntdCotas) {
    var numerosAleatorios = [];

    for (var i = 0; i < qntdCotas; i++) {

        var numero = Math.floor(Math.random() * 9000000) + 1000000;
        numerosAleatorios.push(numero);
    }

    return numerosAleatorios;
}

