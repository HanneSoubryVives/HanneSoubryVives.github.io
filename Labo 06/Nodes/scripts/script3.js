const setup = () => {
    let div = document.querySelector('div');
    let p = document.createElement("p");
    p.textContent = "appended element";
    div.appendChild(p);
}
window.addEventListener("load", setup);