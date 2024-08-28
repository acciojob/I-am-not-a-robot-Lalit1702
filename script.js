//your code here
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedImages = [];
let identicalImageClass = '';

function shuffleImages() {
  const imagesContainer = document.getElementById('images-container');
  imagesContainer.innerHTML = '';

  // Choose a random image to repeat
  identicalImageClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  
  // Create a new array with a duplicate image
  const images = [...imageClasses];
  images.push(identicalImageClass);
  
  // Shuffle the array
  images.sort(() => 0.5 - Math.random());
  
  // Render images
  images.forEach((imageClass, index) => {
    const img = document.createElement('img');
    img.classList.add(imageClass);
    img.onclick = () => selectImage(img, imageClass);
    imagesContainer.appendChild(img);
  });
}

function selectImage(img, imageClass) {
  // Check if the image is already selected
  if (selectedImages.includes(img)) return;
  
  // Add selected class to the image
  img.classList.add('selected');
  
  // Add to selectedImages array
  selectedImages.push({ img, imageClass });

  // Show reset button when at least one image is clicked
  if (selectedImages.length > 0) {
    document.getElementById('reset').style.display = 'inline';
  }

  // Show verify button if two images are selected
  if (selectedImages.length === 2) {
    document.getElementById('verify').style.display = 'inline';
  } else {
    document.getElementById('verify').style.display = 'none';
  }
}

function verify() {
  const [first, second] = selectedImages;
  
  // Check if the selected images are identical
  if (first.imageClass === second.imageClass) {
    document.getElementById('para').innerHTML = "You are a human. Congratulations!";
  } else {
    document.getElementById('para').innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Hide the verify button after checking
  document.getElementById('verify').style.display = 'none';
}

function resetGame() {
  // Clear selected images
  selectedImages.forEach(({ img }) => img.classList.remove('selected'));
  selectedImages = [];

  // Hide reset and verify buttons
  document.getElementById('reset').style.display = 'none';
  document.getElementById('verify').style.display = 'none';
  
  // Clear the message
  document.getElementById('para').innerHTML = '';

  // Shuffle and render new images
  shuffleImages();
}

// Initialize the game on page load
window.onload = shuffleImages;
