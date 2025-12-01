// js/particles.js

// ===== Particle System Configuration =====
const PARTICLE_CONFIG = {
    count: 15,                    // Number of particles
    maxSize: 25,                  // Maximum particle size
    minSize: 10,                  // Minimum particle size
    smoothing: 0.1,               // Movement smoothing (lower = smoother/slower)
    glowIntensity: 0.3,           // Glow effect intensity
    baseColor: 'rgba(114, 178, 255, 0.4)'  // Particle color
};

// ===== Canvas Setup =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// Validation check
if (!canvas || !ctx) {
    console.warn('⚠️ Particles canvas not found or context unavailable');
}

// Mouse position tracking
let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

// Particles array
let particles = [];

// ===== Initialize Canvas Size =====
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// ===== Particle Class =====
class Particle {
    constructor(index) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.targetX = mouse.x;
        this.targetY = mouse.y;
        this.size = PARTICLE_CONFIG.minSize + Math.random() * (PARTICLE_CONFIG.maxSize - PARTICLE_CONFIG.minSize);
        this.delay = index * 0.05;  // Stagger effect for trailing
        this.alpha = 0.2 + Math.random() * 0.3;
    }
    
    // Update particle position (smooth following)
    update() {
        // Update target to mouse position
        this.targetX = mouse.x;
        this.targetY = mouse.y;
        
        // Smooth movement towards target with delay
        const smoothing = PARTICLE_CONFIG.smoothing * (1 - this.delay);
        this.x += (this.targetX - this.x) * smoothing;
        this.y += (this.targetY - this.y) * smoothing;
    }
    
    // Draw fuzzy ball particle
    draw() {
        // Create gradient for fuzzy glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(114, 178, 255, ${this.alpha})`);
        gradient.addColorStop(0.5, `rgba(114, 178, 255, ${this.alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(114, 178, 255, 0)');
        
        // Draw fuzzy ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

// ===== Create Particles =====
function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
        particles.push(new Particle(i));
    }
}

// ===== Animation Loop =====
function animate() {
    // Clear canvas with slight trail effect
    ctx.fillStyle = 'rgba(10, 14, 26, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw all particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Continue animation (efficient - only runs when tab is active)
    requestAnimationFrame(animate);
}

// ===== Event Listeners =====
// Track mouse movement
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();  // Recreate particles on resize
});

// ===== Initialize Particle System =====
(function initParticles() {
    if (!canvas || !ctx) {
        console.warn('⚠️ Cannot initialize particle system - canvas not available');
        return;
    }
    
    resizeCanvas();
    createParticles();
    animate();
})();

// js/particles.js
