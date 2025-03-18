const setup = () => {
    updatePage();
}
window.addEventListener("load", setup);

const updatePage = () => {
    // list items
    let items = document.querySelectorAll('li');
    for (let i = 0; i < items.length; i++) {
        items[i].className = "listitem";
    }

    // picture
    let image = document.createElement("img");
    image.setAttribute("src", "images/me.png");
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(image);
}