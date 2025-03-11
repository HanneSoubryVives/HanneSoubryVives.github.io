const setup = () => {
    let text = "Gisteren zat de jongen op de stoep en at de helft van de appel";
    printReplace(text);
}
window.addEventListener("load", setup);

const printReplace = (text) => {
    // do not use split or replace(all)
    let output = ''
    let start = 0;
    let nextSpace = text.indexOf(' ', start);

    while(nextSpace !== -1) {
        let nextWord = text.slice(start, nextSpace);
        if(nextWord.localeCompare('de') === 0) output += 'het';
        else output += nextWord;

        start = nextSpace + 1;
        nextSpace = text.indexOf(' ', start);
        output += ' '
    }

    let nextWord = text.slice(start);
    if(nextWord.localeCompare('de') === 0) output += 'het';
    else output += nextWord;

    console.log(output);
}