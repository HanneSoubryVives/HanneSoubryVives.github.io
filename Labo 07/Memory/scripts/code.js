let global = {
    // image
    IMAGE_PREFIX: 'images/kaart',
    IMAGE_SUFFIX: '.png',
    IMAGE_BACK: 'images/achterkant.png',
    MAX_CARD_NUMBER: 12,

    // cards & grid
    amountMatches: 6,
    amountEqualCards: 2,
    amountColumns: 4,
    amountRows: 3,

    // gameplay
    cardsTurned: [],
    matchesMade: 0,
    canInteract: true,
    timerId: 0
};

const setup = () => {
    let startBtn = document.getElementById('startButton');
    startBtn.addEventListener('click', newGame);

    let sliders = document.querySelectorAll('#settings input');
    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener('input', updateSliderValue);
        sliders[i].addEventListener('change', updateSliderValue);
    }
}
window.addEventListener("load", setup);

const createCards = () => {
    // read settings
    let matchesInput = document.getElementById('amountMatches');
    global.amountMatches = parseInt(matchesInput.value, 10);

    let text = document.getElementById("score");
    text.textContent = `Matches found: 0/${global.amountMatches}`;

    let cardsPerMatchInput = document.getElementById('cardsPerMatch');
    global.amountEqualCards = parseInt(cardsPerMatchInput.value, 10);

    let amountRows = document.getElementById('gridRows');
    global.amountRows = parseInt(amountRows.value, 10);
    global.amountColumns = Math.ceil(global.amountMatches * global.amountEqualCards / global.amountRows);

    let gallery = document.getElementById("cards");
    gallery.style.gridTemplate = `repeat(${global.amountRows}, 100px) / repeat(${global.amountColumns}, 100px)`

    // get card names
    let cardTypes = Array.from({length: global.MAX_CARD_NUMBER}, (_, i) => i + 1)
    cardTypes = shuffle(cardTypes);

    // build deck of cards
    let cards = [];
    for (let i = 1; i <= global.amountMatches; i++) {
        // for each match: pick random card
        let type = cardTypes.pop();
        for (let j = 0; j < global.amountEqualCards; j++) {
            // add this type of card "amountEqualCards" times to the deck
            cards.push(type);
        }
    }

    // shuffle deck
    cards = shuffle(cards);

    // create elements
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

const updateSliderValue = (event) => {
    event.target.previousElementSibling.textContent = event.target.value;
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

    // reset variables
    global.cardsTurned = [];
    global.matchesMade = 0;

    // create game
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
        if(global.cardsTurned.length === global.amountEqualCards){
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
    text.textContent = `Matches found: ${global.matchesMade}/${global.amountMatches}`;
}

const toggleCardColor = (cards, colorClass) => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle(colorClass);
    }
}

const checkMatch = () => {
    global.canInteract = false;

    let cards = [];
    for (let i = 0; i < global.cardsTurned.length; i++) {
        cards.push(global.cardsTurned[i].getAttribute("data-cardnr"));
    }

    let nr = cards[0];
    let match = true;
    for (let i = 1; i < cards.length; i++) {
        if(cards[i] !== nr){
            match = false;
        }
    }

    if(match){
        toggleCardColor(global.cardsTurned, "correct");
        global.timerId = setTimeout(() => {
            collectCards(global.cardsTurned);
            global.cardsTurned = [];
            global.canInteract = true;
        }, 2000);
    }
    else {
        // no match
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