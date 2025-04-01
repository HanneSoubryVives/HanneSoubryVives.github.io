const setup = () => {
    // create object
    let student1= {
        voornaam : "Jan",
        familienaam : "Janssens",
        geboorteDatum : new Date("1993-12-31"),
        adres : {
            straat : "Kerkstraat 13",
            postcode : "8500",
            gemeente : "Kortrijk"
        },
        isIngeschreven : true,
        namenVanExen : ["Sofie", "Berta", "Philip", "Albertoooo"],
        aantalAutos : 2
    }

    // to JSON
    let json = JSON.stringify(student1);
    console.log(json);

    // back to object
    let student2 = JSON.parse(json);
    console.log(student2);
}
window.addEventListener("load", setup);
