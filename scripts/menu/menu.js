/*
    RC: 2023-2024
    GRUPO 13
    Guilherme Soares n 62372: PL23
    João Ribeiro 62206: PL23
    Duarte Soares  62371: PL23
*/
//decks
function showUserDecks(){
  let users = localStorage.getItem("users");
  let userLogged = localStorage.getItem("logged?").substring(5);
  users = JSON.parse(users);
  
  for (let user of users) {
    if(user.username == userLogged){
      for(let deck in user.decks){
        document.getElementById("th" + user.decks[deck]).style = "display: table-cell"
        document.getElementById("td" + user.decks[deck]).style = "display: table-cell"
      }
    }

  }

  
}

//separate
let selectedOption = [null, null, null, null]; // Initialize selectedOption as a list with two null values

function selectOption(optionId) {
  // Deselect the previously selected option if any
  if (selectedOption[0] !== null) {
    document.getElementById(selectedOption[0]).classList.remove('selected');
  }

  // Select the clicked option
  document.getElementById(optionId).classList.add('selected');
  selectedOption[0] = optionId; // Update the first position in the list
}

function selectDeck(optionId){
  if (selectedOption[1] !== null) {
    document.getElementById(selectedOption[1]).classList.remove('selected');
  }

  // Select the clicked option
  document.getElementById(optionId).classList.add('selected');
  selectedOption[1] = optionId; // Update the second position in the list
}

function selectTime(optionId){
  if (selectedOption[2] !== null) {
    document.getElementById(selectedOption[2]).classList.remove('selected');
  }

  // Select the clicked option
  document.getElementById(optionId).classList.add('selected');
  selectedOption[2] = optionId; // Update the second position in the list

  if(optionId == "tempoSim"){
    document.getElementById("tempoMins").style = "display: grid;grid-template-columns: auto auto;"
    document.getElementById("tempoMinsDir").style = "grid-column: 2"
    document.getElementById("tempoMinsEsq").style = "grid-column: 1"
    selectedOption[3] = null; // Update the second position in the list
  }else{
    selectedOption[3] = "infinito"; // Update the second position in the list
    document.getElementById("tempoMins").style = "display: None"
  }
}
function selectMins(optionId){
  if (selectedOption[3] !== null) {
    document.getElementById(selectedOption[3]).classList.remove('selected');
  }

  // Select the clicked option
  document.getElementById(optionId).classList.add('selected');
  selectedOption[3] = optionId; // Update the second position in the list
}


function sendSelection() {
  if (selectedOption.length == 4 && selectedOption[0] != null  && selectedOption[1] != null  && selectedOption[2] != null  && selectedOption[3] != null) { //Only if there are 2 items selected, there will be sent to the next page
    // Redirect to the next page with the selected JavaScript option
    redirectToPage('tabuleiro.html', selectedOption);
  } else {
    alert('Please select 3 options before sending.');
  }
}

function redirectToPage(pageURL, selectedOption) {// "type" is to choose how to play
  // Redirect to the next page with the selected JavaScript option
  window.location.href = pageURL + '?type=' + selectedOption[0] 
  + '&deck=' + selectedOption[1]
  + '&time=' +selectedOption[3];
}

showUserDecks()