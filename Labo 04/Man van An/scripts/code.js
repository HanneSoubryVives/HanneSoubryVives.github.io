const setup = () => {
    findAnWithIndex();
    findAnWithLastIndex();
}
window.addEventListener("load", setup);

let text = "De man van An geeft geen hand aan ambetante verwanten";
let substring = "an"

const findAnWithIndex = () => {
    let result = 0;
    let output = `The substring ${substring} was found on these indices:`;
    do {
        result = text.indexOf(substring, result);
        if(result !== -1) {
            output += " " + result;
            result++; // search 1 char further next loop
        }
    } while (result !== -1)
    console.log(output);
}

const findAnWithLastIndex = () => {
    let result = text.length - 1;
    let output = `The substring ${substring} was found on these indices:`;
    do {
        result = text.lastIndexOf(substring, result);
        if(result !== -1) {
            output += " " + result;
            result--; // search 1 char further next loop
        }
    } while (result !== -1)
    console.log(output);
}