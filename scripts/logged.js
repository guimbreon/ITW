/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/

function verificarLogin(){
    urlParams = window.location.href;
    if(localStorage.getItem("logged?")[0] == "T" && !urlParams.includes("pessoal.html")){ //APENAS PARA O INDEX
        document.getElementById("pessoal").innerHTML =
         "<a href='../header/pessoal.html'>Perfil</a>"
        }
    if(localStorage.getItem("logged?")[0] == "T" && urlParams.includes("index.html")){
        document.getElementById("pessoal").innerHTML =
         "<a href='header/pessoal.html'>Perfil</a>"
        document.getElementById('botaoMenu').href = "jogo/menu.html"

    }
    

    }
function unLogin(){
    localStorage.setItem("logged?", "False")
    window.alert("Vai ser redirecionado para a página principal!")
    window.location.href = "../index.html"
}

verificarLogin()