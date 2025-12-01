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

// Store original position and styles
let originalStyles = {
    position: 'relative',
    left: '0px',
    top: '0px',
    transform: 'rotate(0deg) scale(1)',
    transition: 'none'
};

// ===== Animation 1: Walking Patrol (LEFT ONLY) =====
function walkingPatrol() {
    return new Promise((resolve) => {
        iconElement.style.transition = 'all 2.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
        
        // Walk left (face left)
        iconElement.style.transform = 'translateX(-80px) scaleX(1)';
        
        setTimeout(() => {
            // Small bounce
            iconElement.style.transition = 'all 0.2s ease-out';
            iconElement.style.transform = 'translateX(-80px) translateY(-8px) scaleX(1)';
            
            setTimeout(() => {
                iconElement.style.transition = 'all 0.2s ease-in';
                iconElement.style.transform = 'translateX(-80px) scaleX(1)';
                
                setTimeout(() => {
                    // Walk back (flip to face right)
                    iconElement.style.transition = 'all 2.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
                    iconElement.style.transform = 'translateX(0px) scaleX(-1)';
                    
                    setTimeout(() => {
                        iconElement.style.transition = 'all 0.3s ease-out';
                        iconElement.style.transform = 'translateX(0px) scaleX(1)';
                        
                        setTimeout(() => {
                            resetIcon();
                            resolve();
                        }, 300);
                    }, 2500);
                }, 800);
            }, 200);
        }, 2500);
    });
}

// ===== Animation 2: Drunk Wobble (LEFT ONLY) =====
function drunkWobble() {
    return new Promise((resolve) => {
        let wobbleCount = 0;
        const maxWobbles = 6;
        
        const wobbleInterval = setInterval(() => {
            const randomRotate = (Math.random() - 0.5) * 15;
            const randomX = -Math.random() * 40; // Only negative (left)
            const randomY = (Math.random() - 0.5) * 12;
            
            iconElement.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            
            wobbleCount++;
            if (wobbleCount >= maxWobbles) {
                clearInterval(wobbleInterval);
                setTimeout(() => {
                    resetIcon();
                    resolve();
                }, 600);
            }
        }, 600);
    });
}

// ===== Animation 3: Happy Bounce =====
function happyBounce() {
    return new Promise((resolve) => {
        let bounceCount = 0;
        const maxBounces = 4;
        
        const bounceInterval = setInterval(() => {
            iconElement.style.transition = 'all 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            
            // Bounce up with slight rotation and squish
            iconElement.style.transform = 'translateY(-15px) rotate(3deg) scaleY(1.08) scaleX(0.97)';
            
            setTimeout(() => {
                // Land with opposite rotation and squash
                iconElement.style.transition = 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
                iconElement.style.transform = 'translateY(0px) rotate(-2deg) scaleY(0.97) scaleX(1.03)';
                
                setTimeout(() => {
                    iconElement.style.transition = 'all 0.2s ease-out';
                    iconElement.style.transform = 'translateY(0px) rotate(0deg) scale(1)';
                }, 150);
            }, 200);
            
            bounceCount++;
            if (bounceCount >= maxBounces) {
                clearInterval(bounceInterval);
                setTimeout(() => {
                    resetIcon();
                    resolve();
                }, 700);
            }
        }, 700);
    });
}

// ===== Animation 4: Curious Wanderer (LEFT ONLY) =====
function curiousWanderer() {
    return new Promise((resolve) => {
        iconElement.style.transition = 'all 1.8s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
        
        // Move to random spot (left only)
        const randomX = -Math.random() * 100 - 30; // Between -30 and -130
        const randomY = (Math.random() - 0.5) * 15;
        iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(10deg)`;
        
        setTimeout(() => {
            // Spin and "look around"
            iconElement.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(-10deg)`;
            
            setTimeout(() => {
                iconElement.style.transition = 'all 0.5s ease-out';
                iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(0deg)`;
                
                setTimeout(() => {
                    // Return home
                    iconElement.style.transition = 'all 1.8s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
                    iconElement.style.transform = 'translate(0px, 0px) rotate(0deg)';
                    
                    setTimeout(() => {
                        resetIcon();
                        resolve();
                    }, 1800);
                }, 800);
            }, 700);
        }, 1800);
    });
}

// ===== Animation 6: Smooth Dancer (LEFT SEMI-CIRCLE) =====
function smoothDancer() {
    return new Promise((resolve) => {
        let angle = 90; // Start from left
        let danceCount = 0;
        const maxDances = 15;
        
        const danceInterval = setInterval(() => {
            angle += 12; // Degrees per step
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * 60; // Left-side semi-circle
            const y = Math.sin(radians) * 20;
            const rotation = (angle - 90) / 3;
            const scale = 1 + Math.sin(radians) * 0.05;
            
            iconElement.style.transition = 'all 0.35s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
            iconElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
            
            danceCount++;
            if (danceCount >= maxDances) {
                clearInterval(danceInterval);
                setTimeout(() => {
                    resetIcon();
                    resolve();
                }, 350);
            }
        }, 350);
    });
}

// ===== Reset Icon to Original Position =====
function resetIcon() {
    iconElement.style.transition = 'all 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
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
