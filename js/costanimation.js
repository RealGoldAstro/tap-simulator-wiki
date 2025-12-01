// js/costanimation.js

// ===== Cost Display Animation Configuration =====
const COST_ANIMATION_CONFIG = {
    initialDelay: 4000,      // 4 seconds wait before first animation
    scaleMin: 1.0,           // Minimum scale
    scaleMax: 1.02,          // Maximum scale (2% larger)
    cycleDuration: 2000,     // Duration of one breathing cycle
    enabled: false           // Controls if animation should run
};

// Store animation state
let animationTimeout = null;

// ===== Start Cost Hover Animation =====
function startCostHover() {
    const costDisplay = document.querySelector('.pet-header > div[style*="display: flex"]');
    
    if (!costDisplay) {
        console.warn('⚠️ Cost display element not found for animation');
        return;
    }
    
    // Set initial style - stays in exact same position
    costDisplay.style.position = 'relative';
    costDisplay.style.transform = 'scale(1)';
    costDisplay.style.transformOrigin = 'center center';
    
    // Wait initial delay, then start hover loop
    animationTimeout = setTimeout(() => {
        COST_ANIMATION_CONFIG.enabled = true;
        hoverLoop(costDisplay);
    }, COST_ANIMATION_CONFIG.initialDelay);
}

// ===== Hover Loop (simple breathing scale only) =====
function hoverLoop(element) {
    if (!COST_ANIMATION_CONFIG.enabled || !element) {
        return;
    }
    
    let startTime = Date.now();
    
    function animate() {
        if (!COST_ANIMATION_CONFIG.enabled) {
            return;
        }
        
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % COST_ANIMATION_CONFIG.cycleDuration) / COST_ANIMATION_CONFIG.cycleDuration;
        
        // Simple sine wave for breathing (grows and shrinks)
        const scale = COST_ANIMATION_CONFIG.scaleMin + 
                     (Math.sin(progress * Math.PI * 2) * 0.5 + 0.5) * 
                     (COST_ANIMATION_CONFIG.scaleMax - COST_ANIMATION_CONFIG.scaleMin);
        
        // ONLY scale, nothing else
        element.style.transform = `scale(${scale})`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== Stop Cost Hover Animation =====
function stopCostHover() {
    COST_ANIMATION_CONFIG.enabled = false;
    
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    
    // Reset cost display
    const costDisplay = document.querySelector('.pet-header > div[style*="display: flex"]');
    if (costDisplay) {
        costDisplay.style.transition = 'all 0.3s ease-out';
        costDisplay.style.transform = 'scale(1)';
    }
}

// ===== Observer for Egg Page Changes =====
const contentObserver = new MutationObserver(() => {
    stopCostHover();
    
    const petDetails = document.querySelector('.pet-details');
    if (petDetails) {
        startCostHover();
    }
});

// ===== Initialize Cost Animation System =====
(function initCostAnimation() {
    const contentArea = document.getElementById('content');
    
    if (!contentArea) {
        console.warn('⚠️ Cannot initialize cost animation - content area not found');
        return;
    }
    
    contentObserver.observe(contentArea, {
        childList: true,
        subtree: false
    });
    
    const petDetails = document.querySelector('.pet-details');
    if (petDetails) {
        startCostHover();
    }
})();

// js/costanimation.js
