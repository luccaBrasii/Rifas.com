//VERTODOS OS NUMEROS

const verTudo = document.querySelectorAll('.verTudo')

var cont = 0

verTudo.forEach(botoes => {
    botoes.addEventListener('click', (thiss) => {
        const elementoPai = thiss.target.parentNode.parentNode
        const elementoFilho = elementoPai.getElementsByClassName('cotas_participantes')[0]

        if (cont === 0) {

            elementoPai.parentNode.style.height = 'auto'
            elementoFilho.style.height = 'auto'

            botoes.textContent = 'ver menos'

            cont = 1
        } else if (cont === 1) {

            elementoPai.parentNode.style.height = 'auto'
            elementoFilho.style.height = '108px'

            botoes.textContent = 'ver tudo'
            cont = 0
        }
    })
})


