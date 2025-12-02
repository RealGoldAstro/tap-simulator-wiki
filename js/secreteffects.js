// js/secreteffects.js

// ===== Secret Rarity Effect Configuration =====
const SECRET_EFFECT_CONFIG = {
    "Secret I": {
        enabled: true,
        glowColor: 'rgba(255, 0, 0, 0.15)',  // Red inner glow (very low opacity)
        particles: {
            count: 15,                         // Number of particles
            size: 3,                           // Particle size in pixels
            speed: 0.5,                        // Horizontal movement speed
            alpha: 0.6,                        // Particle opacity
            color: 'rgba(255, 0, 0, 1)'       // Red particle color
        }
    }
};

// ===== Particle Class =====
class RowParticle {
    constructor(container, config, index, total) {
        this.container = container;
        this.config = config;
        
        // Get container dimensions
        const rect = container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        // Create particle element
        this.element = document.createElement('div');
        this.element.className = 'secret-particle';
        this.element.style.cssText = `
            position: absolute;
            width: ${config.size}px;
            height: ${config.size}px;
            background: ${config.color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            opacity: ${config.alpha};
            box-shadow: 0 0 8px ${config.color};
        `;
        
        // Spread particles evenly along the row horizontally
        // Divide width into segments and position each particle in its segment
        const segmentWidth = this.width / total;
        this.x = (index * segmentWidth) + (Math.random() * segmentWidth * 0.5);
        
        // Spread particles vertically across the height with random distribution
        this.y = (Math.random() * 0.6 + 0.2) * this.height; // Keep in middle 60% of height
        
        // Only horizontal movement (left to right)
        this.vx = config.speed + (Math.random() * 0.2); // Slight variation in speed
        
        // Subtle vertical oscillation for floating effect
        this.phaseY = Math.random() * Math.PI * 2;
        this.freqY = 0.01 + Math.random() * 0.01;
        this.oscillationRange = 10; // Max vertical oscillation in pixels
        
        this.time = 0;
        this.baseY = this.y; // Store base Y position
        
        // Add to container
        container.appendChild(this.element);
        
        // Update position immediately
        this.updatePosition();
    }
    
    // Update particle position
    update() {
        this.time += 0.02;
        
        // Horizontal movement (left to right)
        this.x += this.vx;
        
        // Wrap around when reaching end
        if (this.x > this.width) {
            this.x = 0;
        }
        
        // Subtle vertical oscillation for floating effect
        const oscillationY = Math.sin(this.time * this.freqY + this.phaseY) * this.oscillationRange;
        this.y = this.baseY + oscillationY;
        
        // Keep within bounds
        if (this.y < 0) this.y = 0;
        if (this.y > this.height) this.y = this.height;
        
        this.updatePosition();
    }
    
    // Update DOM element position
    updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    
    // Remove particle from DOM
    destroy() {
        if (this.element && this.element.parentElement) {
            this.element.remove();
        }
    }
}

// ===== Particle System Manager =====
class ParticleSystem {
    constructor(container, config) {
        this.container = container;
        this.config = config;
        this.particles = [];
        this.animationId = null;
        
        // Create particles spread horizontally
        for (let i = 0; i < config.count; i++) {
            this.particles.push(new RowParticle(container, config, i, config.count));
        }
        
        // Start animation
        this.animate();
    }
    
    // Animation loop
    animate() {
        // Update all particles
        this.particles.forEach(particle => particle.update());
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    // Cleanup
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles.forEach(particle => particle.destroy());
        this.particles = [];
    }
}

// ===== Apply Secret Effect to Row =====
function applySecretEffect(row, rarity) {
    const config = SECRET_EFFECT_CONFIG[rarity];
    
    if (!config || !config.enabled) {
        return;
    }
    
    row.style.position = 'relative';
    row.style.overflow = 'hidden';
    
    // Apply inner glow to row
    row.style.boxShadow = `inset 0 0 20px ${config.glowColor}, inset 0 0 40px ${config.glowColor}`;
    
    // Create effect container for particles
    const effectContainer = document.createElement('div');
    effectContainer.className = 'secret-effect-container';
    effectContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    row.appendChild(effectContainer);
    
    // Create particle system
    const particleSystem = new ParticleSystem(effectContainer, config.particles);
    
    // Store reference for cleanup if needed
    row.dataset.particleSystem = 'active';
}

// ===== Observe Pet Table and Apply Effects =====
function observeAndApplyEffects() {
    const observer = new MutationObserver(() => {
        const rows = document.querySelectorAll('.pets-table tbody tr');
        
        rows.forEach(row => {
            if (row.querySelector('.secret-effect-container')) {
                return;
            }
            
            const rarityBadge = row.querySelector('.rarity-badge');
            if (!rarityBadge) {
                return;
            }
            
            const rarity = rarityBadge.textContent.trim();
            
            if (SECRET_EFFECT_CONFIG[rarity]) {
                applySecretEffect(row, rarity);
            }
        });
    });
    
    const contentArea = document.getElementById('content');
    if (contentArea) {
        observer.observe(contentArea, {
            childList: true,
            subtree: true
        });
    } else {
        console.warn('⚠️ Content area not found for secret effects observer');
    }
}

// ===== Initialize Secret Effects System =====
(function initSecretEffects() {
    observeAndApplyEffects();
    
    setTimeout(() => {
        const rows = document.querySelectorAll('.pets-table tbody tr');
        
        rows.forEach(row => {
            if (row.querySelector('.secret-effect-container')) {
                return;
            }
            
            const rarityBadge = row.querySelector('.rarity-badge');
            if (rarityBadge) {
                const rarity = rarityBadge.textContent.trim();
                if (SECRET_EFFECT_CONFIG[rarity]) {
                    applySecretEffect(row, rarity);
                }
            }
        });
    }, 500);
})();

// js/secreteffects.js
