const setup = () => {
    let btnKopieerConsole = document.getElementById("btnKopieerConsole");
    let btnKopieerParagraaf = document.getElementById("btnKopieerParagraaf");
    btnKopieerConsole.addEventListener("click", kopieerConsole);
    btnKopieerParagraaf.addEventListener("click", kopieerParagraaf);
}
window.addEventListener("load", setup);

const kopieerConsole = () => {
    let txtInput = document.getElementById("txtInput");
    let tekst = txtInput.value;
    console.log(tekst);
}

const kopieerParagraaf = () => {
    let txtInput = document.getElementById("txtInput");
    let txtOutput = document.getElementById("txtOutput");
    txtOutput.innerHTML = txtInput.value;
}
