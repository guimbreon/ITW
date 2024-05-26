/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/
let userLogged = localStorage.getItem("logged?").substring(5)

// Função para converter "hh:mm:ss" para segundos
function timeToSeconds(time) {
    const parts = time.split(':').map(Number);
    const seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    return seconds;
}

// Função para converter segundos para "hh:mm:ss"
function secondsToTime(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

// Função para ordenar uma lista de timers no formato "hh:mm:ss"
function sortTimers(timers) {
    return timers
        .map(time => ({ time, seconds: timeToSeconds(time) }))  // Converte cada timer para segundos
        .sort((a, b) => a.seconds - b.seconds)                 // Ordena com base nos segundos
        .map(obj => obj.time);                                 // Converte de volta para o formato "hh:mm:ss"
}

function inserirTemposTodos() {
    let ondeColocar = document.getElementById("tabelaTodos");
    let users = localStorage.getItem('users');
    users = JSON.parse(users);
    let tabela = document.createElement("table");
    let trTh = document.createElement("tr");
    
    users.forEach(user => {
        const th = document.createElement("th");
        th.className = "username";
        th.innerHTML = user.username;
        trTh.appendChild(th);
    });
    tabela.appendChild(trTh);

    // Create a map to store times for each user
    let userTimes = users.map(user => sortTimers(user.timers));

    // Find the maximum number of timers any user has
    let maxTimers = 10; //Isto serve para quando tivermos os timers

    // Create rows for each timer index up to maxTimers
    for (let i = 0; i < maxTimers; i++) {
        let trTd = document.createElement("tr");
        userTimes.forEach(times => {
            const td = document.createElement("td");
            td.className = "besTime";
            td.innerHTML = times[i] || ''; // Use an empty string if no time exists
            trTd.appendChild(td);
        });
        tabela.appendChild(trTd);
    }

    ondeColocar.appendChild(tabela);
}
function inserirTemposPessoal() {
    let ondeColocar = document.getElementById("tabelaPessoal");
    let users = localStorage.getItem('users');
    users = JSON.parse(users);
    let userLogged = localStorage.getItem("logged?").substring(5);
    let tabela = document.createElement("table");
    let trTh = document.createElement("tr");

    // Encontrar o usuário logado
    let loggedUser = users.find(user => user.username === userLogged);

    if (loggedUser) {
        // Criar o cabeçalho da tabela com o nome do usuário logado
        const th = document.createElement("th");
        th.className = "username";
        th.innerHTML = loggedUser.username;
        trTh.appendChild(th);
        tabela.appendChild(trTh);

        // Ordenar os timers do usuário logado
        let userTimes = sortTimers(loggedUser.timers);

        // Definir o número máximo de timers
        let maxTimers = userTimes.length;

        // Criar as linhas para cada índice de timer até maxTimers
        for (let i = 0; i < maxTimers; i++) {
            let trTd = document.createElement("tr");
            const td = document.createElement("td");
            td.className = "besTime";
            td.innerHTML = userTimes[i] || ''; // Usar uma string vazia se não existir tempo
            trTd.appendChild(td);
            tabela.appendChild(trTd);
        }

        // Adicionar a tabela ao elemento ondeColocar
        ondeColocar.appendChild(tabela);
    } else {
        console.log("Utilizador não encontrado.");
    }
}

// Função para ordenar uma lista de tempos globalmente
function sortGlobalTimers(timers) {
    return timers.sort((a, b) => a.seconds - b.seconds);
}

function inserirTemposStats() {
    const ondeColocar = document.getElementById("tabelaStats");
    let users = localStorage.getItem('users');
    users = JSON.parse(users);

    let globalTimers = [];

    // Combinar todos os tempos com os respetivos utilizadores
    users.forEach(user => {
        user.timers.forEach(timer => {
            globalTimers.push({
                username: user.username,
                time: timer,
                seconds: timeToSeconds(timer)
            });
        });
    });

    // Ordenar os tempos globalmente
    globalTimers = sortGlobalTimers(globalTimers);

    // Criar a tabela
    const tabela = document.createElement("table");
    tabela.border = "1";
    const trTh = document.createElement("tr");

    // Criar cabeçalhos da tabela
    const thRank = document.createElement("th");
    thRank.className = "rank";
    thRank.innerHTML = "Posição";
    trTh.appendChild(thRank);

    const thTime = document.createElement("th");
    thTime.className = "time";
    thTime.innerHTML = "Tempo";
    trTh.appendChild(thTime);

    const thUser = document.createElement("th");
    thUser.className = "username";
    thUser.innerHTML = "Jogador";
    trTh.appendChild(thUser);

    tabela.appendChild(trTh);

    // Criar as linhas da tabela para cada tempo

    let maxTimers = 0;
    globalTimers.forEach((entry, index) => {
        if(maxTimers < 10){
            const trTd = document.createElement("tr");

            const tdRank = document.createElement("td");
            tdRank.className = "rank";
            tdRank.innerHTML = index + 1;
            trTd.appendChild(tdRank);

            const tdTime = document.createElement("td");
            tdTime.className = "time";
            tdTime.innerHTML = entry.time;
            trTd.appendChild(tdTime);

            const tdUser = document.createElement("td");
            tdUser.className = "username";
            tdUser.innerHTML = entry.username;
            trTd.appendChild(tdUser);

            tabela.appendChild(trTd);
    }
    maxTimers++
    });

    ondeColocar.appendChild(tabela);
}

function tempoTotalJogado(){
    const ondeColocar = document.getElementById("tabelaJogos");
    let users = localStorage.getItem('users');
    users = JSON.parse(users);
    
    let userLogged = localStorage.getItem("logged?").substring(5);
    let loggedUser = users.find(user => user.username === userLogged);
    
    let tabela = document.createElement("table");
    let trTr = document.createElement("tr");

    let jogosJogados = document.createElement("th")
    jogosJogados.innerHTML = "Numero total de Jogos"
    jogosJogados.className = "username"
    trTr.appendChild(jogosJogados)
    tabela.appendChild(trTr)

    trTr = document.createElement("tr");
    let totalJogos = document.createElement("td")
    totalJogos.innerHTML = loggedUser.nJogos
    totalJogos.className = "besTime"
    trTr.appendChild(totalJogos)
    tabela.appendChild(trTr)

    trTr = document.createElement("tr");
    let tempoJogado = document.createElement("th")
    tempoJogado.innerHTML = "Tempo Total Jogado (mins)"
    tempoJogado.className = "username"
    trTr.appendChild(tempoJogado)
    tabela.appendChild(trTr)

    let timerWork = loggedUser.timers
    let somaTempo = 0;
    let segundos = 0;
    timerWork.forEach((time) =>{
        time = time.split(":")
        segundos += parseInt(time[2])
        somaTempo += parseInt(time[0]) * 60 + parseInt(time[1])
    });
    somaTempo += parseInt(segundos/60)

    trTr = document.createElement("tr");
    let tempoTotal = document.createElement("td")
    tempoTotal.innerHTML = somaTempo
    tempoTotal.className = "besTime"

    trTr.append(tempoTotal)
    tabela.appendChild(trTr)

    ondeColocar.appendChild(tabela)

}


urlParams = window.location.href;
if(urlParams.includes("pessoal.html")){
    inserirTemposPessoal();
    tempoTotalJogado();

}else if(urlParams.includes("stats.html")){
    inserirTemposStats();
    inserirTemposTodos();
}else if(urlParams.includes("fim.html")){
    inserirTemposStats();
}