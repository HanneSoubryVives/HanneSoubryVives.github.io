const setup = () => {
    askCities();
}
window.addEventListener("load", setup);

const askCities = () => {
    // gemeenten vragen
    let options = [];

    while(true) {
        let input = prompt("Gemeente:");
        if (input.localeCompare('stop') !== 0) options.push(input);
        else break;
    }

    // sort
    // without sort function -> sort on ascii value -> capitals before lower case
    options.sort(compareText);

    // get html object
    let dropdown = document.getElementById("cities");
    for (let i = 0; i < options.length; i++) {
        dropdown.innerHTML += `\n<option value="${options[i]}">${options[i]}</option>`;
    }
}

const compareText = (a, b) => {
    return a.localeCompare(b);
}