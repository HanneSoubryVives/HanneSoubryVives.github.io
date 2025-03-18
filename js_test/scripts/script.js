const setup = () => {
    let choice = document.getElementById("choice");
    choice.addEventListener("change", update);
    choice.addEventListener("input", update);

    let input = document.getElementById("letter");
    input.addEventListener("change", update);
    input.addEventListener("input", update);
}
window.addEventListener("load", setup);

const update = () => {
    let image = document.getElementById("img");
    let note = document.getElementById("note");
    let choice = document.getElementById("choice");
    let letterText = document.getElementById("letterText");

    if(choice.selectedIndex === 0) {
        image.className = "hidden";
        note.textContent = "";
        letterText.textContent = "";
    }
    else {
        if(choice.selectedIndex === 1) { // with egg
            image.className = "with-egg";
            note.textContent = "Hierboven, een kip met een ei";
        }
        else { //without egg
            image.className = "";
            note.textContent = "Hierboven, een kip zonder een ei";
        }

        let input = document.getElementById("letter");
        let letter = input.value.toLowerCase();
        let search = note.textContent.toLowerCase();

        if(letter !== ""){
            let count = 0;
            let index = 0;
            do {
                index = search.indexOf(letter, index);
                if(index !== -1) {
                    count++;
                    index++; // search 1 char further next loop
                }
            } while (index !== -1)
            letterText.textContent = `Letter "${input.value}" komt ${count} keer voor in bovenstaande zin.`
        }
        else letterText.textContent = "";
    }
}