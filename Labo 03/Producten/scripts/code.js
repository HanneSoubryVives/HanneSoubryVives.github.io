const setup = () => {
    let button = document.getElementById('calculate');
    button.addEventListener('click', (e) => calculate())
}
window.addEventListener("load", setup);

const calculate = () => {
    // find table and go to tbody element
    let table = document.getElementsByClassName('products')[0];
    let tbody = table.getElementsByTagName('tbody')[0];
    let totalPrice = 0;

    // calculate price per product
    for (let i=0;i<tbody.children.length;i++) {
        let tr = tbody.children[i];
        let amount = tr.getElementsByClassName('amount')[0].value;
        let productPrice = parseFloat(tr.getElementsByClassName('price')[0].textContent);
        let btw = parseFloat(tr.getElementsByClassName('btw')[0].textContent);
        let total = tr.getElementsByClassName('total')[0];

        btw = btw / 100.0 + 1; // +5% -> 1.05 * price
        let price = amount * productPrice * btw;
        total.textContent = price.toFixed(2) + " Eur";

        totalPrice += price;
    }

    // display total price
    let tfoot = table.getElementsByTagName('tfoot')[0];
    let output = tfoot.children[0].getElementsByClassName('total')[0];
    output.textContent = totalPrice.toFixed(2) + " Eur";
}