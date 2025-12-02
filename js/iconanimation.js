// js/iconanimation.js

// ===== Icon Animation Configuration =====
const ICON_CONFIG = {
    waitTime: 5000,         // 5 seconds between animations
    initialWait: 5000       // 5 seconds wait on page load
};

// ===== Get Icon Element =====
const iconElement = document.querySelector('.game-icon-placeholder');

// Validation check
if (!iconElement) {
    console.warn('⚠️ Game icon element not found');
}

// ===== Animation 7: Number Speech Bubble =====
function numberBubble() {
    return new Promise((resolve) => {
        // Create speech bubble element
        const bubble = document.createElement('div');
        bubble.textContent = '67';
        bubble.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.05);
            color: white;
            padding: 8px 14px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
        `;
        
        // Add triangle pointer
        const pointer = document.createElement('div');
        pointer.style.cssText = `
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid rgba(255, 255, 255, 0.05);
        `;
        bubble.appendChild(pointer);
        
        iconElement.appendChild(bubble);
        
        // Fade in
        setTimeout(() => {
            bubble.style.opacity = '1';
        }, 50);
        
        // Stay for 3 seconds then fade out
        setTimeout(() => {
            bubble.style.opacity = '0';
            
            setTimeout(() => {
                bubble.remove();
                resolve();
            }, 300);
        }, 3000);
    });
}

// ===== Animation 8: Tap In Speech Bubble =====
function tapInBubble() {
    return new Promise((resolve) => {
        // Create speech bubble element
        const bubble = document.createElement('div');
        bubble.textContent = 'TAP IN';
        bubble.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.05);
            color: white;
            padding: 8px 14px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
        `;
        
        // Add triangle pointer
        const pointer = document.createElement('div');
        pointer.style.cssText = `
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid rgba(255, 255, 255, 0.05);
        `;
        bubble.appendChild(pointer);
        
        iconElement.appendChild(bubble);
        
        // Fade in
        setTimeout(() => {
            bubble.style.opacity = '1';
        }, 50);
        
        // Stay for 3 seconds then fade out
        setTimeout(() => {
            bubble.style.opacity = '0';
            
            setTimeout(() => {
                bubble.remove();
                resolve();
            }, 300);
        }, 3000);
    });
}

// ===== Animation 9: Screen Exit Peek =====
function screenPeeker() {
    return new Promise((resolve) => {
        // Walk off to the right
        iconElement.style.transition = 'all 1.5s ease-in-out';
        iconElement.style.transform = 'translateX(150px) scaleX(-1)';
        
        setTimeout(() => {
            // Jump to far left (off screen)
            iconElement.style.transition = 'none';
            iconElement.style.transform = 'translateX(-120px) scaleX(1)';
            
            setTimeout(() => {
                // Peek out from left
                iconElement.style.transition = 'all 0.6s ease-out';
                iconElement.style.transform = 'translateX(-80px) scaleX(1)';
                
                setTimeout(() => {
                    // Go back to left
                    iconElement.style.transition = 'all 0.5s ease-in';
                    iconElement.style.transform = 'translateX(-120px) scaleX(1)';
                    
                    setTimeout(() => {
                        // Jump back to right side (off screen)
                        iconElement.style.transition = 'none';
                        iconElement.style.transform = 'translateX(150px) scaleX(-1)';
                        
                        setTimeout(() => {
                            // Come back in from right
                            iconElement.style.transition = 'all 1.2s ease-out';
                            iconElement.style.transform = 'translateX(0px) scaleX(1)';
                            
                            setTimeout(() => {
                                resetIcon();
                                resolve();
                            }, 1200);
                        }, 100);
                    }, 500);
                }, 800);
            }, 100);
        }, 1500);
    });
}

// ===== Reset Icon to Original Position =====
function resetIcon() {
    iconElement.style.transition = 'all 0.8s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
    iconElement.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
}

// ===== Animation Selection =====
const animations = [
    walkingPatrol,
    drunkWobble,
    happyBounce,
    curiousWanderer,
    smoothDancer
];

// ===== Play Random Animation =====
async function playRandomAnimation() {
    if (!iconElement) return;
    
    // Pick random animation
    const randomIndex = Math.floor(Math.random() * animations.length);
    const selectedAnimation = animations[randomIndex];
    
    // Play animation and wait for completion
    await selectedAnimation();
    
    // Wait 5 seconds before next animation
    setTimeout(playRandomAnimation, ICON_CONFIG.waitTime);
}

// ===== Initialize Animation System =====
(function initIconAnimation() {
    if (!iconElement) {
        console.warn('⚠️ Cannot initialize icon animation - element not found');
        return;
    }
    
    // Set initial styles
    iconElement.style.position = 'relative';
    iconElement.style.transition = 'all 0.5s ease-out';
    
    // Wait 5 seconds after page load, then start animation loop
    setTimeout(playRandomAnimation, ICON_CONFIG.initialWait);
})();

// js/iconanimation.js
