const container = document.querySelector('.containerNew')
const pagar = document.querySelector('#pagar')
const navBar = document.querySelector('.navbarrr')
const numeros = document.querySelector('#numeros').value
const botaoContinuar = document.querySelector('#continue')
const botaoX = document.querySelector('.conteudo-x')
const infoBilhetes = document.querySelector('#infoBilhetes')

const valorRifa = parseFloat(0.08)


infoBilhetes.innerHTML = `<strong>•Quantidade de bilhetes:</strong> Serão disponibilizados cotas de bilhetes numerados para a rifa, cada bilhete da rifa custa R$ ${valorRifa} (oito centavos) e tem um número único.`


botaoContinuar.addEventListener('click', () => {

    botaoContinuar.style.display = 'none'
})

//PARA MOSTRAR INFORMAÇÕES DO COMPRADOR

function pegaDados(qntdNumeros) {
    const nome = document.querySelector('#nome').value
    const telefone = document.querySelector('#telefone').value
    const insta = document.querySelector('#insta').value


    var listaNumeros = qntdNumeros
    var dados = {}

    //valor
    const valor = document.querySelector('#valorRS');
    const valor2 = Number(valor.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));

    //dados usuario
    dados.usuario = { nome: nome, telefone: telefone, insta: insta }
    dados.numeros = listaNumeros
    dados.valor = valor2

    return dados
}


//PARTE DOS PAGAMENTOS

function renderizaDados(dados) {

    fetch('/enviar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }).then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirecionar para a página de confirmação
                window.location.href = `/pagamento/${data.apostaId}`;
            } else {
                alert('Houve um erro ao enviar os dados, tente novamente.');
            }
        })
        .catch(error => {
            alert('Houve um erro ao enviar os dados, tente novamente.');
        });
}


// 31/01/2024

const qntdCotas = document.querySelectorAll('.botoesCotas')
const cotas = document.getElementById('cotas')
const valoraPagar = document.getElementById('valorRS')
const addCota = document.querySelector('#addCota')
const removeCota = document.querySelector('#removeCota')


qntdCotas.forEach((numero) => {
    numero.addEventListener('click', () => {

        addCotas(numero)
    })
})


function addCotas(numero) {
    let valor = numero.name
    let valorAntigo = cotas.textContent.split(':')[1]

    let novoValor = parseFloat(valor) + parseFloat(valorAntigo)

    addValor(novoValor)

    cotas.textContent = 'Cotas: ' + novoValor
}

function addValor(novoValor) {
    let valorApagar = (parseFloat(novoValor) * parseFloat(valorRifa)).toFixed(2);
    valoraPagar.textContent = `R$ ${valorApagar.replace('.', ',')}`;
}


addCota.addEventListener('click', () => {
    let valorAntigo = cotas.textContent.split(':')[1]

    let novoValor = parseFloat(1) + parseFloat(valorAntigo)

    addValor(novoValor)

    cotas.textContent = 'Cotas: ' + novoValor
})

removeCota.addEventListener('click', () => {
    let valorAntigo = cotas.textContent.split(':')[1]

    if (valorAntigo <= 0) {
        alert('O valor não pode ser menor que 0!')
    } else {
        let novoValor = parseFloat(valorAntigo) - parseFloat(1)

        addValor(novoValor)

        cotas.textContent = 'Cotas: ' + novoValor
    }


})


pagar.addEventListener('click', () => {

    const nome = document.querySelector('#nome').value
    const telefone = document.querySelector('#telefone').value

    if (nome.length > 0 && telefone.length > 0) {
        let qntdCotas = cotas.textContent.split(':')[1]
        renderizaDados(pegaDados(qntdCotas))
    } else {
        alert('Insira os dados corretamente!')
    }

})