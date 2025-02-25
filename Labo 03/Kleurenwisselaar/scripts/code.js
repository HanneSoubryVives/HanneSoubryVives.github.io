const setup = () => {
    let buttons = document.getElementsByClassName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => switchColor(e.target))
    }
}
window.addEventListener("load", setup);

const switchColor = (target) => {
    target.classList.toggle("blueButton");
}