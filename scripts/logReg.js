/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/
/* CONSTANTES DE FORMULÁRIO */
const FORMULARIO_REGISTO = "frmReg";
const FORMULARIO_LOGIN = "frmLogin";

/* LOGIN */
const LOGIN_USERNAME = "username";
const LOGIN_SENHA = "senha";

/* REGISTO */
const REGISTO_USERNAME = "username";
const REGISTO_SENHA = "senha";
const REGISTO_EMAIL = "email";
const REGISTO_FAIXA_ETARIA = "faixaEt";
const REGISTO_GENERO = "genero";

/* GUARDA OS USERS */
let users = JSON.parse(localStorage.getItem('users')) || [];
let formularioLogin;
let formularioRegisto;

function User(username, senha, email, faixaEtaria, genero) {
    this.username = username;
    this.senha = senha;
    this.email = email;
    this.faixaEtaria = faixaEtaria;
    this.genero = genero;
    this.pontos = 0;
    this.decks = ["animaisDaSelva"];
    this.timers = [];
    this.nJogos = 0;
}

function principal() {
    formularioLogin = document.forms[FORMULARIO_LOGIN];
    formularioRegisto = document.forms[FORMULARIO_REGISTO];
}

function criaUser() {
    const username = formularioRegisto.elements[REGISTO_USERNAME].value;
    const senha = formularioRegisto.elements[REGISTO_SENHA].value;
    let email = formularioRegisto.elements[REGISTO_EMAIL].value;
    const faixaEtaria = formularioRegisto.elements[REGISTO_FAIXA_ETARIA].value;
    const genero = formularioRegisto.elements[REGISTO_GENERO].value;


    /* VERIFICAR SE O USER EXISTE */
    let existe = false;
    for (let user of users) {
        if (username == user.username && email == user.email){
            window.alert("Username e E-mail já estão em uso!");
            formularioRegisto.reset();
            existe = true
            break; 
        }else if (username == user.username) {
            window.alert("Username já está em uso!");
            formularioRegisto.reset();
            existe = true
            break; 
        }else if (email == user.email) {
            window.alert("E-mail já está em uso!");
            formularioRegisto.reset();
            existe = true
            break; // Não há necessidade de continuar o loop se já encontramos uma correspondência
        }else if(!(email.split("@").length == 2) || email.split("@")[1] == ""){
            window.alert("E-mail com apresentação incorreta.\nDeveria ser 'exemplo1@exemplo2'.");
            formularioRegisto.reset();
            existe = true
            break;
        }
    }
    if(!existe){ //se não existe
        const novoUser = new User(username, senha, email, faixaEtaria, genero);

        users.push(novoUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("User criado!")
    }
    formularioRegisto.reset();
}


function limparUsers() {
    users = []
    localStorage.setItem('users', JSON.stringify(users));
}

function fazerLogin() {
    const username = formularioLogin.elements[LOGIN_USERNAME].value;
    const senha = formularioLogin.elements[LOGIN_SENHA].value;
    let entrou = false; // Alterado para inicializar como false

    for (let user of users) {
        if (username == user.username && senha == user.senha) {
            entrou = true;
            break; // Não há necessidade de continuar o loop se já encontramos uma correspondência
        }
    }

    if (entrou) {
        localStorage.setItem('logged?', ["True", username])
        window.alert("Sessão iniciada!");
        window.location.href = "menu.html"
    } else {
        window.alert("Nome de utilizador e Senha não correspondem!")
    }
    formularioLogin.reset();
}
