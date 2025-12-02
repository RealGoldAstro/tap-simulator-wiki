// js/secreteffects.js

// ===== Secret Rarity Effect Configuration =====
const SECRET_EFFECT_CONFIG = {
    "Secret I": {
        enabled: true,
        sparkColor: '#ff0000',           // Red sparks
        glowColor: 'rgba(255, 0, 0, 0.6)', // Red glow
        sparkCount: 12,                   // Number of spark particles
        lightningFrequency: 2000,         // Lightning bolt every 2 seconds
        glitchFrequency: 1500,            // Glitch effect every 1.5 seconds
        staticOpacity: 0.15               // Background static opacity
    }
};

// ===== Create Spark Particle =====
function createSpark(color) {
    const spark = document.createElement('div');
    spark.className = 'secret-spark';
    
    // Random position along edges
    const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
    let startX, startY, endX, endY;
    
    if (side === 0) { // Top edge
        startX = Math.random() * 100;
        startY = -2;
        endX = startX + (Math.random() - 0.5) * 30;
        endY = Math.random() * 15;
    } else if (side === 1) { // Right edge
        startX = 102;
        startY = Math.random() * 100;
        endX = 100 - Math.random() * 15;
        endY = startY + (Math.random() - 0.5) * 30;
    } else if (side === 2) { // Bottom edge
        startX = Math.random() * 100;
        startY = 102;
        endX = startX + (Math.random() - 0.5) * 30;
        endY = 100 - Math.random() * 15;
    } else { // Left edge
        startX = -2;
        startY = Math.random() * 100;
        endX = Math.random() * 15;
        endY = startY + (Math.random() - 0.5) * 30;
    }
    
    spark.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 6px ${color}, 0 0 12px ${color};
        left: ${startX}%;
        top: ${startY}%;
        pointer-events: none;
        z-index: 10;
        opacity: 0;
    `;
    
    spark.dataset.endX = endX;
    spark.dataset.endY = endY;
    
    return spark;
}

// ===== Animate Spark =====
function animateSpark(spark, duration) {
    const endX = parseFloat(spark.dataset.endX);
    const endY = parseFloat(spark.dataset.endY);
    
    spark.style.transition = `all ${duration}ms ease-out, opacity ${duration * 0.3}ms ease-in`;
    spark.style.opacity = '1';
    spark.style.left = endX + '%';
    spark.style.top = endY + '%';
    
    // Fade out at end
    setTimeout(() => {
        spark.style.opacity = '0';
    }, duration * 0.7);
}

// ===== Create Lightning Bolt =====
function createLightningBolt(color) {
    const lightning = document.createElement('div');
    lightning.className = 'secret-lightning';
    
    // Random edge position
    const side = Math.floor(Math.random() * 4);
    const position = Math.random() * 100;
    
    let x1, y1, x2, y2;
    
    if (side === 0) { // Top
        x1 = position;
        y1 = 0;
        x2 = position + (Math.random() - 0.5) * 40;
        y2 = 30 + Math.random() * 40;
    } else if (side === 1) { // Right
        x1 = 100;
        y1 = position;
        x2 = 70 - Math.random() * 40;
        y2 = position + (Math.random() - 0.5) * 40;
    } else if (side === 2) { // Bottom
        x1 = position;
        y1 = 100;
        x2 = position + (Math.random() - 0.5) * 40;
        y2 = 70 - Math.random() * 40;
    } else { // Left
        x1 = 0;
        y1 = position;
        x2 = 30 + Math.random() * 40;
        y2 = position + (Math.random() - 0.5) * 40;
    }
    
    // Create jagged lightning path
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 20;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 20;
    
    const path = `M ${x1},${y1} L ${midX},${midY} L ${x2},${y2}`;
    
    lightning.innerHTML = `
        <svg width="100%" height="100%" style="position: absolute; top: 0; left: 0; pointer-events: none;">
            <path d="${path}" stroke="${color}" stroke-width="2" fill="none" 
                  stroke-linecap="round" opacity="0.8"
                  filter="url(#glow)" />
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
        </svg>
    `;
    
    lightning.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
        opacity: 0;
    `;
    
    return lightning;
}

// ===== Animate Lightning =====
function animateLightning(lightning) {
    lightning.style.transition = 'opacity 100ms ease-out';
    lightning.style.opacity = '1';
    
    setTimeout(() => {
        lightning.style.opacity = '0';
    }, 150);
    
    setTimeout(() => {
        lightning.remove();
    }, 250);
}

