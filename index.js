let gameConfig = {
    gameOn: false,
    gameBoard: [null, null, null, null, null, null, null, null, null],
    isXTurn: null,
    gameResult: false,
    xWins: 0,
    oWins: 0,
    draws: 0
}

const log = () => {
    console.log(gameConfig);
}

const matchReset = () => {
    gameConfig = {
        gameOn: false,
        gameBoard: [null, null, null, null, null, null, null, null, null],
        isXTurn: null,
        gameResult: false,
        xWins: 0,
        oWins: 0,
        draws: 0
    };
}

const gameStart = () => {
    gameConfig.gameOn = true;
    gameConfig.isXTurn = true;
    gameConfig.gameBoard = [null, null, null, null, null, null, null, null, null];
}

const turnToggle = () => {
    gameConfig.isXTurn === true ? gameConfig.isXTurn = false : gameConfig.isXTurn = true;
}

const xWins = () => {
    gameConfig.xWins = gameConfig.xWins + 1;
    gamestart();
}

const oWins = () => {
    gameConfig.oWins = gameConfig.oWins + 1;
    gameStart();
}

const markGameBoard = (e) => {
    // Check if game is started
    if (gameConfig.gameOn === false) return console.log("Hey! We're not playing yet!");
    // Check if game tile is already marked
    if (e.target.innerHTML !== "") return console.log("Already marked, friend!");
    let gameBoardIndex = e.target.id;
    let currentTurn = gameConfig.isXTurn === true ? "X" : "O";
    gameConfig.gameBoard[gameBoardIndex] = currentTurn;
    document.getElementById(gameBoardIndex).innerHTML = currentTurn;
    turnToggle();
    log();
}

const getViewportDimensions = () => {
    smallerDimension = Math.min((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * .8),
        (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * .8)
    ) + "px";
    document.querySelector(".game-container").style.width = smallerDimension;
    document.querySelector(".game-container").style.height = smallerDimension;
}

const gameTiles = Array.from(document.querySelector(".game-container").children);
gameTiles.map(elem => elem.addEventListener("click", markGameBoard));

document.getElementById("game-start").addEventListener('click', gameStart);
document.getElementById("match-reset").addEventListener('click', matchReset);
document.getElementById("x-wins").addEventListener('click', xWins);
document.getElementById("o-wins").addEventListener('click', oWins);
document.getElementById("x-goes").addEventListener('click', turnToggle);
document.getElementById("o-goes").addEventListener('click', turnToggle);
document.getElementById("log").addEventListener('click', log);
window.addEventListener('load', getViewportDimensions);
window.addEventListener('resize', getViewportDimensions);