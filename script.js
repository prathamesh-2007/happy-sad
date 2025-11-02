// Get DOM elements
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const imageDisplay = document.getElementById('imageDisplay');
const mainQuestion = document.getElementById('mainQuestion');
const responseButtons = document.getElementById('responseButtons');

// Track state
let noClickCount = 0;
let buttonHeight = 48; // Starting height in pixels
let buttonWidth = 150; // Increased initial width for longer text
let fontSize = 18; // Starting font size in pixels

// Image paths array
const imagePaths = [
  "./images/image1.gif",
  "./images/image2.gif",
  "./images/image3.gif",
  "./images/image4.gif",
  "./images/image5.gif",
  "./images/image6.gif",
  "./images/image7.gif"
];

// Button text progression
const noButtonTexts = [
  "Haan, main roothi hui hoon.",
  "Magar kyun??",
  "Maan jao na.",
  "Aisa mat karo mere saath(",
  "Tum mera dil tod rahe ho.",
  "Chalo fir katti!!!!"
];

// No button click handler
noButton.addEventListener('click', function() {
  if (noClickCount < 5) {
    noClickCount++;
    
    // Change image
    imageDisplay.src = imagePaths[noClickCount];
    
    // Increase Yes button size more gradually
    buttonHeight += 25;
    buttonWidth += 40;
    fontSize += 8;
    
    // Calculate padding based on font size to maintain proportions
    const paddingValue = Math.max(1, fontSize / 12);
    
    yesButton.style.height = 'auto';
    yesButton.style.minHeight = `${buttonHeight}px`;
    yesButton.style.width = 'auto';
    yesButton.style.minWidth = `${buttonWidth}px`;
    yesButton.style.maxWidth = '90vw';
    yesButton.style.fontSize = `${fontSize}px`;
    yesButton.style.padding = `${paddingValue}rem ${paddingValue * 1.5}rem`;
    yesButton.style.whiteSpace = 'normal';
    yesButton.style.wordWrap = 'break-word';
    yesButton.style.overflow = 'visible';
    yesButton.style.lineHeight = '1.4';
    yesButton.style.display = 'flex';
    yesButton.style.alignItems = 'center';
    yesButton.style.justifyContent = 'center';
    yesButton.style.textAlign = 'center';
    
    // Update No button text
    if (noClickCount < 6) {
      noButton.textContent = noButtonTexts[noClickCount];
    }
  }
});

// Yes button click handler
yesButton.addEventListener('click', () => {
  // Change to final image
  imageDisplay.src = './images/image7.gif';
  
  // Update question text
  mainQuestion.textContent = "Toh phir main aapko call kar sakta hoon ya nahi? Yeh aap mujhe WhatsApp par yes or no bhej do.";
  
  // Hide buttons
  responseButtons.style.display = 'none';
  
  // Trigger confetti animation
  launchConfetti();
});
