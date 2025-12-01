// js/iconanimation.js

// ===== Icon Animation Configuration =====
const ICON_CONFIG = {
    waitTime: 10000,        // 10 seconds between animations
    initialWait: 10000      // 10 seconds wait on page load
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

// ===== Animation 1: Walking Patrol =====
function walkingPatrol() {
    return new Promise((resolve) => {
        iconElement.style.transition = 'all 3s ease-in-out';
        
        // Walk right
        iconElement.style.transform = 'translateX(150px) scaleX(-1)';
        
        setTimeout(() => {
            // Small bounce
            iconElement.style.transform = 'translateX(150px) translateY(-10px) scaleX(-1)';
            
            setTimeout(() => {
                iconElement.style.transform = 'translateX(150px) scaleX(-1)';
                
                setTimeout(() => {
                    // Walk back (flip to face left)
                    iconElement.style.transform = 'translateX(0px) scaleX(1)';
                    
                    setTimeout(() => {
                        resetIcon();
                        resolve();
                    }, 3000);
                }, 1000);
            }, 300);
        }, 3000);
    });
}

// ===== Animation 2: Drunk Wobble =====
function drunkWobble() {
    return new Promise((resolve) => {
        let wobbleCount = 0;
        const maxWobbles = 6;
        
        const wobbleInterval = setInterval(() => {
            const randomRotate = (Math.random() - 0.5) * 20;
            const randomX = (Math.random() - 0.5) * 30;
            const randomY = (Math.random() - 0.5) * 15;
            
            iconElement.style.transition = 'all 0.5s ease-in-out';
            iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            
            wobbleCount++;
            if (wobbleCount >= maxWobbles) {
                clearInterval(wobbleInterval);
                setTimeout(() => {
                    resetIcon();
                    resolve();
                }, 500);
            }
        }, 500);
    });
}

// ===== Animation 3: Happy Bounce =====
function happyBounce() {
    return new Promise((resolve) => {
        let bounceCount = 0;
        const maxBounces = 5;
        
        const bounceInterval = setInterval(() => {
            iconElement.style.transition = 'all 0.3s ease-out';
            
            // Bounce up with slight rotation and squish
            iconElement.style.transform = 'translateY(-20px) rotate(5deg) scaleY(1.1) scaleX(0.95)';
            
            setTimeout(() => {
                // Land with opposite rotation and squash
                iconElement.style.transform = 'translateY(0px) rotate(-3deg) scaleY(0.95) scaleX(1.05)';
                
                setTimeout(() => {
                    iconElement.style.transform = 'translateY(0px) rotate(0deg) scale(1)';
                }, 150);
            }, 150);
            
            bounceCount++;
            if (bounceCount >= maxBounces) {
                clearInterval(bounceInterval);
                setTimeout(() => {
                    resetIcon();
                    resolve();
                }, 600);
            }
        }, 600);
    });
}

// ===== Animation 4: Curious Wanderer =====
function curiousWanderer() {
    return new Promise((resolve) => {
        iconElement.style.transition = 'all 2s ease-in-out';
        
        // Move to random spot
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 20;
        iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(15deg)`;
        
        setTimeout(() => {
            // Spin and "look around"
            iconElement.style.transition = 'all 0.8s ease-in-out';
            iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(-15deg)`;
            
            setTimeout(() => {
                iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(0deg)`;
                
                setTimeout(() => {
                    // Return home
                    iconElement.style.transition = 'all 2s ease-in-out';
                    iconElement.style.transform = 'translate(0px, 0px) rotate(0deg)';
                    
                    setTimeout(() => {
                        resetIcon();
                        resolve();
                    }, 2000);
                }, 1000);
            }, 800);
        }, 2000);
    });
}

// ===== Animation 6: Smooth Dancer =====
function smoothDancer() {
    return new Promise((resolve) => {
        let angle = 0;
        let danceCount = 0;
        const maxDances = 20;
        
        const danceInterval = setInterval(() => {
            angle += 18; // 18 degrees per step = 20 steps for full circle
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * 50;
            const y = Math.sin(radians) * 15;
            const rotation = angle / 2;
            
            iconElement.style.transition = 'all 0.3s ease-in-out';
            iconElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${1 + Math.sin(radians) * 0.1})`;
            
            danceCount++;
            if (danceCount >= maxDances) {
                clearInterval(danceInterval);
                setTimeout(() => {
                    resetIcon();
                    resolve();
                }, 300);
            }
        }, 300);
    });
}

// ===== Reset Icon to Original Position =====
function resetIcon() {
    iconElement.style.transition = 'all 0.5s ease-out';
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
    
    // Wait 10 seconds before next animation
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
    
    // Wait 10 seconds after page load, then start animation loop
    setTimeout(playRandomAnimation, ICON_CONFIG.initialWait);
})();

// js/iconanimation.js
