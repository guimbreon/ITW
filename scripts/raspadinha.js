
let userLogged = localStorage.getItem("logged?").substring(5)

let users = localStorage.getItem("users");
users = JSON.parse(users);

let Pontos; // Variável para armazenar o Pontos do jogador
let loggedUser;

function encontrarPontos(){

  users.forEach(user => {

    if(user.username == userLogged){
      loggedUser = user;
      Pontos = user.pontos;
    }
  })
}
encontrarPontos();


const displayPontos = document.getElementById('money'); // Elemento que mostra o Pontos na tela
const cartoesRaspadinha = document.querySelectorAll('.scratch-card'); // Seleciona todos os elementos de cartões de raspadinha
const displayResultado = document.getElementById('result'); // Elemento que mostra o resultado na tela

// Itera sobre cada raspadinha
cartoesRaspadinha.forEach(cartao => {
  const custo = parseInt(cartao.getAttribute('data-cost')); // Obtém o custo da raspadinha
  const cartaoModificado = document.getElementById(cartao.getAttribute('data-cost'));
  
  cartaoModificado.realLink = cartaoModificado.src; // Salva a imagem original da raspadinha
  cartao.addEventListener('click', () => { // Adiciona um ouvinte de evento para cada raspadinha
    if (Pontos >= custo) { // Verifica se o jogador tem Pontos suficiente
      Pontos -= custo; // Subtrai o custo do Pontos do jogador
      displayPontos.innerHTML = Pontos; // Atualiza o display do Pontos
      let valor = raspar(custo); // Obtém o resultado do raspar
      if (valor != 0) {
        // Se o jogador ganhou, exibe a imagem de vitória
        setInterval(function() {
          cartaoModificado.src = cartaoModificado.realLink;
        }, 1200);
        cartaoModificado.src = '../images/raspadinha/vitoria.png';
      } else {
        // Se o jogador perdeu, exibe a imagem de derrota
        setInterval(function() {
          cartaoModificado.src = cartaoModificado.realLink;
        }, 1200);
        cartaoModificado.src = '../images/raspadinha/derrota.png';
      }
    } else {
      // Se o jogador não tiver Pontos suficiente, exibe uma mensagem
      displayResultado.innerHTML = "Não tens Pontos suficiente para raspar esta raspadinha!";
    }
  });
});

// Função para raspar o raspadinha
function raspar(custo) {
  const valorAleatorio = Math.random(); // Gera um valor aleatório
  let ganhos = 0;
  if (valorAleatorio > 0.7) { // Se o valor aleatório for maior que 0.6, o jogador ganha
    ganhos = custo * 2; // O jogador ganha o dobro do custo do raspadinha
    Pontos += ganhos; // Adiciona os ganhos ao Pontos do jogador
    //atualizar os pontos
    loggedUser.pontos = Pontos;
    localStorage.setItem('users', JSON.stringify(users));
    displayPontos.innerHTML = Pontos; // Atualiza o display do Pontos
    displayResultado.innerHTML = `Parabéns! Ganhaste ${ganhos} Pontos!`;
    return `${ganhos}!`; // Retorna os ganhos
  } else {
    // Se o jogador não ganhou, exibe uma mensagem
    displayResultado.innerHTML = "Desculpa, não ganhaste nada desta vez.";
    //atualizar os pontos
    loggedUser.pontos = Pontos;
    localStorage.setItem('users', JSON.stringify(users));
    if (Pontos == 0) {
      setTimeout(function(){
        displayPontos.innerHTML = 0;
        semPontos();
      }, 125);
    }
    return 0;
  }
}

// Função para adicionar Pontos
function mudarPontos(quantidade) {
  Pontos += quantidade; // Adiciona a quantidade especificada ao Pontos do jogador
  displayPontos.innerHTML = Pontos; // Atualiza o display do Pontos
}

// Função para lidar com a situação de o jogador ficar sem Pontos
function semPontos() {
  window.alert("Você não tem mais Pontos! Clique em OK para recomeçar!");
  location.reload(); // Esta linha atualiza a página
}

// Inicializa o display de Pontos
mudarPontos(0);
