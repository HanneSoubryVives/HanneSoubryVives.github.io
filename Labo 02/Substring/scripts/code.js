const setup = () => {
    let btnSubstring = document.getElementById("btnSubstring");
    btnSubstring.addEventListener("click", substring)
}
window.addEventListener("load", setup);

const substring = () => {
    let txtInput = document.getElementById("txtInput");
    let number1Input = document.getElementById("number1Input");
    let number2Input = document.getElementById("number2Input");
    let txtOutput = document.getElementById("txtOutput");

    let text = txtInput.value;
    let number1 = number1Input.value;
    let number2 = number2Input.value;
    console.log(text);
    console.log(number1);
    console.log(number2);

    txtOutput.innerHTML = text.substring(number1, number2);
}