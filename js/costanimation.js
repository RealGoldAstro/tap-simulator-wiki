// js/costanimation.js

// ===== Cost Display Animation Configuration =====
const COST_ANIMATION_CONFIG = {
    initialDelay: 4000,      // 4 seconds wait before first animation
    maxTilt: 3,              // Maximum degrees to tilt
    maxScale: 0.08,          // Maximum scale change (up to 8%)
    changeInterval: 800,     // How often to change (ms)
    transitionSpeed: 600,    // Transition duration between changes
    enabled: false           // Controls if animation should run
};

// Store animation state
let animationTimeout = null;
let changeInterval = null;

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
    costDisplay.style.transition = `transform ${COST_ANIMATION_CONFIG.transitionSpeed}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
    
    // Wait initial delay, then start hover loop
    animationTimeout = setTimeout(() => {
        COST_ANIMATION_CONFIG.enabled = true;
        randomHoverChange(costDisplay);
    }, COST_ANIMATION_CONFIG.initialDelay);
}

// ===== Random Hover Change =====
function randomHoverChange(element) {
    if (!COST_ANIMATION_CONFIG.enabled || !element) {
        return;
    }
    
    // Generate random rotation and scale independently
    const randomRotation = (Math.random() - 0.5) * 2 * COST_ANIMATION_CONFIG.maxTilt;
    const randomScale = 1 + (Math.random() - 0.5) * 2 * COST_ANIMATION_CONFIG.maxScale;
    
    // Apply random transform
    element.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
    
    // Schedule next random change
    changeInterval = setTimeout(() => {
        if (COST_ANIMATION_CONFIG.enabled) {
            randomHoverChange(element);
        }
    }, COST_ANIMATION_CONFIG.changeInterval);
}

// ===== Stop Cost Hover Animation =====
function stopCostHover() {
    COST_ANIMATION_CONFIG.enabled = false;
    
    // Clear any pending timeouts/intervals
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    
    if (changeInterval) {
        clearTimeout(changeInterval);
        changeInterval = null;
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
