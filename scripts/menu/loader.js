/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/
// JavaScript for page2.html

// Retrieve the selected JavaScript option from the query parameter
let urlParams = new URLSearchParams(window.location.search);
const isClick = urlParams.get('type'); //Click or nah?
const deck = urlParams.get('deck'); // which deck u playin?
const time = urlParams.get('time'); // for how long u playin?

const scriptType = document.createElement('script');
// Load the selected JavaScript file dynamically

//to load the correct type of input to play
if (isClick === 'decksInput') {
  scriptType.src = '../scripts/decksInput.js';
  scriptType.innerHTML = `
  showInput();
  `
  document.head.appendChild(scriptType);
} else if (isClick === 'decksClick') {
  scriptType.src = '../scripts/decksClicks.js';
  document.head.appendChild(scriptType);
} else {
  console.error('Invalid JavaScript option selected.');
}


//to load the correct deck to play
const scriptDecks = document.createElement('script');
if(deck == 'saude'){
  scriptDecks.src = '../scripts/decks/saude.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'halloween'){
  scriptDecks.src = '../scripts/decks/halloween.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'animaisDaSelva'){
  scriptDecks.src = '../scripts/decks/animaisDaSelva.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'desporto'){
  scriptDecks.src = '../scripts/decks/desporto.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'dinossauros'){
  scriptDecks.src = '../scripts/decks/dinossauros.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'natal'){
  scriptDecks.src = '../scripts/decks/natal.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'plantas'){
  scriptDecks.src = '../scripts/decks/plantas.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'sentimentos'){
  scriptDecks.src = '../scripts/decks/sentimentos.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'vegetais'){
  scriptDecks.src = '../scripts/decks/vegetais.js';
  document.head.appendChild(scriptDecks);
} else if(deck == 'todos'){
  scriptDecks.src = '../scripts/decks/todos.js';
  document.head.appendChild(scriptDecks);
}





//to load the time of the game
const scriptTime = document.createElement('script');
let qntsPontos = document.getElementById("pontos");
let pontos = 0;
if(time == "infinito"){
  qntsPontos.innerHTML = "O jogo vale 1 Ponto!"
  pontos = 1;
}else if(time == "10m"){
  qntsPontos.innerHTML = "O jogo vale 2 Pontos!"
  pontos = 2;
}else if(time == "5m"){
  qntsPontos.innerHTML = "O jogo vale 4 Pontos!"
  pontos = 4;
}else if(time == "3m"){
  qntsPontos.innerHTML = "O jogo vale 7 Pontos!"
  pontos = 7;
}else if(time == "1m"){
  qntsPontos.innerHTML = "O jogo vale 10 Pontos!"
  pontos = 10;
}
