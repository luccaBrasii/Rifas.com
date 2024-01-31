const botao = document.querySelectorAll('.excluirAposta')


// Função para lidar com o clique no botão
function handleClick(link) {


  // Exibe a caixa de diálogo de confirmação
  const resposta = window.confirm('Você realmente quer excluir essa aposta?');

  // Se o usuário clicar em "OK" (resposta é true), redireciona para o link
  if (resposta) {
    window.location.href = link;
  }
}

botao.forEach(elemento => {
  elemento.addEventListener('click', () => {
    let link = elemento.getAttribute('name')
    handleClick(link)
  });

})

