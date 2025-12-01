// js/costanimation.js

// ===== Cost Display Animation Configuration =====
const COST_ANIMATION_CONFIG = {
    initialDelay: 4000,      // 4 seconds wait before first animation
    walkDistance: 40,        // Pixels to walk right (increased)
    stepDuration: 450,       // Duration of each step
    steps: 6,                // Number of steps to take
    pauseAtEnd: 1200,        // Pause at the end before walking back
    enabled: false           // Controls if animation should run
};

// Store animation state
let animationTimeout = null;
let currentStep = 0;

// ===== Start Cost Walking Animation =====
function startCostWalking() {
    const costDisplay = document.querySelector('.pet-header > div[style*="display: flex"]');
    
    if (!costDisplay) {
        console.warn('⚠️ Cost display element not found for animation');
        return;
    }
    
    // Set initial position style
    costDisplay.style.position = 'relative';
    costDisplay.style.left = '0px';
    costDisplay.style.transform = 'translateY(0px) scaleX(1) skewX(0deg)';
    
    // Wait initial delay, then start loop
    animationTimeout = setTimeout(() => {
        COST_ANIMATION_CONFIG.enabled = true;
        walkForward(costDisplay);
    }, COST_ANIMATION_CONFIG.initialDelay);
}

// ===== Walk Forward =====
function walkForward(element) {
    if (!COST_ANIMATION_CONFIG.enabled || !element) {
        return;
    }
    
    currentStep = 0;
    walkStep(element, true);
}

// ===== Walk Step (smooth walking motion with horizontal warp) =====
function walkStep(element, forward) {
    if (!COST_ANIMATION_CONFIG.enabled || !element) {
        return;
    }
    
    const stepSize = COST_ANIMATION_CONFIG.walkDistance / COST_ANIMATION_CONFIG.steps;
    
    // Calculate position for this step
    const newLeft = forward 
        ? (currentStep + 1) * stepSize 
        : COST_ANIMATION_CONFIG.walkDistance - ((currentStep + 1) * stepSize);
    
    // Alternating horizontal squish/stretch for walking effect (warp on sides)
    const scaleX = (currentStep % 2 === 0) ? 1.05 : 0.98;
    const skewX = (currentStep % 2 === 0) ? 2 : -2;
    
    // Minimal vertical bob (just a tiny bit)
    const bobHeight = (currentStep % 2 === 0) ? -0.5 : -1;
    
    // Smooth transition with easing
    element.style.transition = `all ${COST_ANIMATION_CONFIG.stepDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    element.style.left = `${newLeft}px`;
    element.style.transform = `translateY(${bobHeight}px) scaleX(${scaleX}) skewX(${skewX}deg)`;
    
    currentStep++;
    
    // Check if walk is complete
    if (currentStep >= COST_ANIMATION_CONFIG.steps) {
        // Finished walking
        setTimeout(() => {
            // Reset to normal shape
            element.style.transition = `all 250ms ease-out`;
            element.style.transform = `translateY(0px) scaleX(1) skewX(0deg)`;
            
            if (forward) {
                // Pause, then walk back
                setTimeout(() => {
                    if (COST_ANIMATION_CONFIG.enabled) {
                        currentStep = 0;
                        walkStep(element, false);
                    }
                }, COST_ANIMATION_CONFIG.pauseAtEnd);
            } else {
                // Pause, then walk forward again
                setTimeout(() => {
                    if (COST_ANIMATION_CONFIG.enabled) {
                        walkForward(element);
                    }
                }, COST_ANIMATION_CONFIG.pauseAtEnd);
            }
        }, COST_ANIMATION_CONFIG.stepDuration);
    } else {
        // Continue walking
        setTimeout(() => {
            walkStep(element, forward);
        }, COST_ANIMATION_CONFIG.stepDuration);
    }
}

// ===== Stop Cost Walking Animation =====
function stopCostWalking() {
    COST_ANIMATION_CONFIG.enabled = false;
    
    // Clear any pending timeouts
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    
    // Reset cost display position
    const costDisplay = document.querySelector('.pet-header > div[style*="display: flex"]');
    if (costDisplay) {
        costDisplay.style.transition = 'all 0.4s ease-out';
        costDisplay.style.left = '0px';
        costDisplay.style.transform = 'translateY(0px) scaleX(1) skewX(0deg)';
    }
}

// ===== Observer for Egg Page Changes =====
// Detects when new egg content is loaded
const contentObserver = new MutationObserver(() => {
    // Stop any existing animation
    stopCostWalking();
    
    // Check if egg details are displayed (not welcome screen)
    const petDetails = document.querySelector('.pet-details');
    if (petDetails) {
        // Start animation for new egg page
        startCostWalking();
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
        startCostWalking();
    }
})();

// js/costanimation.js
