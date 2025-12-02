// js/secreteffects.js

// ===== Secret Rarity Effect Configuration =====
const SECRET_EFFECT_CONFIG = {
    "Secret I": {
        enabled: true,
        sparkColor: '#ff0000',           // Red sparks
        glowColor: 'rgba(255, 0, 0, 0.15)', // Red glow (very low opacity)
        sparkCount: 20,                   // Number of spark particles
        sparkFrequency: 800,              // New spark every 800ms
        lightningFrequency: 1200,         // Lightning bolt every 1.2 seconds
        glitchFrequency: 900,             // Glitch effect every 900ms
        staticOpacity: 0.2                // Background static opacity
    }
};

// ===== Create Spark Particle =====
function createSpark(color) {
    const spark = document.createElement('div');
    spark.className = 'secret-spark';
    
    // Random position across entire row area
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = startX + (Math.random() - 0.5) * 50;
    const endY = startY + (Math.random() - 0.5) * 50;
    
    spark.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 8px ${color}, 0 0 16px ${color};
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
    
    setTimeout(() => {
        spark.style.opacity = '0';
    }, duration * 0.7);
}

// ===== Create Branching Lightning Bolt =====
function createBranchingLightning(color, rowWidth, rowHeight) {
    const lightning = document.createElement('div');
    lightning.className = 'secret-lightning';
    
    // Random start position in pixels
    const x1 = Math.random() * rowWidth;
    const y1 = Math.random() * rowHeight;
    const x2 = Math.random() * rowWidth;
    const y2 = Math.random() * rowHeight;
    
    // Generate jagged path with branches
    let pathData = '';
    const segments = 4 + Math.floor(Math.random() * 3);
    const points = [];
    
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 40;
        const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 15;
        points.push({ x, y });
        
        if (i === 0) {
            pathData += `M ${x},${y}`;
        } else {
            pathData += ` L ${x},${y}`;
        }
    }
    
    // Add random branches
    const branchCount = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < branchCount; i++) {
        const branchStart = points[1 + Math.floor(Math.random() * (points.length - 2))];
        const branchLength = 2 + Math.floor(Math.random() * 3);
        
        pathData += ` M ${branchStart.x},${branchStart.y}`;
        
        for (let j = 1; j <= branchLength; j++) {
            const bx = branchStart.x + (Math.random() - 0.5) * 60;
            const by = branchStart.y + (Math.random() - 0.5) * 20;
            pathData += ` L ${bx},${by}`;
        }
    }
    
    lightning.innerHTML = `
        <svg width="${rowWidth}" height="${rowHeight}" style="position: absolute; top: 0; left: 0; pointer-events: none;">
            <path d="${pathData}" stroke="${color}" stroke-width="2" fill="none" 
                  stroke-linecap="round" opacity="0.9"
                  filter="url(#glow-${Date.now()})" />
            <defs>
                <filter id="glow-${Date.now()}">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
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
    lightning.style.transition = 'opacity 80ms ease-out';
    lightning.style.opacity = '1';
    
    setTimeout(() => {
        lightning.style.opacity = '0';
    }, 120);
    
    setTimeout(() => {
        lightning.remove();
    }, 200);
}

// ===== Create Static Overlay =====
function createStaticOverlay(color, opacity) {
    const static = document.createElement('canvas');
    static.className = 'secret-static';
    static.width = 800;
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
        if (!canvas.parentElement) return;
        
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() > 0.96) {
                const intensity = Math.random();
                data[i] = r * intensity;
                data[i + 1] = g * intensity;
                data[i + 2] = b * intensity;
                data[i + 3] = 255 * intensity;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        setTimeout(() => requestAnimationFrame(drawStatic), 40);
    }
    
    drawStatic();
}

// ===== Create Glitch Effect =====
function createGlitchEffect(row, color) {
    const originalTransform = row.style.transform || '';
    const glitchShift = (Math.random() - 0.5) * 5;
    
    row.style.transition = 'none';
    row.style.transform = `translateX(${glitchShift}px)`;
    row.style.filter = `hue-rotate(${Math.random() * 30}deg) brightness(1.1)`;
    
    setTimeout(() => {
        row.style.transition = 'all 80ms ease-out';
        row.style.transform = originalTransform;
        row.style.filter = 'none';
    }, 60);
}

// ===== Apply Secret Effect to Row =====
function applySecretEffect(row, rarity) {
    const config = SECRET_EFFECT_CONFIG[rarity];
    
    if (!config || !config.enabled) {
        return;
    }
    
    row.style.position = 'relative';
    row.style.overflow = 'visible';
    
    // Apply inner glow to row itself (doesn't overlap other cells)
    row.style.boxShadow = `inset 0 0 20px ${config.glowColor}, inset 0 0 40px ${config.glowColor}`;
    
    // Create effect container (stays within row boundaries)
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
    
    // Get row dimensions for lightning
    const rowRect = row.getBoundingClientRect();
    const rowWidth = rowRect.width;
    const rowHeight = rowRect.height;
    
    // Create static overlay
    const staticCanvas = createStaticOverlay(config.sparkColor, config.staticOpacity);
    effectContainer.appendChild(staticCanvas);
    animateStatic(staticCanvas, config.sparkColor);
    
    // Create initial sparks throughout entire row
    for (let i = 0; i < config.sparkCount; i++) {
        setTimeout(() => {
            const spark = createSpark(config.sparkColor);
            effectContainer.appendChild(spark);
            
            setTimeout(() => {
                animateSpark(spark, 600 + Math.random() * 400);
            }, 50);
            
            setTimeout(() => {
                spark.remove();
            }, 1200);
        }, Math.random() * 1000);
    }
    
    // Continuous spark generation (more frequent)
    setInterval(() => {
        const spark = createSpark(config.sparkColor);
        effectContainer.appendChild(spark);
        
        setTimeout(() => {
            animateSpark(spark, 600 + Math.random() * 400);
        }, 50);
        
        setTimeout(() => {
            spark.remove();
        }, 1200);
    }, config.sparkFrequency);
    
    // Lightning bolts (more frequent, branching, proper dimensions)
    setInterval(() => {
        const lightning = createBranchingLightning(config.sparkColor, rowWidth, rowHeight);
        effectContainer.appendChild(lightning);
        animateLightning(lightning);
    }, config.lightningFrequency);
    
    // Random glitch effects (more frequent)
    setInterval(() => {
        createGlitchEffect(row, config.sparkColor);
    }, config.glitchFrequency);
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
