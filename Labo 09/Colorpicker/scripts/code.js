/* SETUP */
let global = {
	swatches: []
}

const setup = () => {
	// update if any slider changes
	let sliders = document.getElementsByClassName("slider");
	for (let i=0; i<sliders.length; i++) {
		sliders[i].addEventListener("change", updateColor);
		sliders[i].addEventListener("input", updateColor);
	}

	// apply initial settings
	updateColor();
	readStorage();

	// set save button
	let save = document.getElementById("btnSave");
	save.addEventListener("click", newSwatch)
}
window.addEventListener("load", setup);

/* READ VALUES */
const readSliders = () => {
	let redSlider = document.getElementById("sliderRed");
	let greenSlider = document.getElementById("sliderGreen");
	let blueSlider = document.getElementById("sliderBlue");

	return [parseInt(redSlider.value, 10), parseInt(greenSlider.value, 10), parseInt(blueSlider.value, 10)];
}

const readSwatch = (swatchElement) => {
	let color = swatchElement.getAttribute("data-color").split(",");
	return [parseInt(color[0], 10), parseInt(color[1], 10), parseInt(color[2], 10)];
}

const readStorage = () => {
	let storedValues = localStorage.getItem("colorpicker.swatches");
	if(storedValues !== null) {
		global.swatches = JSON.parse();
		for (let i = 0; i < global.swatches.length; i++) {
			createSwatch(global.swatches[i]);
		}
	}
}

/* WRITE VALUES */
const writeSliders = (r, g, b) => {
	let redSlider = document.getElementById("sliderRed");
	let greenSlider = document.getElementById("sliderGreen");
	let blueSlider = document.getElementById("sliderBlue");

	redSlider.value = r;
	greenSlider.value = g;
	blueSlider.value = b;
}

const writeSwatchToStorage = () => {
	global.swatches.push(readSliders());
	localStorage.setItem("colorpicker.swatches", JSON.stringify(global.swatches));
}

/* CREATE */
const newSwatch = () => {
	createSwatch();
	writeSwatchToStorage();
}

const createSwatch = (color = readSliders()) => {
	// create swatch
	let swatchbox = document.createElement("div");
	swatchbox.className = "colorSwatch";

	// set color
	swatchbox.style.backgroundColor= "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
	swatchbox.setAttribute("data-color", color[0] + "," + color[1] + "," + color[2])

	// create remove button
	let removeBtn = document.createElement("button");
	removeBtn.className = "removeSwatch";
	removeBtn.textContent = "X";

	// link click events
	swatchbox.addEventListener("click", setColor);
	removeBtn.addEventListener("click",  removeSwatch);

	// link to DOM tree
	let gallery = document.getElementById("gallery");
	gallery.appendChild(swatchbox);
	swatchbox.appendChild(removeBtn);
}

/* UPDATE */
const updateColor = () => {
	// read sliders
	let rgb = readSliders();

	// update labels
	let redValueText = document.getElementById("textRedValue");
	let greenValueText = document.getElementById("textGreenValue");
	let blueValueText = document.getElementById("textBlueValue");

	redValueText.textContent = rgb[0].toString();
	greenValueText.textContent = rgb[1].toString();
	blueValueText.textContent = rgb[2].toString();

	// apply to color box
	let displayBox=document.getElementById("displayColor");
	displayBox.style.backgroundColor= "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
}

const setColor = (event) => {
	if(event.target === event.currentTarget) // avoid to trigger when the overlapping remove button is clicked
	{
		let color = readSwatch(event.target);
		writeSliders(color[0], color[1], color[2]);
		updateColor();
		return false; // stop propagation
	}
}

/* REMOVE */
const removeSwatch = (event) => {
	// target is remove button
	// parent is swatch box
	removeSwatchFromStorage(readSwatch(event.target.parentElement));
	event.target.parentElement.remove();

	return false; // stop propagation
}

const removeSwatchFromStorage = (color) => {
	// compare toSting values -> look at content, not reference of array
	let index = global.swatches.findIndex((element) => element.toString() === color.toString());
	if(index !== -1)
	{
		global.swatches.splice(index, 1);
		localStorage.setItem("colorpicker.swatches", JSON.stringify(global.swatches));
	}
}


