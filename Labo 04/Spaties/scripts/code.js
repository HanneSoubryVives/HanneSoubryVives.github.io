const setup = () => {
    let btn = document.getElementById("processInput");
    btn.addEventListener("click", processInput)
}
window.addEventListener("load", setup);

const processInput = () => {
    let input = document.getElementById("input").value;
    console.log(maakMetSpaties(input));
}

const maakMetSpaties = (inputText) => {
    let result = "";

    for (let i = 0; i < inputText.length; i++) {
        let char = inputText.charAt(i);
        if(char !== " "){
            result += char + " ";
        }
        else result += " "; // do not double spaces
    }

    return result;
}