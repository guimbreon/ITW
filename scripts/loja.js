/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/
// Definindo os conceitos do jogo como objetos
const todosOsDecks = [
    { id: "saude", link: "../images/HEALTH flashcards/health-flashcards-backache.jpeg" , price : 15, nome: "Saúde"},
    { id: "halloween", link: "../images/halloween flashcards/bat-flashcard.jpeg" , price : 120, nome: "Halloween"},
    { id: "desporto", link: "../images/SPORTS flashcards/sports flashcards football-(soccer).jpeg" , price : 5, nome: "Desporto"},
    { id: "dinossauros", link: "../images/DINOSAUR flashcards/Velociraptor.jpeg" , price : 7200, nome: "Dinossauros"},
    { id: "natal", link: "../images/CHRISTMAS flashcards/Christmas-flashcards-Christmas-tree.jpeg" , price : 120, nome: "Natal"},
    { id: "plantas", link: "../images/PLANT flashcards/plant-flashcards-flower.jpeg" , price : 10, nome: "Plantas"},
    { id: "sentimentos", link: "../images/Feelings flashcards/angry-boy.jpeg" , price : 50, nome: "Sentimentos"},
    { id: "vegetais", link: "../images/VEGETABLE-FLASHCARDS/vegetable-flashcard-eggplant.jpeg" , price : 10, nome: "Vegetais"},
    { id: "todos", link: "../images/todos.jpeg" , price : 10, nome: "Todos"}
];

function adicionarItensLoja() {

    let decksUser = localStorage.getItem("decksUser");
    let userLogged = localStorage.getItem("logged?").substring(5);
    let loggedUser;
    let users = JSON.parse(localStorage.getItem("users"));

    for(let user in users){
        if(users[user].username === userLogged){
            loggedUser = users[user];
        }
    }
    const lojaDiv = document.getElementById('loja');

    const pontosParagrafo = document.getElementById('pontos')
    pontosParagrafo.innerHTML = `Tens ${loggedUser.pontos} pontos.`;

    todosOsDecks.forEach(item => {
        let jaPertence = false;
        for(let deck in loggedUser.decks){
            if(item.id === loggedUser.decks[deck]){
                jaPertence = true; //se o user já tiver o item, ele nem sequer aparece na loja
            }
        }
        if(!jaPertence){
            // Criar um contêiner para cada item
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            // Criar a imagem do item
            const itemImg = document.createElement('img');
            itemImg.src = item.link;
            itemImg.alt = item.id;
            itemDiv.appendChild(itemImg);

            // Criar um parágrafo para o nome do item
            const itemNome = document.createElement('p');
            itemNome.textContent = `Nome: ${item.nome}`;
            itemDiv.appendChild(itemNome);

            // Criar um parágrafo para o preço do item
            const itemPreco = document.createElement('p');
            itemPreco.textContent = `Preço: ${item.price} pontos`;
            itemDiv.appendChild(itemPreco);

            // Criar um botão para comprar o item
            const comprarButton = document.createElement('button');
            comprarButton.textContent = 'Comprar';
            comprarButton.onclick = () => {
                if(loggedUser.pontos >= item.price){
                    alert(`Você comprou: ${item.nome} por ${item.price} pontos`);
                    loggedUser.pontos -= item.price;
                    loggedUser.decks.push(item.id);
                    itemDiv.style = "display:None"
                    localStorage.setItem('users', JSON.stringify(users));
                }else if(loggedUser.pontos < item.price){
                    
                    alert(`Tem menos de ${item.price} pontos!`)
                }
            };
            itemDiv.appendChild(comprarButton);

            // Adicionar o contêiner do item à div "loja"
            lojaDiv.appendChild(itemDiv);
        }
    });
}

function irMiniJogo(){
    window.alert("Vai ser redirecionado para o MiniJogo!")
    window.location.href = "../extra/raspadinhas.html"

}

// Chamar a função para adicionar os itens quando a página carregar
window.onload = adicionarItensLoja;
