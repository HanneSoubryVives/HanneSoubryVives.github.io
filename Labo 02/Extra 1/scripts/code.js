const setup = () => {
    let inputLimiet = document.getElementById("inputLimit");
    inputLimiet.addEventListener( "change", somVeelvouden);
}
window.addEventListener("load", setup);

const somVeelvouden = () => {
    let txtOutput = document.getElementById("txtOutput");

    // check limiet
    let inputLimiet = document.getElementById("inputLimit");
    let limiet = parseInt(inputLimiet.value, 10);
    console.log("limiet is " + limiet);
    if(limiet <= 0){
        txtOutput.innerHTML= "Limiet moet een positief getal zijn"
        return;
    }

    let som = 0;
    for(let number = 1; number <= limiet; number++) {
        if(number % 3 === 0 || number % 5 === 0) {
            som += number;
            console.log(number);
        }
    }

    txtOutput.innerHTML = som.toString();
}

// Als we alle natuurlijke getallen kleiner dan 10 die een veelvoud zijn van 3 of 5 nemen,
// krijgen we 3, 5, 6 en 9. De som van deze veelvouden is 23.
// Vind de som van alle veelvouden van 3 en 5 kleiner dan 1000.