// ===== Create Static Overlay =====
function createStaticOverlay(color, opacity) {
    const static = document.createElement('canvas');
    static.className = 'secret-static';
    static.width = 400;
    static.height = 60;
    
    static.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
        opacity: ${opacity};
        mix-blend-mode: screen;
    `;
    
    return static;
}

// ===== Animate Static Noise =====
function animateStatic(canvas, color) {
    const ctx = canvas.getContext('2d');
    
    function drawStatic() {
        if (!canvas.parentElement) return; // Stop if removed from DOM
        
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        // Parse color
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() > 0.97) { // Sparse static
                const intensity = Math.random();
                data[i] = r * intensity;
                data[i + 1] = g * intensity;
                data[i + 2] = b * intensity;
                data[i + 3] = 255 * intensity;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        setTimeout(() => requestAnimationFrame(drawStatic), 50);
    }
    
    drawStatic();
}

// ===== Create Glitch Effect =====
function createGlitchEffect(row, color) {
    const originalTransform = row.style.transform || '';
    const glitchShift = (Math.random() - 0.5) * 4;
    
    // Apply glitch
    row.style.transition = 'none';
    row.style.transform = `translateX(${glitchShift}px)`;
    row.style.filter = `hue-rotate(${Math.random() * 20}deg)`;
    
    // Reset after short duration
    setTimeout(() => {
        row.style.transition = 'all 100ms ease-out';
        row.style.transform = originalTransform;
        row.style.filter = 'none';
    }, 80);
}

// ===== Apply Secret Effect to Row =====
function applySecretEffect(row, rarity) {
    const config = SECRET_EFFECT_CONFIG[rarity];
    
    if (!config || !config.enabled) {
        return;
    }
    
    // Make row position relative for absolute positioned effects
    row.style.position = 'relative';
    row.style.overflow = 'visible';
    
    // Create effect container
    const effectContainer = document.createElement('div');
    effectContainer.className = 'secret-effect-container';
    effectContainer.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        pointer-events: none;
        z-index: 1;
        overflow: visible;
    `;
    
    row.appendChild(effectContainer);
    
    // Add red glow to row
    row.style.boxShadow = `0 0 15px ${config.glowColor}, inset 0 0 10px ${config.glowColor}`;
    
    // Create static overlay
    const staticCanvas = createStaticOverlay(config.sparkColor, config.staticOpacity);
    effectContainer.appendChild(staticCanvas);
    animateStatic(staticCanvas, config.sparkColor);
    
    // Create initial sparks
    for (let i = 0; i < config.sparkCount; i++) {
        setTimeout(() => {
            const spark = createSpark(config.sparkColor);
            effectContainer.appendChild(spark);
            
            setTimeout(() => {
                animateSpark(spark, 800 + Math.random() * 400);
            }, 50);
            
            // Remove spark after animation
            setTimeout(() => {
                spark.remove();
            }, 1500);
        }, Math.random() * 2000);
    }
    
    // Continuous spark generation
    setInterval(() => {
        const spark = createSpark(config.sparkColor);
        effectContainer.appendChild(spark);
        
        setTimeout(() => {
            animateSpark(spark, 800 + Math.random() * 400);
        }, 50);
        
        setTimeout(() => {
            spark.remove();
        }, 1500);
    }, 2000 + Math.random() * 1000);
    
    // Lightning bolts
    setInterval(() => {
        const lightning = createLightningBolt(config.sparkColor);
        effectContainer.appendChild(lightning);
        animateLightning(lightning);
    }, config.lightningFrequency + Math.random() * 1000);
    
    // Random glitch effects
    setInterval(() => {
        createGlitchEffect(row, config.sparkColor);
    }, config.glitchFrequency + Math.random() * 1000);
}

// ===== Observe Pet Table and Apply Effects =====
function observeAndApplyEffects() {
    const observer = new MutationObserver(() => {
        const rows = document.querySelectorAll('.pets-table tbody tr');
        
        rows.forEach(row => {
            // Check if already has effect
            if (row.querySelector('.secret-effect-container')) {
                return;
            }
            
            // Find rarity badge
            const rarityBadge = row.querySelector('.rarity-badge');
            if (!rarityBadge) {
                return;
            }
            
            const rarity = rarityBadge.textContent.trim();
            
            // Apply effect if it's a Secret rarity
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
    // Start observing immediately
    observeAndApplyEffects();
    
    // Also check for existing tables
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
