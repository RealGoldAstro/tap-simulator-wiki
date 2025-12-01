// js/textglimmer.js

// ===== Glimmer Animation Configuration =====
const GLIMMER_CONFIG = {
    interval: 5000,          // Time between glimmers (5 seconds)
    duration: 2000,          // Duration of glimmer sweep (2 seconds)
    enabled: true
};

// ===== Apply Glimmer to Header =====
function applyGlimmerToHeader() {
    const headerTitle = document.querySelector('header h1');
    
    if (!headerTitle) {
        console.warn('⚠️ Header title not found for glimmer effect');
        return;
    }
    
    // Keep original text visible
    headerTitle.style.position = 'relative';
    headerTitle.style.color = '#72B2FF'; // Keep original color
    headerTitle.style.overflow = 'visible';
    
    // Create shimmer overlay
    const shimmer = document.createElement('div');
    shimmer.className = 'shimmer-overlay';
    shimmer.style.position = 'absolute';
    shimmer.style.top = '0';
    shimmer.style.left = '0';
    shimmer.style.width = '100%';
    shimmer.style.height = '100%';
    shimmer.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)';
    shimmer.style.backgroundSize = '200% 100%';
    shimmer.style.backgroundPosition = '-200% 0';
    shimmer.style.backgroundClip = 'text';
    shimmer.style.webkitBackgroundClip = 'text';
    shimmer.style.color = 'transparent';
    shimmer.style.pointerEvents = 'none';
    shimmer.textContent = headerTitle.textContent;
    shimmer.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))';
    
    headerTitle.appendChild(shimmer);
    
    // Start shimmer animation
    shimmerLoop(shimmer);
}

// ===== Apply Glimmer to Cost =====
function applyGlimmerToCost() {
    const observer = new MutationObserver(() => {
        const costText = document.querySelector('.pet-header span[style*="color: #FFD700"]');
        
        if (costText && !costText.classList.contains('shimmer-applied')) {
            costText.classList.add('shimmer-applied');
            
            // Keep original gold color
            costText.style.position = 'relative';
            costText.style.overflow = 'visible';
            
            // Create shimmer overlay
            const shimmer = document.createElement('div');
            shimmer.className = 'shimmer-overlay';
            shimmer.style.position = 'absolute';
            shimmer.style.top = '0';
            shimmer.style.left = '0';
            shimmer.style.width = '100%';
            shimmer.style.height = '100%';
            shimmer.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%)';
            shimmer.style.backgroundSize = '200% 100%';
            shimmer.style.backgroundPosition = '-200% 0';
            shimmer.style.backgroundClip = 'text';
            shimmer.style.webkitBackgroundClip = 'text';
            shimmer.style.color = 'transparent';
            shimmer.style.pointerEvents = 'none';
            shimmer.style.fontWeight = '700';
            shimmer.style.fontSize = '1.1rem';
            shimmer.textContent = costText.textContent;
            shimmer.style.filter = 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))';
            
            costText.appendChild(shimmer);
            
            // Start shimmer animation
            shimmerLoop(shimmer);
        }
    });
    
    const contentArea = document.getElementById('content');
    if (contentArea) {
        observer.observe(contentArea, {
            childList: true,
            subtree: true
        });
    }
    
    // Check immediately
    const costText = document.querySelector('.pet-header span[style*="color: #FFD700"]');
    if (costText && !costText.classList.contains('shimmer-applied')) {
        costText.classList.add('shimmer-applied');
        costText.style.position = 'relative';
        costText.style.overflow = 'visible';
        
        const shimmer = document.createElement('div');
        shimmer.className = 'shimmer-overlay';
        shimmer.style.position = 'absolute';
        shimmer.style.top = '0';
        shimmer.style.left = '0';
        shimmer.style.width = '100%';
        shimmer.style.height = '100%';
        shimmer.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%)';
        shimmer.style.backgroundSize = '200% 100%';
        shimmer.style.backgroundPosition = '-200% 0';
        shimmer.style.backgroundClip = 'text';
        shimmer.style.webkitBackgroundClip = 'text';
        shimmer.style.color = 'transparent';
        shimmer.style.pointerEvents = 'none';
        shimmer.style.fontWeight = '700';
        shimmer.style.fontSize = '1.1rem';
        shimmer.textContent = costText.textContent;
        shimmer.style.filter = 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))';
        
        costText.appendChild(shimmer);
        shimmerLoop(shimmer);
    }
}

// ===== Shimmer Animation Loop =====
function shimmerLoop(shimmerElement) {
    if (!GLIMMER_CONFIG.enabled || !shimmerElement) {
        return;
    }
    
    // Reset to start position
    shimmerElement.style.transition = 'none';
    shimmerElement.style.backgroundPosition = '-200% 0';
    shimmerElement.style.opacity = '0';
    
    // Wait a moment, then start shimmer
    setTimeout(() => {
        shimmerElement.style.opacity = '1';
        shimmerElement.style.transition = `background-position ${GLIMMER_CONFIG.duration}ms linear`;
        shimmerElement.style.backgroundPosition = '200% 0';
        
        // After shimmer completes, hide and wait for next cycle
        setTimeout(() => {
            shimmerElement.style.opacity = '0';
            
            // Wait interval, then repeat
            setTimeout(() => {
                shimmerLoop(shimmerElement);
            }, GLIMMER_CONFIG.interval - GLIMMER_CONFIG.duration);
            
        }, GLIMMER_CONFIG.duration);
    }, 100);
}

// ===== Initialize Glimmer System =====
(function initGlimmer() {
    applyGlimmerToHeader();
    applyGlimmerToCost();
})();

// js/textglimmer.js
