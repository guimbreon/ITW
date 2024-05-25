/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/
let horas = 0;
let minutos = 0;
let segundos = 0;
let isRunning = false; // Flag to indicate whether the timer is running or not

let timerInterval; // Variable to hold the setInterval function

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(tempoJogo, 1000); // Start the timer, calling tempoJogo every second
    }
}
function stopTimer() {
    clearInterval(timerInterval); // Stop the timer
    isRunning = false;
}
let tempoTodo;
function tempoJogo() {
    segundos++;
    if (segundos >= 60) {
        segundos = 0;
        minutos++;
        if (minutos >= 60) {
            minutos = 0;
            horas++;
        }
    }


    //Format time to display
    let mostraHoras = (horas < 10) ? "0" + horas : horas;
    let mostraMinutos = (minutos < 10) ? "0" + minutos : minutos;
    let mostraSegundos = (segundos < 10) ? "0" + segundos : segundos;
    
    tempoTodo = mostraHoras + ":" + mostraMinutos + ":" + mostraSegundos;
    document.getElementById('timer').textContent = tempoTodo;
}

//Load function as the page loads
window.onload = function() {
    setInterval(tempoJogo, 1000);
};

