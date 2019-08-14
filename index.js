//Loop through DOM nodes of game
const gameLoop = () => {
    const gameTiles = Array.from(document.querySelector(".game-container").children);
    gameTiles.map((elem => console.log(elem.innerHTML)));
}

gameLoop();

// Create responsive square for .game-container
const viewportDimensions = () => {
    smallerDimension = Math.min((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * .8),
        (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * .8)
    ) + "px";
    document.querySelector(".game-container").style.width = smallerDimension;
    document.querySelector(".game-container").style.height = smallerDimension;
}

window.addEventListener('load', viewportDimensions);
window.addEventListener('resize', viewportDimensions);