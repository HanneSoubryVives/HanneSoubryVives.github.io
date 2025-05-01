// GLOBAL INFO
let global = {
    URL_PREFIX: 'https://',
    COMMANDS: {
        g: { name: 'Google Chrome',
             url: 'www.google.com/search?q=',
             color: '#4285f4'},
        y: { name: 'YouTube',
            url: 'www.youtube.com/results?search_query=',
            color: '#ff0000'},
        x: { name: 'Twitter',
            url: 'x.com/hashtag/',
            color: '#1da1f2'},
        i: { name: 'Instagram',
            url: 'www.instagram.com/explore/tags/',
            color: '#c32aa3'},
    },

    history: []
}

// SETUP
const setup = () => {
    document.getElementById("btnGo").addEventListener("click", processNewCommand);
    readStorage();
}
window.addEventListener("load", setup);

// BUTTONS
const processNewCommand = () => {
    let inputField = document.getElementById("searchQuery");
    let input = inputField.value;

    // check required
    if(input[0] !== "/") {
        alert("Invalid command");
        return;
    }

    // check command
    if(global.COMMANDS[input[1]] === undefined) {
        alert("Unknown command prefix");
        return;
    }

    // check parameters
    if(input.length < 4 || input[2] !== " ") {
        alert("No search value");
        return;
    }

    // save
    let search = {
        prefix: input[1],
        value: input.slice(3)
    };
    global.history.push(search);
    localStorage.setItem("history", JSON.stringify(global.history));

    // create card
    newSearch(search, true);

    // empty search bar
    inputField.value = "";
}

const newSearch = (search, openLink) => {
    // find correct command
    let command = global.COMMANDS[search.prefix];

    // create url
    let url = global.URL_PREFIX + command.url + search.value;

    // open url
    if (openLink) {
        window.open(url, "_blank");
    }

    // create card object
    let cardBase = document.createElement("div");
    cardBase.className = "card";
    cardBase.style.backgroundColor = command.color;

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBase.appendChild(cardBody);

    // create card content
    let title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = command.name;
    cardBody.appendChild(title);

    let text = document.createElement("p");
    text.className = "card-text";
    text.textContent = search.value;
    cardBody.appendChild(text);

    let link = document.createElement("a");
    link.className = "btn btn-dark";
    link.textContent = "GO!";
    link.href = url;
    link.target = "_blank";
    cardBody.appendChild(link);

    // add to DOM
    let gallery = document.getElementById("galleryCards");
    gallery.appendChild(cardBase);
}

const readStorage = () => {
    // load stored values
    let history = localStorage.getItem("history");

    // make cards
    if(history !== null) {
        global.history = JSON.parse(history);
        for (let i = 0; i < global.history.length; i++) {
            newSearch(global.history[i], false);
        }
    }
}