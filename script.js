const fileInput = document.getElementById('fileInput');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const resizeButton = document.getElementById('resizeButton');
const downloadLink = document.getElementById('downloadLink');
const imagePreview = document.getElementById('imagePreview');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const DPI = 96; // pixels per inch

function resizeImage() {
	// Get the uploaded image file
	const file = fileInput.files[0];
	if (!file) return;

	// Load the image into an <img> element for preview
	const reader = new FileReader();
	reader.onload = function(event) {
		imagePreview.src = event.target.result;
	}
	reader.readAsDataURL(file);
    
	// Load the image into a canvas for resizing
	const img = new Image();
	img.onload = function() {
		// Set the canvas dimensions to the desired size
		// canvas.width = widthInput.value;
		// canvas.height = heightInput.value;

		// Convert cm to pixels based on DPI
		const widthInPx = widthInput.value * DPI / 2.54;
		const heightInPx = heightInput.value * DPI / 2.54;

		// Set the canvas dimensions to the desired size
		canvas.width = widthInPx;
		canvas.height = heightInPx;

		// Draw the image onto the canvas at the new size
		ctx.drawImage(img, 0, 0, widthInPx, heightInPx);

		// Export the resized image as a data URL and update the preview
		const resizedImage = canvas.toDataURL('image/jpg', 0.9);
		imagePreview.src = resizedImage;

		// Update the download link with the data URL of the resized image
		downloadLink.href = resizedImage;
		downloadLink.download = 'resized.jpg';
		downloadLink.innerHTML = 'Download';
	}
	img.src = URL.createObjectURL(file);
}

resizeButton.addEventListener('click', resizeImage);