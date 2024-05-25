/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/
function showEndGameAlert(){
    alert("Decidiste parar o jogo!"); // Display an alert
    
    window.location.href = "fim.html"; // Redirect to another page after the user clicks "OK"

}


// Add event listener to the stop button
document.getElementById('stopButton').addEventListener('click', function () {
    stopTimer();
    showEndGameAlert();
});

