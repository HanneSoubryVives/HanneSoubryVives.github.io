let global = {
    personen: [],
    currentFormId: -1
};

// Bewaar de wijzigingen die in de user interface werden aangebracht
const bewaarBewerktePersoon = () => {
    if(valideer()) {
        let lijst = document.getElementById("lstPersonen");

        if(global.currentFormId === -1) {
            // een nieuw aangemaakte persoon voegen we toe
            global.currentFormId = global.personen.length;
            global.personen.push(leesPersoon());

            // toevoegen aan lijst
            lijst.appendChild(document.createElement("option"));
            lijst.selectedIndex = global.currentFormId;
        }
        else {
            // een bestaande persoon in de lijst overschrijven
            global.personen[global.currentFormId] = leesPersoon();
        }

        // lijst updaten
        let option = lijst.children[global.currentFormId];
        option.setAttribute("value", JSON.stringify(global.personen[global.currentFormId]));
        option.textContent = global.personen[global.currentFormId].voornaam + " "
            + global.personen[global.currentFormId].familienaam;
    }
};

const leesPersoon = () => {
    let voornaam = document.getElementById("txtVoornaam");
    let familienaam = document.getElementById("txtFamilienaam");
    let geboorteDatum = document.getElementById("txtGeboorteDatum");
    let email = document.getElementById("txtEmail");
    let kinderen = document.getElementById("txtAantalKinderen");

    return {
        voornaam: voornaam.value,
        familienaam: familienaam.value,
        geboorteDatum: new Date(geboorteDatum.value),
        email: email.value,
        kinderen: parseInt(kinderen.value, 10)
    };
}

const schrijfPersoon = () => {
    let voornaam = document.getElementById("txtVoornaam");
    let familienaam = document.getElementById("txtFamilienaam");
    let geboorteDatum = document.getElementById("txtGeboorteDatum");
    let email = document.getElementById("txtEmail");
    let kinderen = document.getElementById("txtAantalKinderen");

    let persoon = global.personen[global.currentFormId];

    voornaam.value = persoon.voornaam;
    familienaam.value = persoon.familienaam;
    geboorteDatum.value = persoon.geboorteDatum.toLocaleDateString();
    email.value = persoon.email;
    kinderen.value = persoon.kinderen;
}

const bewerkNieuwePersoon = () => {
    let voornaam = document.getElementById("txtVoornaam");
    let familienaam = document.getElementById("txtFamilienaam");
    let geboorteDatum = document.getElementById("txtGeboorteDatum");
    let email = document.getElementById("txtEmail");
    let kinderen = document.getElementById("txtAantalKinderen");

    voornaam.value = "";
    familienaam.value = "";
    geboorteDatum.value = "";
    email.value = "";
    kinderen.value = "";

    global.currentFormId = -1;

    let lijst = document.getElementById("lstPersonen");
    lijst.selectedIndex = -1;
};

const checkSelection = () => {
    let lijst = document.getElementById("lstPersonen");
    global.currentFormId = lijst.selectedIndex;
    schrijfPersoon();
}


// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.addEventListener("click", checkSelection);
};

window.addEventListener("load", setup);