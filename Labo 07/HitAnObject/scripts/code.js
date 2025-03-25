let global = {
    IMAGE_COUNT: 5,
    IMAGE_SIZE: 48,
    IMAGE_PATH_PREFIX: "images/",
    IMAGE_PATH_SUFFIX: ".png",

    MOVE_DELAY: 3000,

    score: 0,
    timeoutId: 0
};

const setup = () => {
    let target = document.getElementById("target");
    target.addEventListener("click", targetClicked);

    let start = document.getElementById("playButton");
    start.addEventListener("click", startGame);
};
window.addEventListener("load", setup);

const startGame = (event) => {
    // reset score
    global.score = 0;
    let score = document.getElementById("score");
    score.innerText = "Aantal hits: " + global.score;

    // hide button
    event.target.classList.add("hidden");

    // start game
    renewTarget();
}

const targetClicked = (event) => {
    // cancel timer
    clearTimeout(global.timeoutId);

    // check if cake or bomb
    let targetType = event.target.getAttribute("data-type");

    if(targetType === "cake") {
        // add score
        global.score++;
        let score = document.getElementById("score");
        score.innerText = "Aantal hits: " + global.score;

        // continue game
        renewTarget();
    }
    else { // target is bomb
        // show start button again
        let start = document.getElementById("playButton");
        start.classList.remove("hidden");

        // notify player
        alert("Game over!")
    }
}

const renewTarget = () => {
    // choose random image
    let number = Math.floor(Math.random() * global.IMAGE_COUNT);
    let label = "cake"
    if (number === 0) label = "bomb"

    // change image
    let image = document.getElementById("target");
    image.src = global.IMAGE_PATH_PREFIX + number + global.IMAGE_PATH_SUFFIX;
    image.setAttribute("data-type", label);

    // move position
    let field = document.getElementById("playField");
    let maxLeft = field.offsetWidth - global.IMAGE_SIZE;
    let maxHeight = field.offsetHeight - global.IMAGE_SIZE;

    let left = Math.floor(Math.random() * maxLeft);
    let top = Math.floor(Math.random() * maxHeight);
    image.style.left = left + "px";
    image.style.top = top + "px";

    // restart timer
    global.timeoutId = setTimeout(renewTarget, global.MOVE_DELAY);
}
