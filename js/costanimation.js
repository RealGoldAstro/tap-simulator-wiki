// js/costanimation.js

// ===== Cost Display Animation Configuration =====
const COST_ANIMATION_CONFIG = {
    initialDelay: 4000,      // 4 seconds wait before first animation
    walkDistance: 15,        // Pixels to walk right
    walkDuration: 2500,      // Duration of walk right (ms)
    pauseAtEnd: 800,         // Pause at the end before walking back
    returnDuration: 2500,    // Duration of walk back
    pauseAtStart: 1200,      // Pause at start before next cycle
    enabled: false           // Controls if animation should run
};

// Store animation timeout/interval IDs for cleanup
let animationTimeout = null;

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
    
    // Wait initial delay, then start loop
    animationTimeout = setTimeout(() => {
        COST_ANIMATION_CONFIG.enabled = true;
        walkCycle(costDisplay);
    }, COST_ANIMATION_CONFIG.initialDelay);
}

// ===== Walk Cycle Animation =====
function walkCycle(element) {
    if (!COST_ANIMATION_CONFIG.enabled || !element) {
        return;
    }
    
    // Walk right with subtle bob
    element.style.transition = `all ${COST_ANIMATION_CONFIG.walkDuration}ms ease-in-out`;
    element.style.left = `${COST_ANIMATION_CONFIG.walkDistance}px`;
    element.style.transform = 'translateY(-1px)';
    
    setTimeout(() => {
        // Subtle bob down
        element.style.transform = 'translateY(0px)';
        
        setTimeout(() => {
            // Bob up
            element.style.transform = 'translateY(-1px)';
            
            setTimeout(() => {
                // Pause at end, then walk back
                element.style.transition = `all ${COST_ANIMATION_CONFIG.returnDuration}ms ease-in-out`;
                element.style.left = '0px';
                element.style.transform = 'translateY(0px)';
                
                setTimeout(() => {
                    // Pause at start, then repeat
                    if (COST_ANIMATION_CONFIG.enabled) {
                        walkCycle(element);
                    }
                }, COST_ANIMATION_CONFIG.returnDuration + COST_ANIMATION_CONFIG.pauseAtStart);
                
            }, COST_ANIMATION_CONFIG.pauseAtEnd / 2);
        }, COST_ANIMATION_CONFIG.walkDuration / 2);
    }, COST_ANIMATION_CONFIG.walkDuration / 2);
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
        costDisplay.style.transition = 'all 0.3s ease-out';
        costDisplay.style.left = '0px';
        costDisplay.style.transform = 'translateY(0px)';
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
