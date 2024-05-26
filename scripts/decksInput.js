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

function cartasEmPar(cards){
    let cartasMult = [];
    cards.forEach(card =>{
        cartasMult.push(card, {...card});
    });
    return cartasMult;
}

function mostrar(todasCartas) {
    let line = 1;
    let i = 0;
    let element = 0;
    let certos = 0;

    

    let baralho = new Baralho();

    for (let item in todasCartas) {
        let carta = new Carta(todasCartas[item].nome, todasCartas[item].link)
        baralho.adicionarCarta(carta)
    }
    let baralhoEscolhido = escolher10(baralho);
    baralhoEscolhido = cartasEmPar(baralhoEscolhido)
    baralhoEscolhido = baralhar(baralhoEscolhido)

    document.getElementById("corretas").innerHTML = "<p>Já acertou 0" 
    + " ainda faltam " + (20) + ".</p>"

    do {
        for (i = 1; i <= 5; i++) {
            let carta = baralhoEscolhido[element];
            const img = document.createElement("img");

            
            const legend = document.createElement("label")
            legend.innerHTML = String(line) + String(i);
            legend.id = "l" + String(line) + String(i);
            legend.setAttribute("for", String(line) + String(i) );

            img.src = "../images/back.jpg";
            img.alt = carta.nome;
            img.id = String(line) + String(i);
            img.linkReal = carta.link;
            img.linkBack = "../images/back.jpg";


            const divLinha = document.querySelector('.Linha' + line);
            const container = document.createElement("div");
            container.id = "container"
            container.appendChild(img);
            container.appendChild(legend);

            divLinha.appendChild(container);

            element++;
        }
        line++;
    } while (line != 5)
}



function igual(carta1, carta2){
    //verifica se a carta existe
    try{
        document.getElementById(carta1).alt;
        document.getElementById(carta2).alt;
    }catch(err){
        window.alert("Este identificador não faz parte do baralho!");
        throw "Este identificador não faz parte do baralho!";
    }
    if (document.getElementById(carta1).alt == document.getElementById(carta2).alt){
        console.log("É igual.")
    }else{
        console.log("Não é igual.")
    }

}

function readInput(){
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const corretas = []        
    //corretas sempre para a frente

    for(let item in corretas){
        const carta = document.getElementById(corretas[item])
        carta.src = carta.linkReal
    }

    // Add event listeners to handle Enter key press
    input1.addEventListener('keypress', handleEnterKeyPress);
    input2.addEventListener('keypress', handleEnterKeyPress);

    // Define the event handler function for input changes
    function handleInputChange(event) {
        // Get the value of the input that triggered the event
        const value = event.target.value;
        console.log("Input value:", value);
        // You can perform any other actions you want with the input value here
    }

    //Para quando o "Enter é pressionado"
    function handleEnterKeyPress(event) {
        // Check if the pressed key is Enter (keyCode 13)
        if (event.keyCode === 13) { //Quando o "Enter" é pressionado ele ativa
            console.log("Enter key pressed");
            
            playInputs();
        }
    }

    // Example function to process the inputs when Enter is pressed
    function playInputs() {

        let userLogged = localStorage.getItem("logged?").substring(5)

        let users = localStorage.getItem("users");
        users = JSON.parse(users);

        const value1 = input1.value;
        const value2 = input2.value;
        let carta1 = document.getElementById(value1);
        let carta2 = document.getElementById(value2);
        
        const legenda1 = document.getElementById("l" + carta1.id);
        const legenda2 = document.getElementById("l" + carta2.id);
        legenda1.style = "display: None;"
        legenda2.style = "display: None;"


        // Check if the selected cards are the same
        if (value1 === value2) {
            window.alert("Os digitos são iguais");
            legenda1.style = "display: relative;"
            legenda2.style = "display: relative;"
            return; // Exit the function early
        }
        
        // Check if either of the selected cards has already been matched
        if (corretas.includes(value1) || corretas.includes(value2)) {
            window.alert("Os digitos já confirmados foram: " + corretas);
            return; // Exit the function early
        }
    
        // Flip the selected cards
        carta1.src = carta1.linkReal;
        carta2.src = carta2.linkReal;
        document.getElementById("input").style = "display:None"
    
        // Check if the cards match
        if (carta1.alt === carta2.alt) {
                
            setTimeout(function() {
                document.getElementById("input").style = "display:grid"
            }, 3000);
            
            carta1.src = "../images/Blank.png";
            carta2.src = "../images/Blank.png";

            // If the cards match, keep them flipped and mark them as correct
            corretas.push(value1);
            corretas.push(value2);

            //Check if the game is complete
            if(corretas.length == 20){
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
        } else {
            // If the cards don't match, flip them back after a delay
            
            setTimeout(function() {
                document.getElementById("input").style = "display:grid"

                carta1.src = carta1.linkBack;
                carta2.src = carta2.linkBack;
                
                legenda1.style = "display: relative;"
                legenda2.style = "display: relative;"
                
            }, 3000);
        }
        

    }
    
    
}
function showInputs() {
    // Create the first input element
    var input1 = document.createElement("input");
    input1.id = "input1";

    // Create the second input element
    var input2 = document.createElement("input");
    input2.id = "input2";

    // Get the existing div with id "input"
    var existingDiv = document.getElementById("input");

    // Append the input elements to the existing div
    existingDiv.appendChild(input1);
    existingDiv.appendChild(input2);
}

showInputs()
readInput()
