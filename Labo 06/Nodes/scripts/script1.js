const setup = () => {
    let paragraph = document.querySelectorAll('p')[0];
    paragraph.textContent = "Good job!";
}
window.addEventListener("load", setup);