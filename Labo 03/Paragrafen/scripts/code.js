const setup = () => {
    markeerBelangrijkeParagrafen();
}
window.addEventListener("load", setup);

const markeerBelangrijkeParagrafen = () => {
    let belangrijkeParagrafen = document.getElementsByClassName('belangrijk');
    for (let i=0;i<belangrijkeParagrafen.length;i++) {
        belangrijkeParagrafen[i].classList.add('opvallend');
    }
}