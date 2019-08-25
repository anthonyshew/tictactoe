const animationWinShakeDuration = 2500;

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

const messageBar = (message) => {
    document.getElementById("messages").innerHTML = message;
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
    gameTiles.map(elem => { elem.innerHTML = ""; elem.classList.remove("X", "O", "shake-win") });
    messageBar("New match! Press start to duel!");
    scoreboardUpdate();
}

const gameReset = () => {
    setTimeout(() => {
        gameConfig = {
            gameOn: false,
            gameBoard: [null, null, null, null, null, null, null, null, null],
            isXTurn: null,
            gameResult: false,
            xWins: gameConfig.xWins,
            oWins: gameConfig.oWins,
            draws: gameConfig.draws
        };
        gameTiles.map(elem => { elem.innerHTML = ""; elem.classList.remove("X", "O", "shake-win") });
        messageBar("Press start to duel!");
    }, animationWinShakeDuration)
}

const gameStart = () => {
    if (gameConfig.gameOn === true) return console.log("Already playing, buddy!");
    gameConfig.gameOn = true;
    gameConfig.isXTurn = true;
    gameConfig.gameBoard = [null, null, null, null, null, null, null, null, null];
    gameTiles.map(elem => elem.classList.remove("X", "O"))
    messageBar("Your move, X...")
}

const turnToggle = () => {
    gameConfig.isXTurn === true ? (messageBar("Your move, O..."), gameConfig.isXTurn = false) : (messageBar("Your move, X..."), gameConfig.isXTurn = true);

}

const xWins = () => {
    gameConfig.gameOn = false;
    gameConfig.xWins = gameConfig.xWins + 1;
    scoreboardUpdate();
    messageBar("X Wins!");
    gameReset();
}

const oWins = () => {
    gameConfig.gameOn = false;
    gameConfig.oWins = gameConfig.oWins + 1;
    scoreboardUpdate();
    messageBar("O Wins!");
    gameReset();
}

const draw = () => {
    gameConfig.gameOn = false;
    gameConfig.draws = gameConfig.draws + 1;
    scoreboardUpdate();
    messageBar("Cat's game...");
    gameReset();
}

const animateWin = (mark1, mark2, mark3) => {
    setTimeout(() => {
        document.getElementById(mark1).classList.remove("X", "O");
        document.getElementById(mark2).classList.remove("X", "O");
        document.getElementById(mark3).classList.remove("X", "O");
        document.getElementById(mark1).classList.add("shake-win");
        document.getElementById(mark2).classList.add("shake-win");
        document.getElementById(mark3).classList.add("shake-win");
    }, 500)

}

const takeTurn = (e) => {
    // Check if game is on
    if (gameConfig.gameOn === false) return messageBar("Hey! We're not playing at the moment!");
    // Check if game tile is already marked
    if (e.target.innerHTML !== "") return messageBar("Already marked, friend!");

    let gameBoardIndex = e.target.id;
    let currentTurn = gameConfig.isXTurn === true ? "X" : "O";
    gameConfig.gameBoard[gameBoardIndex] = currentTurn;
    document.getElementById(gameBoardIndex).innerHTML = currentTurn;
    document.getElementById(gameBoardIndex).classList.add(currentTurn);
    turnToggle();
    if (checkWinner() === "meow") {
        return draw();
    } else {
        if (checkWinner()[0]) { animateWin(checkWinner()[1], checkWinner()[2], checkWinner()[3]); currentTurn === "X" ? xWins() : oWins() };
    }
}

const checkWinner = () => {
    let gameBoard = gameConfig.gameBoard;

    const winTester = (mark1, mark2, mark3, message) => {
        if (gameBoard[mark1] !== null && gameBoard[mark1] === gameBoard[mark2] && gameBoard[mark1] === gameBoard[mark3]) { console.log(message); return [true, mark1, mark2, mark3] }
        else { return null };
    };

    let winningCombination = [winTester(0, 1, 2, "Winner, across the top."),
    winTester(3, 4, 5, "Winner, across the middle."),
    winTester(6, 7, 8, "Winner, across the bottom."),
    winTester(0, 3, 6, "Winner, column one."),
    winTester(1, 4, 7, "Winner, column two."),
    winTester(2, 5, 8, "Winner, column three."),
    winTester(0, 4, 8, "Winner, diagonal left to right."),
    winTester(2, 4, 6, "Winner, diagonal right to left.")
    ].filter(elem => elem !== null)[0];
    if (winningCombination === undefined) { winningCombination = [null] };
    if (gameBoard.every(elem => elem !== null) && winningCombination.length === 1) { winningCombination = "meow"; };
    return winningCombination;
}

const getViewportDimensions = () => {
    smallerDimension = Math.min((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * .8),
        (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * .8)
    ) + "px";
    document.querySelector(".game-container").style.width = smallerDimension;
    document.querySelector(".game-container").style.height = smallerDimension;
}

gameTiles.map(elem => elem.addEventListener("click", takeTurn));
document.getElementById("game-start").addEventListener('click', gameStart);
document.getElementById("match-reset").addEventListener('click', matchReset);
document.getElementById("x-wins").addEventListener('click', xWins);
document.getElementById("o-wins").addEventListener('click', oWins);
window.addEventListener('load', getViewportDimensions);
window.addEventListener('resize', getViewportDimensions);