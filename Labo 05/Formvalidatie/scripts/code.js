const setup = () => {
    let btnValideer=document.getElementById("btnValideer");
    btnValideer.addEventListener("click", valideer);
};
window.addEventListener("load", setup);

const valideer = () => {
    let valid = [];
    valid += valideerVoornaam();
    valid += valideerFamilienaam();
    valid += valideerGeboortedatum();
    valid += valideerEmail();
    valid += valideerKinderen();
    if(!valid.includes(false)) {
        alert("Proficiat!");
    }
};

const valideerVoornaam = () => {
    let txtVoornaam = document.getElementById("txtVoornaam");
    let errVoornaam = document.getElementById("errVoornaam");
    let voornaam = txtVoornaam.value.trim();

    if(voornaam.length === 0) {
        maakError(txtVoornaam, errVoornaam, "verplicht veld");
        return false;
    }
    else if (voornaam.length > 30) {
        maakError(txtVoornaam, errVoornaam, "max. 30 karakters");
        return false;
    }
    else {
        verwijderError(txtVoornaam, errVoornaam);
        return true;
    }
};

const valideerFamilienaam = () => {
    let txtFamilienaam = document.getElementById("txtFamilienaam");
    let errFamilienaam = document.getElementById("errFamilienaam");
    let familienaam = txtFamilienaam.value.trim();

    if(familienaam.length === 0) {
        maakError(txtFamilienaam, errFamilienaam, "verplicht veld");
        return false;
    }
    else if (familienaam.length > 50) {
        maakError(txtFamilienaam, errFamilienaam, "max. 50 karakters");
        return false;
    }
    else {
        verwijderError(txtFamilienaam, errFamilienaam);
        return true;
    }
};

const valideerGeboortedatum = () => {
    let txtGeboortedatum = document.getElementById("txtGeboortedatum");
    let errGeboortedatum = document.getElementById("errGeboortedatum");
    let geboortedatum = txtGeboortedatum.value.trim();

    if(geboortedatum.length === 0) {
        maakError(txtGeboortedatum, errGeboortedatum, "verplicht veld");
        return false;
    }
    else if(geboortedatum.length !== 10) {
        maakError(txtGeboortedatum, errGeboortedatum, "formaat is niet jjjj-mm-dd");
        return false;
    }
    // must check each character
    // isNaN(tekst) will return true if any character is a digit (-> "11aa" is a number)
    else if (!isGetal(geboortedatum.substring(0, 4))
        || geboortedatum.charAt(4) !== "-" || !isGetal(geboortedatum.substring(5, 7))
        || geboortedatum.charAt(7) !== "-" || !isGetal(geboortedatum.substring(8, 10))) {
        maakError(txtGeboortedatum, errGeboortedatum, "formaat is niet jjjj-mm-dd");
        return false;
    }
    else {
        verwijderError(txtGeboortedatum, errGeboortedatum);
        return true;
    }
}

const valideerEmail = () => {
    let txtEmail = document.getElementById("txtEmail");
    let errEmail = document.getElementById("errEmail");
    let email = txtEmail.value.trim();
    let positionAt = email.indexOf("@");

    if(email.length === 0) {
        maakError(txtEmail, errEmail, "verplicht veld");
        return false;
    }
    // @ not found, first or last character
    else if (positionAt === -1 || positionAt === 0 || positionAt === email.length - 1) {
        maakError(txtEmail, errEmail, "geen geldig email adres");
        return false;
    }
    else {
        verwijderError(txtEmail, errEmail);
        return true;
    }
}

const valideerKinderen = () => {
    let txtKinderen = document.getElementById("txtKinderen");
    let errKinderen = document.getElementById("errKinderen");
    let kinderen = txtKinderen.value.trim();
    let aantal = parseInt(kinderen);

    if(!isGetal(kinderen) || aantal < 0) {
        maakError(txtKinderen, errKinderen, "is geen positief getal");
        return false;
    }
    else if(aantal > 99) {
        maakError(txtKinderen, errKinderen, "is te vruchtbaar");
        return false;
    }
    else {
        verwijderError(txtKinderen, errKinderen);
        return true;
    }
}

const maakError = (inputveld, errveld, bericht) => {
    inputveld.className = "invalid";
    errveld.innerHTML = bericht;
}

const verwijderError = (inputveld, errveld) => {
    inputveld.className = "";
    errveld.innerHTML = "";
}

const isGetal = (tekst) => {
    // must check each character
    // isNaN(tekst) will return true if any character is a digit
    // -> isNaN("11aa") says that it is a number
    for (let char of tekst) {
        if(isNaN(char)) return false;
    }
    return true;
}