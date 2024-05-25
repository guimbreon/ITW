/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/
function Baralho() {
    this.cartas = [];
    
    // Método para adicionar uma carta ao baralho
    this.adicionarCarta = function(carta) {
        this.cartas.push(carta);
    }
}

function Carta(nome, link) {
    this.nome = nome;
    this.link = link;
}

function baralhar(baralho) {
    const cartasBaralhadas = baralho.sort(() => Math.random() - Math.random());//se mudarmos o ultimo numero na linha, quanto menor "mais random"
    return cartasBaralhadas;
}

function escolher10(baralho) {
    const cartasBaralhadas = baralho.cartas.sort(() => Math.random() - Math.random());
    const cartasEscolhidas = cartasBaralhadas.slice(0, 10);
    return cartasEscolhidas;
}


function cartasEmPar(cards) {
    let cartasMult = [];
    cards.forEach(card => {
        cartasMult.push(card, { ...card });
    });
    return cartasMult;
}

function mostrar(todasCartas) {
    let line = 1;
    let i = 0;
    let element = 0;
    let numCardsClicked = 0;
    let clickedCards = [];
    let certos = 0;
    let userLogged = localStorage.getItem("logged?").substring(5)

    let users = localStorage.getItem("users");
    users = JSON.parse(users);

    let baralho = new Baralho();

    for (let item in todasCartas) {
        let carta = new Carta(todasCartas[item].nome, todasCartas[item].link);
        baralho.adicionarCarta(carta);
    }

    let baralhoEscolhido = escolher10(baralho);
    baralhoEscolhido = cartasEmPar(baralhoEscolhido);
    baralhoEscolhido = baralhar(baralhoEscolhido);

    let alreadyClickedCards = [];

    do {
        for (i = 1; i <= 5; i++) { //elem por linha
            let carta = baralhoEscolhido[element];
            const img = document.createElement("img");

            img.src = "../images/back.jpg";
            img.alt = carta.nome;
            img.id = String(line) + String(i);
            img.value = String(line) + String(i);
            img.linkReal = carta.link;
            img.linkBack = "../images/back.jpg";
            img.addEventListener("click", function () {

                document.getElementById("corretas").innerHTML = "<p>Já acertou " + certos + " ainda faltam " + (10 - certos) + ".</p>";

                // Verificar se a carta já foi clicada e se há menos de 2 cartas clicadas
                if (!clickedCards.includes(img.id) && numCardsClicked < 2 && !alreadyClickedCards.includes(img.id)) {
                    img.src = img.linkReal;
                    clickedCards.push(img.id);
                    numCardsClicked++;

                    // Verificar se duas cartas foram clicadas
                    if (numCardsClicked == 2) {
                        
                        // Atrasar a verificação por 1 segundo
                        setTimeout(function () {
                            let carta1 = document.getElementById(clickedCards[0]);
                            let carta2 = document.getElementById(clickedCards[1]);
                            // Verificar se as cartas são iguais
                            if (carta1.alt == carta2.alt) {
                                alreadyClickedCards.push(carta1.id)
                                alreadyClickedCards.push(carta2.id)
                                console.log("IGUAL FUNCIONA!");
                                certos++;
                            } else {
                                console.log("NÃO IGUAL :)");
                                carta1.src = carta1.linkBack;
                                carta2.src = carta2.linkBack;
                            }

                            // Reiniciar contador de cartas clicadas e array de cartas clicadas
                            numCardsClicked = 0;
                            clickedCards = [];

                            // Verificar se o número de cartas corretas alcançou o limite
                            if (certos == 2) {
                                // Retrieve and update the 'pontos' value in localStorage
                                
                                for (let user of users) {
                                    if(user.username == userLogged && user.pontos != null){
                                        user.pontos += pontos;
                                        user.nJogos += 1;
                                    }else if(user.username == userLogged){
                                        user.pontos = 1
                                        user.nJogos = 1;

                                    }
                                    if(user.username == userLogged){
                                        (user.timers).push(tempoTodo) //fazer com q ele guarde apenas os 3 melhores
                                    }
                                }
                
                                // Save the updated users back to localStorage
                                localStorage.setItem('users', JSON.stringify(users));


                                window.alert("Fim do jogo!\nClique em 'Ok!' para continuar!");
                                window.location.href = "fim.html";
                            }
                        }, 750); // 1000 milissegundos = 1 segundo
                    }
                }
            });

            const divLinha = document.querySelector('.Linha' + line);
            divLinha.appendChild(img);
            element++;
        }
        line++;
    } while (line != 5); //linhas
}

function igual(carta1, carta2) {
    //verifica se a carta existe
    try {
        document.getElementById(carta1).alt;
        document.getElementById(carta2).alt;
    } catch (err) {
        window.alert("Este identificador não faz parte do baralho!");
        throw "Este identificador não faz parte do baralho!";
    }
    if (document.getElementById(carta1).alt == document.getElementById(carta2).alt) {
        console.log("É igual.");
    } else {
        console.log("Não é igual.");
    }
}
