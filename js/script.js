let WINNINGSCORE = 5;


function main(){
    addButtonListeners();
}
main();

//Model

/**
 * Array of options rock, papper and scissors
 */
function generateOptions(){
    let arrayOfOptions = [];
    let options = document.querySelectorAll(".options-container button");
    for(let option of options){
        arrayOfOptions.push(option.getAttribute("name"));
    }
    return arrayOfOptions;
}
/**
 * Function to generate a random guess for the computer
 */
function generateComputerHand(){
    let options = generateOptions();

    return (options[Math.floor(Math.random() * options.length)])
}
/**
 * Compare computers choise to player choise
 */
function compareHands(playerHand,ComputerHand){
    if(checkIfPlayerWon(playerHand,ComputerHand)){
        return "Player Won";
    }
    else if(checkIfComputerWon(playerHand,ComputerHand)){
        return "Computer Won";
    }
    else{
        return "Tie";
    }
}
/**
 * Check for all the combinations how the player can win
 * @param {player} playerHand 
 * @param {*} ComputerHand 
 * @returns true or false
 */
function checkIfPlayerWon(playerHand,ComputerHand){
    if(playerHand === "rock" && ComputerHand === "scissors"){
        return true;
    }
    else if(playerHand === "paper" && ComputerHand === "rock"){
        return true;
    }
    else if( playerHand === "scissors" && ComputerHand === "paper"){
        return true
    }
    else{
        return false;
    }
}
/**
 * Checks for all the combinations for computer to win
 * @param {*} playerHand 
 * @param {*} ComputerHand 
 * @returns 
 */
function checkIfComputerWon(playerHand,ComputerHand){
    if(ComputerHand === "rock" && playerHand === "scissors"){
        return true;
    }
    else if(ComputerHand === "paper" && playerHand === "rock"){
        return true;
    }
    else if( ComputerHand  === "scissors" && playerHand === "paper"){
        return true
    }
    else{
        return false;
    }
}
/**
 * returns the image of the hand chosen
 * @param {the hand chosen} hand 
 * @returns 
 */
function getImage(hand){
    let images = {
        rock: "image/rock.JPG",
        paper: "image/paper.JPG",
        scissors: "image/scissors.JPG"
    };
    if(hand === "rock"){
        return images.rock;
    }
    else if(hand === "paper"){
        return images.paper;
    }
    else{
        return images.scissors
    }
}
/**
 * Checks if game is over
 * @returns true or false if game is over
 */
function isGameOver(){
    let playerScore = Number(document.querySelector(".score-board p:first-of-type").innerText);
    let computerScore = Number(document.querySelector(".score-board p:last-of-type").innerText);
    if(playerScore >= WINNINGSCORE || computerScore >= WINNINGSCORE){
        return true;
    }
    else{
        return false;
    }
}
//controller
/**
 * creates the eventlisteners for the buttons to for the player to chose from
 * and runs the game
 */
function addButtonListeners(){
    let computerHand = "",playerHand = "",winner = "", playerImg = "", computerImg = "";
    let handOptions = document.querySelectorAll(".options-container button");
    for(let option of handOptions){
        option.addEventListener("click", () =>{
            playerHand = option.getAttribute("name");
            computerHand = generateComputerHand();
            playerImg = getImage(playerHand);
            computerImg = getImage(computerHand);
            winner = compareHands(playerHand,computerHand);
            
            if(checkIfPlayerWon(playerHand,computerHand)){
                renderPlayerScore()
            }
            else if(checkIfComputerWon(playerHand,computerHand)){
                renderComputerScore();
            }
            displayResult(winner,playerImg,computerImg);
            if(isGameOver()){
                renderGameOver(); 
                let playAgain = document.querySelector(".play-again")
                playAgain.addEventListener("click", () =>{
                    initScoreBoard();
                });         
            }

        });
    }
}

//view

/**
 * Updates player Score
 */
function renderPlayerScore(){
    document.querySelector(".score-board p:first-of-type").innerText++;
}
/**
 * Updates computer score
 */
function renderComputerScore(){
    document.querySelector(".score-board p:last-of-type").innerText++;
}
/**
 * displays the winner of the round
 * @param {*} result 
 */
function displayResult(result,playerImg,computerImg){
    let container = document.querySelector(".dynamic-container"); 
    container.innerHTML = `
        <img src="${playerImg}" alt="rock" width="50" height="50">
        <p>${result}</p>
        <img src="${computerImg}" alt="rock" width="50" height="50">
    `;  
}
/**
 * Renders the output when the game is over
 */
function renderGameOver(){
    let container = document.querySelector(".dynamic-container"); 
    let gameContainer = document.querySelector(".options-container");
    gameContainer.classList.add("game-is-over");
    container.innerHTML += `
        <div class = "game-over-container"> 
            <p>Game over!</p>
            <button class = "play-again">Play Again</button>
        </div>
    `

}
/**
 * inits the view for a new game
 */
function initScoreBoard(){
    document.querySelector(".score-board p:first-of-type").innerText = 0;
    document.querySelector(".score-board p:last-of-type").innerText = 0;
    let container = document.querySelector(".dynamic-container"); 
    let gameContainer = document.querySelector(".options-container");
    gameContainer.classList.remove("game-is-over");
    container.innerHTML = "";
}





