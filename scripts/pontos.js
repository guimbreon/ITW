/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/

//to load the time of the game
let tempoLimite = 0;
if(time == "10m"){
    tempoLimite = 600;
}else if(time == "5m"){
    tempoLimite = 300;
}else if(time == "3m"){
    tempoLimite = 180;
}else if(time == "1m"){
    tempoLimite = 60;
}



let tempoQPassou = 0;
function tempoPassou(){
    setInterval(function(){
        tempoQPassou++
        if(tempoQPassou == tempoLimite){
            alert("O TEMPO ACABOU!!")
            window.location.href = "fim.html"; 
            clearInterval(timerInterval); // Stop the timer
            isRunning = false;
    
        }
    }, 1000);

    
}
tempoPassou()
