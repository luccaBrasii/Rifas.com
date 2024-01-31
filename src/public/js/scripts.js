const container = document.querySelector('.containerNew')
const pagar = document.querySelector('#pagar')
const navBar = document.querySelector('.navbarrr')
const numeros = document.querySelector('#numeros').value
const botaoContinuar = document.querySelector('#continue')
const botaoX = document.querySelector('.conteudo-x')
const infoBilhetes = document.querySelector('#infoBilhetes')

const valorRifa = parseFloat(0.50)
const qntRifas = 500

//renderizaNum(qntRifas)
//escolheNum()

infoBilhetes.innerHTML = `<strong>•Quantidade de bilhetes:</strong> Serão disponibilizados ${qntRifas} bilhetes numerados para a rifa, cada bilhete da rifa custa R$ ${valorRifa} e tem um número único.`



botaoContinuar.addEventListener('click',()=>{
    
    botaoContinuar.style.display = 'none'
    botaoX.style.display = 'flex'

    //EXECUTA SE FOR MOBILE
    if (window.innerWidth < 768) { 
        navBar.classList.add('expande');
        navBar.style.width = '90%'

        navBar.classList.remove('expande');
    }
    
})

botaoX.addEventListener('click', ()=>{
    botaoContinuar.style.display = 'inline-block'
    botaoX.style.display = 'none'

    if (window.innerWidth < 768) {
        navBar.classList.add('contrai')
        navBar.style.width = '30%'
        navBar.classList.remove('contrai');
    }else{
        navBar.style.width = '20%'
    }
    

    
})

//PARA MOSTRAR INFORMAÇÕES DO COMPRADOR


function pegaDados(qntdNumeros){
    const nome = document.querySelector('#nome').value
    const telefone = document.querySelector('#telefone').value
    const insta = document.querySelector('#insta').value

    
    var listaNumeros = qntdNumeros
    var dados = {}

    
    //valor
    const valor = document.querySelector('#valorRS');
    const valor2 = Number(valor.textContent.split('$')[1])
    
    //dados usuario
    dados.usuario = {nome: nome, telefone: telefone, insta: insta}
    dados.numeros = listaNumeros
    dados.valor = valor2
    
    return dados
}




//PARTE DOS PAGAMENTOS

function renderizaDados(dados){

    fetch('/enviar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }).then(response => response.json())
    .then(data => {
      console.log('Resposta do servidor:', data);
      if (data.success) {
        // Redirecionar para a página de confirmação
        window.location.href = `/pagamento/${data.apostaId}`;
      } else {
        alert('Houve um erro ao enviar a aposta, tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Houve um erro ao enviar a aposta, tente novamente.');
    });
}



// 31/01/2024

const qntdCotas = document.querySelectorAll('.botoesCotas')
const cotas = document.getElementById('cotas')
const valoraPagar = document.getElementById('valorRS')
const addCota = document.querySelector('#addCota')
const removeCota = document.querySelector('#removeCota')



qntdCotas.forEach((numero)=>{
    numero.addEventListener('click', ()=>{
        
        addCotas(numero)
        
    
    })
})


function addCotas(numero){
    let valor = numero.name
    let valorAntigo = cotas.textContent.split(':')[1]

    let novoValor = parseFloat(valor) + parseFloat(valorAntigo)

    addValor(novoValor)

    cotas.textContent = 'Cotas: ' + novoValor
}

function addValor(novoValor){
    let valorApagar = parseFloat(novoValor) * parseFloat(valorRifa)
    valoraPagar.textContent = `R$ ${valorApagar}`
}


addCota.addEventListener('click', ()=>{
    let valorAntigo = cotas.textContent.split(':')[1]

    let novoValor = parseFloat(1) + parseFloat(valorAntigo)

    addValor(novoValor)

    cotas.textContent = 'Cotas: ' + novoValor
})

removeCota.addEventListener('click', ()=>{
    let valorAntigo = cotas.textContent.split(':')[1]

    if(valorAntigo <= 0){
        alert('O valor não pode ser menor que 0!')
    }else{
        let novoValor = parseFloat(valorAntigo) - parseFloat(1)

        addValor(novoValor)

        cotas.textContent = 'Cotas: ' + novoValor
    }

    
})


pagar.addEventListener('click', ()=>{

    const nome = document.querySelector('#nome').value
    const telefone = document.querySelector('#telefone').value

    if(nome.length > 0 && telefone.length > 0){
        let qntdCotas = cotas.textContent.split(':')[1]
        renderizaDados(pegaDados(qntdCotas))
    }else{
        alert('Insira os dados corretamente!')
    }
    
})
