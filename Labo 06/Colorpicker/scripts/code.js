const setup = () => {
	// update if any slider changes
	let sliders = document.getElementsByClassName("slider");
	for (let i=0; i<sliders.length; i++) {
		sliders[i].addEventListener("change", updateColor);
		sliders[i].addEventListener("input", updateColor);
	}

	// apply initial settings
	updateColor();

	// set save button
	let save = document.getElementById("btnSave");
	save.addEventListener("click", saveColor)
}
window.addEventListener("load", setup);

const readSliders = () => {
	let redSlider = document.getElementById("sliderRed");
	let greenSlider = document.getElementById("sliderGreen");
	let blueSlider = document.getElementById("sliderBlue");

	return [redSlider.value, greenSlider.value, blueSlider.value];
}

const writeSliders = (rgb = [0, 0, 0]) => {
	let redSlider = document.getElementById("sliderRed");
	let greenSlider = document.getElementById("sliderGreen");
	let blueSlider = document.getElementById("sliderBlue");

	redSlider.value = rgb[0];
	greenSlider.value = rgb[1];
	blueSlider.value = rgb[2];
}

const updateColor = () => {
	// read sliders
	let rgb = readSliders();

	// update labels
	let redValueText = document.getElementById("textRedValue");
	let greenValueText = document.getElementById("textGreenValue");
	let blueValueText = document.getElementById("textBlueValue");

	redValueText.textContent = rgb[0];
	greenValueText.textContent = rgb[1];
	blueValueText.textContent = rgb[2];

	// apply to color box
	let displayBox=document.getElementById("displayColor");
	displayBox.style.backgroundColor= "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
}

const saveColor = () => {
	// create swatch
	let swatchbox = document.createElement("div");
	swatchbox.className = "colorSwatch";

	// set color
	let color = readSliders();
	swatchbox.style.backgroundColor= "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";

	// create remove button
	let removeBtn = document.createElement("button");
	removeBtn.className = "removeSwatch";
	removeBtn.textContent = "X";

	// create click events
	swatchbox.addEventListener("click", (event) => {
		if(event.target === event.currentTarget) // avoid to trigger when overlapping remove button is clicked
		{
			writeSliders(color);
			updateColor();
			return false; // stop other functions from this button
		}
	});
	removeBtn.addEventListener("click",  (event) => {
		if(event.target === event.currentTarget) {
			swatchbox.remove();
			return false;
		}
	});

	// link to DOM tree
	let gallery = document.getElementById("gallery");
	gallery.appendChild(swatchbox);
	swatchbox.appendChild(removeBtn);
}


