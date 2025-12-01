// js/particles.js

// ===== Particle System Configuration =====
const PARTICLE_CONFIG = {
    count: 9,                      // Number of particles
    size: 3,                       // Particle size (small dots)
    speed: 0.2,                    // Movement speed
    alpha: 0.6,                    // Particle opacity
    color: 'rgba(114, 178, 255, 1)' // Particle color
};

// ===== Canvas Setup =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// Validation check
if (!canvas || !ctx) {
    console.warn('⚠️ Particles canvas not found or context unavailable');
}

// Particles array
let particles = [];

// ===== Initialize Canvas Size =====
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// ===== Particle Class =====
class Particle {
    constructor() {
        // Random starting position
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        // Random velocity for autonomous movement
        this.vx = (Math.random() - 0.5) * PARTICLE_CONFIG.speed;
        this.vy = (Math.random() - 0.5) * PARTICLE_CONFIG.speed;
        
        // Random phase for sine wave movement (makes it feel alive)
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        
        // Random frequency for organic movement
        this.freqX = 0.01 + Math.random() * 0.02;
        this.freqY = 0.01 + Math.random() * 0.02;
        
        this.time = 0;
    }
    
    // Update particle position (autonomous floating movement)
    update() {
        this.time += 0.02;
        
        // Add sine wave oscillation for organic floating effect
        const oscillationX = Math.sin(this.time * this.freqX + this.phaseX) * 0.5;
        const oscillationY = Math.cos(this.time * this.freqY + this.phaseY) * 0.5;
        
        // Update position with base velocity + oscillation
        this.x += this.vx + oscillationX;
        this.y += this.vy + oscillationY;
        
        // Wrap around screen edges (particles loop around)
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    
    // Draw small dot particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, PARTICLE_CONFIG.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(114, 178, 255, ${PARTICLE_CONFIG.alpha})`;
        ctx.fill();
        
        // Add subtle glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(114, 178, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
    }
}

// ===== Create Particles =====
function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
        particles.push(new Particle());
    }
}

// ===== Animation Loop =====
function animate() {
    // Clear canvas completely (no trails)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw all particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Continue animation (efficient - only runs when tab is active)
    requestAnimationFrame(animate);
}

// ===== Event Listeners =====
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
