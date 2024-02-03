//CARREGANDO SCHEMA CATEGORIA
const Apostas = require('../models/Apostas')


//CONTROLLER
class ApostasController {

    //CREATE
    static async criarAposta(req, res) {

        const dadosRecebidos = req.body;

        //Cria o DOC
        const newAposta = {
            nome: dadosRecebidos.usuario.nome.toLowerCase(),
            telefone: dadosRecebidos.usuario.telefone,
            insta: dadosRecebidos.usuario.insta,
            numeros: dadosRecebidos.numeros,
            quantidade: dadosRecebidos.numeros,
            valorAposta: dadosRecebidos.valor,
            status: 'Aguardando pagamento..',
            data: Date.now()
        };

        try {
            
            var NovaAposta = await new Apostas(newAposta).save();
            const apostaId = NovaAposta._id;

            req.flash('success_msg', 'Aposta registrada com sucesso!');
            res.status(200).json({ success: true, apostaId });
        } catch (err) {
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
    //LISTA APOSTA UNICA PRO USER
    //FIND ONE
    static async acessarAposta(req, res) {

        Apostas.find({ telefone: req.body.telefone, nome: req.body.nome.toLowerCase() }).then((apostas) => {
            if (apostas) {
                res.render('usuarios/minhasCotasPainel', { apostas: apostas })
            } else {

                req.flash('error_msg', 'Cotas não encontradas! Porfavor confira seus dados!')
                res.redirect('/minhas-cotas')

            }
        }).catch((err) => {
            console.log('ERRO: ' + err)
            req.flash('error_msg', 'Erro interno, tente novamente!')
            res.redirect('/')

        })

    }
}

module.exports = ApostasController



function geraCotas(qntdCotas) {
    var numerosAleatorios = [];

    for (var i = 0; i < qntdCotas; i++) {

        var numero = Math.floor(Math.random() * 9000000) + 1000000;
        numerosAleatorios.push(numero);
    }

    return numerosAleatorios;
}

