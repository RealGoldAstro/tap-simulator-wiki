// js/textglimmer.js

// ===== Glimmer Animation Configuration =====
const GLIMMER_CONFIG = {
    msPerCharacter: 250,     // Milliseconds per character
    minimumDuration: 2000,   // Minimum duration (2 seconds)
    opacity: 0.3,            // Shimmer opacity (0.0 to 1.0)
    enabled: true
};

// ===== Calculate Duration Based on Text Length =====
function calculateDuration(text) {
    const charCount = text.length;
    const calculatedDuration = charCount * GLIMMER_CONFIG.msPerCharacter;
    
    return Math.max(calculatedDuration, GLIMMER_CONFIG.minimumDuration);
}

// ===== Apply Glimmer to Header =====
function applyGlimmerToHeader() {
    const headerTitle = document.querySelector('header h1');
    
    if (!headerTitle) {
        console.warn('⚠️ Header title not found for glimmer effect');
        return;
    }
    
    const textContent = headerTitle.textContent;
    const duration = calculateDuration(textContent);
    
    headerTitle.style.position = 'relative';
    headerTitle.style.color = '#72B2FF';
    headerTitle.style.overflow = 'visible';
    
    const shimmer = document.createElement('div');
    shimmer.className = 'shimmer-overlay';
    shimmer.style.position = 'absolute';
    shimmer.style.top = '0';
    shimmer.style.left = '0';
    shimmer.style.width = '100%';
    shimmer.style.height = '100%';
    shimmer.style.background = `linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255, 255, 255, ${GLIMMER_CONFIG.opacity}) 50%, transparent 55%, transparent 100%)`;
    shimmer.style.backgroundSize = '200% 100%';
    shimmer.style.backgroundPosition = '-200% 0';
    shimmer.style.backgroundClip = 'text';
    shimmer.style.webkitBackgroundClip = 'text';
    shimmer.style.color = 'transparent';
    shimmer.style.pointerEvents = 'none';
    shimmer.textContent = textContent;
    shimmer.style.filter = `drop-shadow(0 0 8px rgba(255, 255, 255, ${GLIMMER_CONFIG.opacity * 0.75}))`;
    
    headerTitle.appendChild(shimmer);
    
    shimmerLoop(shimmer, duration);
}

// ===== Apply Glimmer to Cost Text =====
function applyShimmerToCostText(costSpan) {
    if (!costSpan || costSpan.querySelector('.shimmer-overlay')) {
        return; // Already has shimmer
    }
    
    const textContent = costSpan.textContent;
    const duration = calculateDuration(textContent);
    
    costSpan.style.position = 'relative';
    costSpan.style.overflow = 'visible';
    costSpan.style.display = 'inline-block';
    
    const shimmer = document.createElement('div');
    shimmer.className = 'shimmer-overlay';
    shimmer.style.position = 'absolute';
    shimmer.style.top = '0';
    shimmer.style.left = '0';
    shimmer.style.width = '100%';
    shimmer.style.height = '100%';
    shimmer.style.background = `linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255, 255, 255, ${GLIMMER_CONFIG.opacity}) 50%, transparent 55%, transparent 100%)`;
    shimmer.style.backgroundSize = '200% 100%';
    shimmer.style.backgroundPosition = '-200% 0';
    shimmer.style.backgroundClip = 'text';
    shimmer.style.webkitBackgroundClip = 'text';
    shimmer.style.color = 'transparent';
    shimmer.style.pointerEvents = 'none';
    shimmer.style.fontWeight = '700';
    shimmer.style.fontSize = '1.1rem';
    shimmer.textContent = textContent;
    shimmer.style.filter = `drop-shadow(0 0 6px rgba(255, 255, 255, ${GLIMMER_CONFIG.opacity * 0.75}))`;
    
    costSpan.appendChild(shimmer);
    
    shimmerLoop(shimmer, duration);
}

// ===== Apply Glimmer to Cost =====
function applyGlimmerToCost() {
    // Try to find cost immediately
    const checkAndApply = () => {
        const costSpans = document.querySelectorAll('.pet-header span[style*="color: #FFD700"]');
        
        if (costSpans.length > 0) {
            costSpans.forEach(span => applyShimmerToCostText(span));
        }
    };
    
    // Check immediately
    checkAndApply();
    
    // Observe for changes
    const observer = new MutationObserver(() => {
        checkAndApply();
    });
    
    const contentArea = document.getElementById('content');
    if (contentArea) {
        observer.observe(contentArea, {
            childList: true,
            subtree: true
        });
    } else {
        console.warn('⚠️ Content area not found for cost glimmer observer');
    }
}

// ===== Shimmer Animation Loop (continuous, no pauses) =====
function shimmerLoop(shimmerElement, duration) {
    if (!GLIMMER_CONFIG.enabled || !shimmerElement) {
        return;
    }
    
    // Reset to start
    shimmerElement.style.transition = 'none';
    shimmerElement.style.backgroundPosition = '-200% 0';
    
    // Force browser to apply reset
    shimmerElement.getBoundingClientRect();
    
    // Animate
    setTimeout(() => {
        shimmerElement.style.transition = `background-position ${duration}ms linear`;
        shimmerElement.style.backgroundPosition = '200% 0';
        
        // Loop immediately after completion
        setTimeout(() => {
            shimmerLoop(shimmerElement, duration);
        }, duration);
    }, 16);
}

// ===== Initialize Glimmer System =====
(function initGlimmer() {
    applyGlimmerToHeader();
    
    // Wait a bit for DOM to load, then apply cost glimmer
    setTimeout(() => {
        applyGlimmerToCost();
    }, 500);
})();

// js/textglimmer.js
