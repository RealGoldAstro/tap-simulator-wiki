// js/textglimmer.js

// ===== Glimmer Animation Configuration =====
const GLIMMER_CONFIG = {
    interval: 8000,          // Time between glimmers (8 seconds)
    duration: 1500,          // Duration of glimmer animation
    glimmerWidth: '40%',     // Width of the glimmer shine
    enabled: true
};

// ===== Create Glimmer Effect Element =====
function createGlimmerEffect(targetElement) {
    // Create glimmer overlay
    const glimmer = document.createElement('div');
    glimmer.style.position = 'absolute';
    glimmer.style.top = '0';
    glimmer.style.left = '-40%';
    glimmer.style.width = GLIMMER_CONFIG.glimmerWidth;
    glimmer.style.height = '100%';
    glimmer.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)';
    glimmer.style.pointerEvents = 'none';
    glimmer.style.zIndex = '10';
    glimmer.style.opacity = '0';
    
    return glimmer;
}

// ===== Apply Glimmer to Element =====
function applyGlimmerToElement(element) {
    if (!element) return;
    
    // Make element relative positioned for glimmer overlay
    const currentPosition = window.getComputedStyle(element).position;
    if (currentPosition === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    
    // Create and append glimmer
    const glimmer = createGlimmerEffect(element);
    element.appendChild(glimmer);
    
    // Start glimmer loop
    glimmerLoop(glimmer);
}

// ===== Glimmer Animation Loop =====
function glimmerLoop(glimmerElement) {
    if (!GLIMMER_CONFIG.enabled || !glimmerElement) {
        return;
    }
    
    // Trigger glimmer effect
    setTimeout(() => {
        glimmerElement.style.transition = 'none';
        glimmerElement.style.left = '-40%';
        glimmerElement.style.opacity = '1';
        
        // Animate glimmer across
        setTimeout(() => {
            glimmerElement.style.transition = `left ${GLIMMER_CONFIG.duration}ms ease-in-out, opacity ${GLIMMER_CONFIG.duration}ms ease-in-out`;
            glimmerElement.style.left = '140%';
            glimmerElement.style.opacity = '0.8';
            
            // Fade out at end
            setTimeout(() => {
                glimmerElement.style.opacity = '0';
                
                // Schedule next glimmer
                setTimeout(() => {
                    glimmerLoop(glimmerElement);
                }, GLIMMER_CONFIG.interval - GLIMMER_CONFIG.duration);
                
            }, GLIMMER_CONFIG.duration);
        }, 50);
    }, 0);
}

// ===== Apply to Header Title =====
function applyGlimmerToHeader() {
    const headerTitle = document.querySelector('header h1');
    
    if (!headerTitle) {
        console.warn('⚠️ Header title not found for glimmer effect');
        return;
    }
    
    applyGlimmerToElement(headerTitle);
}

// ===== Apply to Cost Display =====
function applyGlimmerToCost() {
    // Observer to watch for cost display changes
    const contentObserver = new MutationObserver(() => {
        const costText = document.querySelector('.pet-header span[style*="color: #FFD700"]');
        
        if (costText && !costText.querySelector('div')) {
            applyGlimmerToElement(costText);
            contentObserver.disconnect();
        }
    });
    
    // Start observing
    const contentArea = document.getElementById('content');
    if (contentArea) {
        contentObserver.observe(contentArea, {
            childList: true,
            subtree: true
        });
    }
    
    // Also check if it exists immediately
    const costText = document.querySelector('.pet-header span[style*="color: #FFD700"]');
    if (costText) {
        applyGlimmerToElement(costText);
    }
}

// ===== Initialize Glimmer System =====
(function initGlimmer() {
    // Apply to header title immediately
    applyGlimmerToHeader();
    
    // Apply to cost display when available
    applyGlimmerToCost();
})();

// js/textglimmer.js
