// js/secreteffects.js

// ===== Secret Rarity Effect Configuration =====
const SECRET_EFFECT_CONFIG = {
    "Secret I": {
        enabled: true,
        glowColor: 'rgba(255, 0, 0, 0.15)',  // Red inner glow (very low opacity)
        particles: {
            count: 10,                         // Number of particles
            size: 2,                           // Particle size in pixels
            speed: 0.4,                        // Movement speed multiplier
            alpha: 0.6,                        // Particle opacity
            color: 'rgba(255, 0, 0, 1)'       // Red particle color
        }
    },
    "Secret II": {
        enabled: true,
        glowColor: 'rgba(255, 255, 255, 0.15)',  // White inner glow (very low opacity)
        particles: {
            count: 10,                             // Number of particles
            size: 2,                               // Particle size in pixels
            speed: 0.4,                            // Movement speed multiplier
            alpha: 0.6,                            // Particle opacity
            color: 'rgba(255, 255, 255, 1)'       // White particle color
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
        
        // Spread particles evenly across row initially
        const segmentWidth = this.width / total;
        this.x = (index * segmentWidth) + (Math.random() * segmentWidth);
        this.y = (Math.random() * 0.7 + 0.15) * this.height; // Middle 70% of height
        
        // Random velocity in ALL directions (not just horizontal)
        this.vx = (Math.random() - 0.5) * config.speed * 2;
        this.vy = (Math.random() - 0.5) * config.speed * 2;
        
        // Random phase for sine wave movement (organic floating)
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        
        // Random frequency for organic movement
        this.freqX = 0.01 + Math.random() * 0.02;
        this.freqY = 0.01 + Math.random() * 0.02;
        
        this.time = 0;
        
        // Add to container
        container.appendChild(this.element);
        
        // Update position immediately
        this.updatePosition();
    }
    
    // Update particle position
    update() {
        this.time += 0.02;
        
        // Add sine wave oscillation for organic floating effect
        const oscillationX = Math.sin(this.time * this.freqX + this.phaseX) * 0.5;
        const oscillationY = Math.cos(this.time * this.freqY + this.phaseY) * 0.5;
        
        // Update position with base velocity + oscillation (random directions)
        this.x += this.vx + oscillationX;
        this.y += this.vy + oscillationY;
        
        // Wrap around edges (particles loop around)
        if (this.x < 0) this.x = this.width;
        if (this.x > this.width) this.x = 0;
        if (this.y < 0) this.y = this.height;
        if (this.y > this.height) this.y = 0;
        
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
        
        // Create particles spread evenly
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
