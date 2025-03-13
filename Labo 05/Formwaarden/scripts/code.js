const setup = () => {
    document.getElementById("btnShowResult").addEventListener("click", showResult);
}
window.addEventListener("load", setup);

const showResult = () => {
    let smoker = document.getElementById("smoker");
    if(smoker.checked) console.log("is roker")
    else console.log("is geen roker");

    let languages = document.getElementsByName("language");
    for (let language of languages) {
        if(language.checked) {
            console.log("moedertaal is " + language.value);
            break;
        }
    }

    let country = document.getElementById("country");
    console.log("favoriete buurland is " + country.value);

    let order = document.getElementById("order");
    let orderText = "bestelling bestaat uit "
    let orderedSomething = false;
    for (let orderline of order.options) {
        if(orderline.selected) {
            orderText += orderline.value + " ";
            orderedSomething = true;
        }
    }
    if(orderedSomething) console.log(orderText);
    else console.log("niets besteld");

}