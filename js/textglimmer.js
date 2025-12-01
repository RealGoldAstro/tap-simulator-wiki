// js/textglimmer.js

// ===== Glimmer Animation Configuration =====
const GLIMMER_CONFIG = {
    interval: 4000,          // Time between glimmers (4 seconds - more frequent)
    duration: 2500,          // Duration of glimmer animation (slower)
    enabled: true
};

// ===== Apply Glimmer to Element =====
function applyGlimmerToElement(element) {
    if (!element) return;
    
    // Store original text
    const originalText = element.textContent;
    
    // Wrap text in span for glimmer effect
    element.innerHTML = `<span class="glimmer-text">${originalText}</span>`;
    
    const textSpan = element.querySelector('.glimmer-text');
    
    // Apply CSS for text-only glimmer
    textSpan.style.background = 'linear-gradient(90deg, #E8EAED 0%, #E8EAED 30%, #FFFFFF 50%, #E8EAED 70%, #E8EAED 100%)';
    textSpan.style.backgroundSize = '200% 100%';
    textSpan.style.backgroundClip = 'text';
    textSpan.style.webkitBackgroundClip = 'text';
    textSpan.style.color = 'transparent';
    textSpan.style.backgroundPosition = '-200% 0';
    
    // Start glimmer loop
    glimmerLoop(textSpan);
}

// ===== Glimmer Animation Loop =====
function glimmerLoop(textElement) {
    if (!GLIMMER_CONFIG.enabled || !textElement) {
        return;
    }
    
    // Trigger glimmer effect
    setTimeout(() => {
        textElement.style.transition = 'none';
        textElement.style.backgroundPosition = '-200% 0';
        
        // Animate glimmer across text
        setTimeout(() => {
            textElement.style.transition = `background-position ${GLIMMER_CONFIG.duration}ms ease-in-out`;
            textElement.style.backgroundPosition = '200% 0';
            
            // Schedule next glimmer
            setTimeout(() => {
                glimmerLoop(textElement);
            }, GLIMMER_CONFIG.interval);
            
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
        
        if (costText && !costText.classList.contains('glimmer-applied')) {
            costText.classList.add('glimmer-applied');
            
            // Apply glimmer with gold color
            const originalText = costText.textContent;
            costText.innerHTML = `<span class="glimmer-text">${originalText}</span>`;
            
            const textSpan = costText.querySelector('.glimmer-text');
            textSpan.style.background = 'linear-gradient(90deg, #FFD700 0%, #FFD700 30%, #FFFFFF 50%, #FFD700 70%, #FFD700 100%)';
            textSpan.style.backgroundSize = '200% 100%';
            textSpan.style.backgroundClip = 'text';
            textSpan.style.webkitBackgroundClip = 'text';
            textSpan.style.color = 'transparent';
            textSpan.style.backgroundPosition = '-200% 0';
            textSpan.style.fontWeight = '700';
            textSpan.style.fontSize = '1.1rem';
            
            glimmerLoop(textSpan);
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
    if (costText && !costText.classList.contains('glimmer-applied')) {
        costText.classList.add('glimmer-applied');
        
        const originalText = costText.textContent;
        costText.innerHTML = `<span class="glimmer-text">${originalText}</span>`;
        
        const textSpan = costText.querySelector('.glimmer-text');
        textSpan.style.background = 'linear-gradient(90deg, #FFD700 0%, #FFD700 30%, #FFFFFF 50%, #FFD700 70%, #FFD700 100%)';
        textSpan.style.backgroundSize = '200% 100%';
        textSpan.style.backgroundClip = 'text';
        textSpan.style.webkitBackgroundClip = 'text';
        textSpan.style.color = 'transparent';
        textSpan.style.backgroundPosition = '-200% 0';
        textSpan.style.fontWeight = '700';
        textSpan.style.fontSize = '1.1rem';
        
        glimmerLoop(textSpan);
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
