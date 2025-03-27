let global = {
    // image
    IMAGE_PREFIX: 'images/kaart',
    IMAGE_SUFFIX: '.png',
    IMAGE_BACK: 'images/achterkant.png',

    // cards
    AMOUNT_MATCHES: 6,
    AMOUNT_COLUMNS: 4,
    AMOUNT_ROWS: 3,

    // gameplay
    cardsTurned: [],
    matchesMade: 0,
    canInteract: true,
    timerId: 0
};

const setup = () => {
    createCards();

    let startBtn = document.getElementById('startButton');
    startBtn.addEventListener('click', newGame);
}
window.addEventListener("load", setup);

const createCards = () => {
    // get card names
    let cards = [];
    for (let i = 1; i <= global.AMOUNT_MATCHES; i++) {
        cards.push(i, i);
    }

    // shuffle cards
    cards = shuffle(cards);

    // create elements
    let gallery = document.getElementById("cards");
    for (let i = 0; i < cards.length; i++) {
        let newCard = document.createElement("img");
        newCard.src = global.IMAGE_BACK;
        newCard.alt = "card";
        newCard.className = "card";
        newCard.setAttribute("data-cardnr", cards[i]);
        newCard.addEventListener("click", processCardClick)
        gallery.appendChild(newCard);
    }
}

const newGame = () => {
    // check timers from previous game
    if(!global.canInteract){
        clearTimeout(global.timerId);
    }

    // clear board
    let gallery = document.getElementById("cards");
    let cards = gallery.children;
    for (; cards.length !== 0;) {
        // card gets removed from cards list too
        // repeat until list is emtpy
        gallery.removeChild(cards[0]);
    }

    // setup new game
    global.cardsTurned = [];
    matchesMade = 0;
    createCards();
    global.canInteract = true;
}

const processCardClick = (event) => {
    if(!global.canInteract){
        return; // ignore while can not interact
    }

    let card = event.target;
    if(card.getAttribute("src") === global.IMAGE_BACK) {
        // show clicked card
        let number = card.getAttribute("data-cardnr");
        card.src = global.IMAGE_PREFIX + number + global.IMAGE_SUFFIX;

        // remember this card
        global.cardsTurned.push(card);

        // check amount turned
        if(global.cardsTurned.length === 2){
            checkMatch();
        }
    }
    // if already shown, ignore
}

const hideCards = (cards) => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].src = global.IMAGE_BACK;
    }
    toggleCardColor(cards, "wrong");
}

const collectCards = (cards) => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("hidden");
    }
    toggleCardColor(cards, "correct");
    global.matchesMade++;

    let text = document.getElementById("score");
    text.textContent = `Matches found: ${global.matchesMade}/${global.AMOUNT_MATCHES}`;
}

const toggleCardColor = (cards, colorClass) => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle(colorClass);
    }
}

const checkMatch = () => {
    global.canInteract = false;

    let cardNr = global.cardsTurned[0].getAttribute("data-cardnr");
    let cardNr2 = global.cardsTurned[1].getAttribute("data-cardnr");

    if(cardNr === cardNr2){
        // if match
        toggleCardColor(global.cardsTurned, "correct");
        global.timerId = setTimeout(() => {
            collectCards(global.cardsTurned);
            global.cardsTurned = [];
            global.canInteract = true;
        }, 2000);
    }
    else {
        // if no match
        toggleCardColor(global.cardsTurned, "wrong");
        global.timerId = setTimeout(() => {
            hideCards(global.cardsTurned);
            global.cardsTurned = [];
            global.canInteract = true;
        }, 2000);
    }
}

const shuffle = (array) => {
    // loop through array
    for (let i = 0; i < array.length; i++) {
        // pick random new position for this element
        let randomIndex = Math.floor(Math.random() * array.length);
        // swap places
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
}