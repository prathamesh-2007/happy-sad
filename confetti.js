// Confetti Animation Implementation
// A lightweight, standalone confetti effect implementation

const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Confetti particle class
class ConfettiParticle {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 8 + 5;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.color = this.getRandomColor();
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }

  getRandomColor() {
    const colors = [
      '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b',
      '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055', '#74b9ff'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    // Add gravity effect
    this.speedY += 0.1;

    // Reset if out of bounds
    if (this.y > confettiCanvas.height) {
      return false;
    }
    return true;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    
    // Draw confetti as rectangle
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
    
    ctx.restore();
  }
}

// Confetti manager
let confettiParticles = [];
let animationId = null;

function animate() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles = confettiParticles.filter(particle => {
    particle.update();
    particle.draw();
    return particle.update();
  });

  if (confettiParticles.length > 0) {
    animationId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

// Main confetti launch function
function launchConfetti(particleCount = 150) {
  // Create new particles
  for (let i = 0; i < particleCount; i++) {
    confettiParticles.push(new ConfettiParticle());
  }

  // Start animation if not already running
  if (!animationId) {
    animate();
  }
}

// Optional: Multiple bursts for extra celebration
function celebrationConfetti() {
  launchConfetti(200);
  
  setTimeout(() => launchConfetti(150), 200);
  setTimeout(() => launchConfetti(150), 400);
  setTimeout(() => launchConfetti(100), 600);
}

// Export the function for use in script.js
window.launchConfetti = launchConfetti;
window.celebrationConfetti = celebrationConfetti;
