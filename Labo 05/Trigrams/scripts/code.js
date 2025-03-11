const setup = () => {
    let text = "onoorbaar";
    findTrigrams(text);
}
window.addEventListener("load", setup);

const findTrigrams = text => {
    // laatste 2 stukken zullen geen 3 characters meer bevatten
    for (let i = 0; i < text.length - 2; i++) {
        console.log(text.slice(i, i + 3));
    }
}