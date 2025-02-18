const setup = () => {
	// update if any slider changes
	let sliders = document.getElementsByClassName("slider");
	for (let i=0; i<sliders.length; i++) {
		sliders[i].addEventListener("change", updateColor);
		sliders[i].addEventListener("input", updateColor);
	}

	// apply initial settings
	updateColor();
}

const updateColor = () => {
	//find sliders
	let redSlider = document.getElementById("sliderRed");
	let greenSlider = document.getElementById("sliderGreen");
	let blueSlider = document.getElementById("sliderBlue");

	// display text
	let redValueText = document.getElementById("textRedValue");
	let greenValueText = document.getElementById("textGreenValue");
	let blueValueText = document.getElementById("textBlueValue");

	redValueText.textContent = redSlider.value;
	greenValueText.textContent = greenSlider.value;
	blueValueText.textContent = blueSlider.value;

	// apply to all color boxes
	let displayBoxes=document.getElementsByClassName("displayColor");

	for (let i=0; i<displayBoxes.length; i++) {
		displayBoxes[i].style.backgroundColor= "rgb(" + redSlider.value + "," + greenSlider.value + "," + blueSlider.value + ")";
	}

}

window.addEventListener("load", setup);