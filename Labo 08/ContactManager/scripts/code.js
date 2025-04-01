let global = {
    personen: [],
    nextId: 0,
    currentFormId: -1
};

// Bewaar de wijzigingen die in de user interface werden aangebracht
const bewaarBewerktePersoon = () => {
    if(valideer()) {
        let lijst = document.getElementById("lstPersonen");
        let index = global.personen.findIndex((element) => element.id === global.currentFormId);

        if(global.currentFormId === -1) {
            // een nieuw aangemaakte persoon voegen we toe
            global.currentFormId = global.nextId;
            global.nextId++;
            global.personen.push(formNaarPersoon());
        }
        else {
            // een bestaande persoon in de lijst overschrijven
            global.personen[index] = formNaarPersoon();
        }

        // sorteer lijst
        global.personen.sort((a, b) => {
            return (a.voornaam + " " + a.familienaam).toLowerCase().localeCompare((b.voornaam + " " + b.familienaam).toLowerCase())
        });
        lijst.innerHTML = "";   // remove all children
        for(let i = 0; i < global.personen.length; i++) {
            let option = lijst.appendChild(document.createElement("option"));
            option.value = global.personen[i].id;
            option.textContent = global.personen[i].voornaam + " " + global.personen[i].familienaam;
        }

        index = global.personen.findIndex((element) => element.id === global.currentFormId);
        lijst.selectedIndex = index;
    }
};

const formNaarPersoon = () => {
    // read from form
    let voornaam = document.getElementById("txtVoornaam");
    let familienaam = document.getElementById("txtFamilienaam");
    let geboorteDatum = document.getElementById("txtGeboorteDatum");
    let email = document.getElementById("txtEmail");
    let kinderen = document.getElementById("txtAantalKinderen");

    // write into person object
    return {
        voornaam: voornaam.value,
        familienaam: familienaam.value,
        geboorteDatum: new Date(geboorteDatum.value),
        email: email.value,
        kinderen: parseInt(kinderen.value, 10),
        id: global.currentFormId
    };
}

const nieuwePersoon = () => {
    // get form fields
    let voornaam = document.getElementById("txtVoornaam");
    let familienaam = document.getElementById("txtFamilienaam");
    let geboorteDatum = document.getElementById("txtGeboorteDatum");
    let email = document.getElementById("txtEmail");
    let kinderen = document.getElementById("txtAantalKinderen");

    // reset fields
    voornaam.value = "";
    familienaam.value = "";
    geboorteDatum.value = "";
    email.value = "";
    kinderen.value = "";

    global.currentFormId = -1;

    // deselect
    let lijst = document.getElementById("lstPersonen");
    lijst.selectedIndex = -1;
};

const checkSelection = () => {
    // read selected id
    let lijst = document.getElementById("lstPersonen");
    let id = parseInt(lijst.options[lijst.selectedIndex].value, 10);
    global.currentFormId = id;

    // find person with this id
    let index = global.personen.findIndex((element) => element.id === id);
    let persoon = global.personen[index];

    // get form fields
    let voornaam = document.getElementById("txtVoornaam");
    let familienaam = document.getElementById("txtFamilienaam");
    let geboorteDatum = document.getElementById("txtGeboorteDatum");
    let email = document.getElementById("txtEmail");
    let kinderen = document.getElementById("txtAantalKinderen");

    // update form fields
    voornaam.value = persoon.voornaam;
    familienaam.value = persoon.familienaam;
    geboorteDatum.value = persoon.geboorteDatum.toLocaleDateString();
    email.value = persoon.email;
    kinderen.value = persoon.kinderen;
}

const verwijder = () => {
    if(global.currentFormId !== -1) {
        // if existing person is selected
        // remove data
        let index = global.personen.findIndex((element) => element.id === global.currentFormId);
        global.personen.splice(index);

        // remove from list
        let lijst = document.getElementById("lstPersonen");
        let option = lijst.children[index];
        lijst.removeChild(option);

        // reset form
        nieuwePersoon();
    }
}

// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", nieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.addEventListener("click", checkSelection);

    let btnVerwijder = document.getElementById("btnVerwijder");
    btnVerwijder.addEventListener("click", verwijder);
};

window.addEventListener("load", setup);