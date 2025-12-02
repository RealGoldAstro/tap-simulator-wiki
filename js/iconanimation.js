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

// Track last played animation
let lastAnimationIndex = -1;

// ===== Animation 1: Excited Walker =====
function walkingPatrol() {
    return new Promise((resolve) => {
        // Walk left with head bob
        iconElement.style.transition = 'all 0.4s ease-in-out';
        iconElement.style.transform = 'translateX(-30px) translateY(-5px) rotate(-5deg) scaleX(1)';
        
        setTimeout(() => {
            iconElement.style.transform = 'translateX(-60px) translateY(0px) rotate(5deg) scaleX(1)';
            
            setTimeout(() => {
                iconElement.style.transform = 'translateX(-90px) translateY(-5px) rotate(-8deg) scaleX(1)';
                
                setTimeout(() => {
                    // Arrive and spin around excitedly
                    iconElement.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                    iconElement.style.transform = 'translateX(-90px) rotate(360deg) scale(1.2)';
                    
                    setTimeout(() => {
                        iconElement.style.transform = 'translateX(-90px) rotate(0deg) scale(1)';
                        
                        setTimeout(() => {
                            // Walk back while looking back
                            iconElement.style.transition = 'all 0.4s ease-in-out';
                            iconElement.style.transform = 'translateX(-60px) rotate(15deg) scaleX(-1)';
                            
                            setTimeout(() => {
                                iconElement.style.transform = 'translateX(-30px) rotate(-10deg) scaleX(-1)';
                                
                                setTimeout(() => {
                                    iconElement.style.transform = 'translateX(0px) rotate(0deg) scaleX(1)';
                                    
                                    setTimeout(() => {
                                        resetIcon();
                                        resolve();
                                    }, 400);
                                }, 400);
                            }, 400);
                        }, 500);
                    }, 500);
                }, 400);
            }, 400);
        }, 400);
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
            top: 50%;
            right: 60px;
            transform: translateY(-50%);
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
            white-space: nowrap;
        `;
        
        // Add triangle pointer (pointing right to icon)
        const pointer = document.createElement('div');
        pointer.style.cssText = `
            position: absolute;
            top: 50%;
            right: -6px;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 6px solid rgba(255, 255, 255, 0.05);
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
        // Get icon position and screen width
        const iconRect = iconElement.getBoundingClientRect();
        const iconCenterX = iconRect.left + (iconRect.width / 2);
        const screenWidth = window.innerWidth;
        
        // Calculate distance to walk off right edge
        const distanceToRightEdge = screenWidth - iconCenterX + 60; // Extra 60px to fully exit
        
        // Calculate position for left edge peek (barely visible)
        const leftEdgeHidePosition = -iconCenterX - 60; // Fully hidden on left
        const leftEdgePeekPosition = -iconCenterX + 7; // Just peeking out slightly
        
        // Walk off to the right with dynamic bobbing
        iconElement.style.transition = 'all 0.5s ease-in-out';
        iconElement.style.transform = `translateX(${distanceToRightEdge * 0.3}px) translateY(-5px) rotate(-8deg) scaleX(-1)`;
        
        setTimeout(() => {
            iconElement.style.transform = `translateX(${distanceToRightEdge * 0.6}px) translateY(0px) rotate(5deg) scaleX(-1)`;
            
            setTimeout(() => {
                iconElement.style.transition = 'all 0.6s ease-in-out';
                iconElement.style.transform = `translateX(${distanceToRightEdge}px) translateY(-5px) rotate(-10deg) scaleX(-1)`;
                
                setTimeout(() => {
                    // Jump to far left (off screen boundary)
                    iconElement.style.transition = 'none';
                    iconElement.style.transform = `translateX(${leftEdgeHidePosition}px) scaleX(1) rotate(0deg)`;
                    
                    setTimeout(() => {
                        // Peek out from left screen boundary slightly with forward tilt (looking at viewer)
                        iconElement.style.transition = 'all 1s ease-out';
                        iconElement.style.transform = `translateX(${leftEdgePeekPosition}px) rotate(15deg) scaleX(1)`;
                        
                        // Stay peeking for 3-5 seconds (random)
                        const peekDuration = 3000 + Math.random() * 2000; // 3-5 seconds
                        
                        setTimeout(() => {
                            // Go back hiding quickly
                            iconElement.style.transition = 'all 0.5s ease-in';
                            iconElement.style.transform = `translateX(${leftEdgeHidePosition}px) rotate(0deg) scaleX(1)`;
                            
                            setTimeout(() => {
                                // Jump back to right side (off screen)
                                iconElement.style.transition = 'none';
                                iconElement.style.transform = `translateX(${distanceToRightEdge}px) scaleX(-1) rotate(0deg)`;
                                
                                setTimeout(() => {
                                    // Walk back in from right with bobbing
                                    iconElement.style.transition = 'all 0.5s ease-in-out';
                                    iconElement.style.transform = `translateX(${distanceToRightEdge * 0.6}px) translateY(-5px) rotate(8deg) scaleX(-1)`;
                                    
                                    setTimeout(() => {
                                        iconElement.style.transform = `translateX(${distanceToRightEdge * 0.3}px) translateY(0px) rotate(-5deg) scaleX(-1)`;
                                        
                                        setTimeout(() => {
                                            iconElement.style.transition = 'all 0.6s ease-out';
                                            iconElement.style.transform = 'translateX(0px) translateY(0px) rotate(0deg) scaleX(1)';
                                            
                                            setTimeout(() => {
                                                resetIcon();
                                                resolve();
                                            }, 600);
                                        }, 500);
                                    }, 500);
                                }, 100);
                            }, 500);
                        }, peekDuration);
                    }, 100);
                }, 600);
            }, 500);
        }, 500);
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
    tapInBubble,
    screenPeeker
];

// ===== Play Random Animation =====
async function playRandomAnimation() {
    if (!iconElement) return;
    
    let randomIndex;
    
    // Pick random animation that's different from last one
    do {
        randomIndex = Math.floor(Math.random() * animations.length);
    } while (randomIndex === lastAnimationIndex && animations.length > 1);
    
    // Update last animation tracker
    lastAnimationIndex = randomIndex;
    
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
