// js/costanimation.js

// ===== Cost Display Animation Configuration =====
const COST_ANIMATION_CONFIG = {
    initialDelay: 4000,      // 4 seconds wait before first animation
    tiltAngle: 1.5,          // Degrees to tilt left/right
    scaleRange: 0.03,        // Scale change (1.0 to 1.03)
    hoverDuration: 2500,     // Duration of one hover cycle
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
    
    // Set initial position style
    costDisplay.style.position = 'relative';
    costDisplay.style.transform = 'rotate(0deg) scale(1)';
    costDisplay.style.transformOrigin = 'center center';
    
    // Wait initial delay, then start hover loop
    animationTimeout = setTimeout(() => {
        COST_ANIMATION_CONFIG.enabled = true;
        hoverLoop(costDisplay);
    }, COST_ANIMATION_CONFIG.initialDelay);
}

// ===== Hover Loop (subtle tilt and scale breathing) =====
function hoverLoop(element) {
    if (!COST_ANIMATION_CONFIG.enabled || !element) {
        return;
    }
    
    let startTime = Date.now();
    
    // Smooth hover animation using requestAnimationFrame
    function animate() {
        if (!COST_ANIMATION_CONFIG.enabled) {
            return;
        }
        
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % COST_ANIMATION_CONFIG.hoverDuration) / COST_ANIMATION_CONFIG.hoverDuration;
        
        // Sine wave for smooth rotation (tilt left/right)
        const rotation = Math.sin(progress * Math.PI * 2) * COST_ANIMATION_CONFIG.tiltAngle;
        
        // Cosine wave for smooth scale (breathing effect - grows and shrinks)
        const scaleOffset = (Math.cos(progress * Math.PI * 2) + 1) / 2; // Range 0 to 1
        const scale = 1 + (scaleOffset * COST_ANIMATION_CONFIG.scaleRange);
        
        // Apply transforms (NO position change, only rotate and scale)
        element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== Stop Cost Hover Animation =====
function stopCostHover() {
    COST_ANIMATION_CONFIG.enabled = false;
    
    // Clear any pending timeouts
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    
    // Reset cost display
    const costDisplay = document.querySelector('.pet-header > div[style*="display: flex"]');
    if (costDisplay) {
        costDisplay.style.transition = 'all 0.4s ease-out';
        costDisplay.style.transform = 'rotate(0deg) scale(1)';
    }
}

// ===== Observer for Egg Page Changes =====
// Detects when new egg content is loaded
const contentObserver = new MutationObserver(() => {
    // Stop any existing animation
    stopCostHover();
    
    // Check if egg details are displayed (not welcome screen)
    const petDetails = document.querySelector('.pet-details');
    if (petDetails) {
        // Start animation for new egg page
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
    
    // Observe content area for changes (when new eggs are selected)
    contentObserver.observe(contentArea, {
        childList: true,
        subtree: false
    });
    
    // If egg is already displayed on load, start animation
    const petDetails = document.querySelector('.pet-details');
    if (petDetails) {
        startCostHover();
    }
})();

// js/costanimation.js
