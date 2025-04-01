const setup = () => {
    calculateDates();
}
window.addEventListener("load", setup);

const calculateDates = () => {
    // my birth date
    let birthDate = new Date(2003, 8, 14);

    // current date
    let now = new Date();

    // difference
    let difference = now - birthDate; // timestamp in milliseconds
    difference = Math.floor(difference / 1000 / 60 / 60 / 24); // 1000 ms per seconde -> 60 seconden per minuut...
    console.log(`I am ${difference} days old!`);

}