// js/textglimmer.js

// ===== Glimmer Animation Configuration =====
const GLIMMER_CONFIG = {
    msPerCharacter: 250,     // Milliseconds per character
    minimumDuration: 2000,   // Minimum duration (2 seconds)
    randomDelayMin: 100,     // Minimum random delay (ms)
    randomDelayMax: 200,     // Maximum random delay (ms)
    opacity: 0.5,            // Shimmer opacity (0.0 to 1.0)
    enabled: true
};

// ===== Calculate Duration Based on Text Length =====
function calculateDuration(text) {
    const charCount = text.length;
    const calculatedDuration = charCount * GLIMMER_CONFIG.msPerCharacter;
    
    // Use calculated duration or minimum, whichever is longer
    return Math.max(calculatedDuration, GLIMMER_CONFIG.minimumDuration);
}

// ===== Get Random Delay =====
function getRandomDelay() {
    return Math.random() * (GLIMMER_CONFIG.randomDelayMax - GLIMMER_CONFIG.randomDelayMin) + GLIMMER_CONFIG.randomDelayMin;
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
    
    // Keep original text visible
    headerTitle.style.position = 'relative';
    headerTitle.style.color = '#72B2FF';
    headerTitle.style.overflow = 'visible';
    
    // Create shimmer overlay
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
    
    // Start shimmer animation with calculated duration
    shimmerLoop(shimmer, duration);
}

// ===== Check if Current Egg is Base Type =====
function isBaseEgg() {
    const petMeta = document.querySelector('.pet-meta');
    if (!petMeta) return false;
    
    // If text contains "World:" it's a Base egg
    // If it contains "Robux Store:" it's Robux
    // If it only shows name without prefix, it's Leaderboard
    const metaText = petMeta.textContent;
    return metaText.includes('World:');
}

// ===== Apply Glimmer to Cost =====
function applyGlimmerToCost() {
    const observer = new MutationObserver(() => {
        // Only apply to Base eggs
        if (!isBaseEgg()) {
            return;
        }
        
        const costText = document.querySelector('.pet-header span[style*="color: #FFD700"]');
        
        if (costText && !costText.classList.contains('shimmer-applied')) {
            costText.classList.add('shimmer-applied');
            
            const textContent = costText.textContent;
            const duration = calculateDuration(textContent);
            
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
            
            costText.appendChild(shimmer);
            
            // Start shimmer animation with calculated duration
            shimmerLoop(shimmer, duration);
        }
    });
    
    const contentArea = document.getElementById('content');
    if (contentArea) {
        observer.observe(contentArea, {
            childList: true,
            subtree: true
        });
    }
    
    // Check immediately (only if Base egg)
    if (isBaseEgg()) {
        const costText = document.querySelector('.pet-header span[style*="color: #FFD700"]');
        if (costText && !costText.classList.contains('shimmer-applied')) {
            costText.classList.add('shimmer-applied');
            
            const textContent = costText.textContent;
            const duration = calculateDuration(textContent);
            
            costText.style.position = 'relative';
            costText.style.overflow = 'visible';
            
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
            
            costText.appendChild(shimmer);
            shimmerLoop(shimmer, duration);
        }
    }
}

// ===== Shimmer Animation Loop (with random delay) =====
function shimmerLoop(shimmerElement, duration) {
    if (!GLIMMER_CONFIG.enabled || !shimmerElement) {
        return;
    }
    
    // Reset to start position
    shimmerElement.style.transition = 'none';
    shimmerElement.style.backgroundPosition = '-200% 0';
    
    // Start shimmer sweep with calculated duration
    setTimeout(() => {
        shimmerElement.style.transition = `background-position ${duration}ms linear`;
        shimmerElement.style.backgroundPosition = '200% 0';
        
        // Add random delay before next loop
        const randomDelay = getRandomDelay();
        
        setTimeout(() => {
            shimmerLoop(shimmerElement, duration);
        }, duration + randomDelay);
        
    }, 50);
}

// ===== Initialize Glimmer System =====
(function initGlimmer() {
    applyGlimmerToHeader();
    applyGlimmerToCost();
})();

// js/textglimmer.js
