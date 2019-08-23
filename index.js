let gameConfig = {
    gameOn: false,
    gameBoard: [null, null, null, null, null, null, null, null, null],
    isXTurn: null,
    gameResult: false,
    xWins: 0,
    oWins: 0,
    draws: 0
}

const gameTiles = Array.from(document.querySelector(".game-container").children);

const log = () => {
    console.log(gameConfig);
}

const scoreboardUpdate = () => {
    document.getElementById("x-wins").innerHTML = gameConfig.xWins;
    document.getElementById("o-wins").innerHTML = gameConfig.oWins;
    document.getElementById("draws").innerHTML = gameConfig.draws;
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
    gameTiles.map(elem => { elem.innerHTML = ""; elem.classList.remove("X", "O") });
}

const gameReset = () => {
    gameConfig = {
        gameOn: false,
        gameBoard: [null, null, null, null, null, null, null, null, null],
        isXTurn: null,
        gameResult: false,
        xWins: gameConfig.xWins,
        oWins: gameConfig.oWins,
        draws: gameConfig.draws
    };
    gameTiles.map(elem => { elem.innerHTML = ""; elem.classList.remove("X", "O") });
}

const gameStart = () => {
    if (gameConfig.gameOn === true) return console.log("Already playing, buddy!");
    gameConfig.gameOn = true;
    gameConfig.isXTurn = true;
    gameConfig.gameBoard = [null, null, null, null, null, null, null, null, null];
    gameTiles.map(elem => elem.classList.remove("X", "O"))
}

const turnToggle = () => {
    gameConfig.isXTurn === true ? gameConfig.isXTurn = false : gameConfig.isXTurn = true;
}

const xWins = () => {
    gameConfig.xWins = gameConfig.xWins + 1;
    scoreboardUpdate();
    return gameReset();
}

const oWins = () => {
    gameConfig.oWins = gameConfig.oWins + 1;
    scoreboardUpdate();
    return gameReset();
}

const draw = () => {
    gameConfig.draws = gameConfig.draws + 1;
    scoreboardUpdate();
    return gameReset();
}

const turnTaker = (e) => {
    // Check if game is started
    if (gameConfig.gameOn === false) return console.log("Hey! We're not playing yet!");
    // Check if game tile is already marked
    if (e.target.innerHTML !== "") return console.log("Already marked, friend!");
    let gameBoardIndex = e.target.id;
    let currentTurn = gameConfig.isXTurn === true ? "X" : "O";
    gameConfig.gameBoard[gameBoardIndex] = currentTurn;
    document.getElementById(gameBoardIndex).innerHTML = currentTurn;
    document.getElementById(gameBoardIndex).classList.add(currentTurn);
    if (checkWinner() === "meow") {
        return draw();
    } else { if (checkWinner()) { currentTurn === "X" ? xWins() : oWins(); } };
    turnToggle();
}

const checkWinner = () => {
    let gameBoard = gameConfig.gameBoard;
    // This can definitely be written as a nice function
    if (gameBoard[0] !== null && gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2]) { console.log("Winner, across the top."); return true; };
    if (gameBoard[3] !== null && gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5]) { console.log("Winner, across the middle."); return true; };
    if (gameBoard[6] !== null && gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8]) { console.log("Winner, across the bottom."); return true; };
    if (gameBoard[0] !== null && gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6]) { console.log("Winner, column one."); return true; };
    if (gameBoard[1] !== null && gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7]) { console.log("Winner, column two."); return true; };
    if (gameBoard[2] !== null && gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8]) { console.log("Winner, column three."); return true; };
    if (gameBoard[0] !== null && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) { console.log("Winner, diagonal left to right."); return true; };
    if (gameBoard[2] !== null && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) { console.log("Winner, diagonal right to left."); return true; };
    if (gameBoard.every(elem => elem !== null)) { console.log("Kitty cats game!"); return "meow"; };
    return false;
}

const getViewportDimensions = () => {
    smallerDimension = Math.min((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * .8),
        (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * .8)
    ) + "px";
    document.querySelector(".game-container").style.width = smallerDimension;
    document.querySelector(".game-container").style.height = smallerDimension;
}

// Listeners listening
gameTiles.map(elem => elem.addEventListener("click", turnTaker));
document.getElementById("game-start").addEventListener('click', gameStart);
document.getElementById("match-reset").addEventListener('click', matchReset);
document.getElementById("x-wins").addEventListener('click', xWins);
document.getElementById("o-wins").addEventListener('click', oWins);
document.getElementById("log").addEventListener('click', log);
window.addEventListener('load', getViewportDimensions);
window.addEventListener('resize', getViewportDimensions);