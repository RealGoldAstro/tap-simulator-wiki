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

// ===== Animation 2: Chaotic Spinner =====
function drunkWobble() {
    return new Promise((resolve) => {
        let wobbleCount = 0;
        const maxWobbles = 8;
        let totalRotation = 0;
        
        const wobbleInterval = setInterval(() => {
            const randomRotate = (Math.random() - 0.5) * 180 + totalRotation;
            totalRotation += (Math.random() - 0.5) * 90;
            const randomX = -Math.random() * 80;
            const randomY = (Math.random() - 0.5) * 25;
            const randomScale = 0.8 + Math.random() * 0.4;
            
            iconElement.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            iconElement.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg) scale(${randomScale})`;
            
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

// ===== Animation 3: Acrobatic Bouncer =====
function happyBounce() {
    return new Promise((resolve) => {
        let bounceCount = 0;
        const maxBounces = 5;
        let rotation = 0;
        
        const bounceInterval = setInterval(() => {
            // Flip while bouncing
            rotation += 360;
            
            iconElement.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            iconElement.style.transform = `translateX(-${bounceCount * 15}px) translateY(-30px) rotate(${rotation}deg) scaleY(1.15)`;
            
            setTimeout(() => {
                iconElement.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                iconElement.style.transform = `translateX(-${bounceCount * 15}px) translateY(0px) rotate(${rotation}deg) scaleY(0.9) scaleX(1.1)`;
                
                setTimeout(() => {
                    iconElement.style.transition = 'all 0.2s ease-out';
                    iconElement.style.transform = `translateX(-${bounceCount * 15}px) rotate(${rotation}deg) scale(1)`;
                }, 200);
            }, 250);
            
            bounceCount++;
            if (bounceCount >= maxBounces) {
                clearInterval(bounceInterval);
                setTimeout(() => {
                    resetIcon();
                    resolve();
                }, 800);
            }
        }, 800);
    });
}

// ===== Animation 4: Curious Explorer =====
function curiousWanderer() {
    return new Promise((resolve) => {
        // Move far left quickly
        iconElement.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        iconElement.style.transform = 'translateX(-120px) translateY(-10px) rotate(20deg) scale(1.1)';
        
        setTimeout(() => {
            // Spin around looking
            iconElement.style.transition = 'all 0.6s ease-in-out';
            iconElement.style.transform = 'translateX(-120px) translateY(-10px) rotate(380deg) scale(1)';
            
            setTimeout(() => {
                // Move up and down curiously
                iconElement.style.transition = 'all 0.5s ease-in-out';
                iconElement.style.transform = 'translateX(-120px) translateY(-25px) rotate(360deg) scale(1.05)';
                
                setTimeout(() => {
                    iconElement.style.transform = 'translateX(-120px) translateY(5px) rotate(360deg) scale(0.95)';
                    
                    setTimeout(() => {
                        iconElement.style.transform = 'translateX(-120px) translateY(-10px) rotate(360deg) scale(1)';
                        
                        setTimeout(() => {
                            // Cartwheel back
                            iconElement.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                            iconElement.style.transform = 'translateX(-60px) translateY(-20px) rotate(540deg) scale(1.2)';
                            
                            setTimeout(() => {
                                iconElement.style.transform = 'translateX(0px) translateY(0px) rotate(720deg) scale(1)';
                                
                                setTimeout(() => {
                                    resetIcon();
                                    resolve();
                                }, 1500);
                            }, 750);
                        }, 600);
                    }, 500);
                }, 500);
            }, 600);
        }, 1200);
    });
}

// ===== Animation 6: Breakdancer =====
function smoothDancer() {
    return new Promise((resolve) => {
        let moveCount = 0;
        const maxMoves = 12;
        let rotation = 0;
        
        const danceInterval = setInterval(() => {
            moveCount++;
            rotation += 45;
            
            // Complex dance moves
            const x = -Math.abs(Math.sin(moveCount * 0.5) * 80);
            const y = Math.cos(moveCount * 0.8) * 20;
            const scale = 1 + Math.sin(moveCount * 0.7) * 0.15;
            
            iconElement.style.transition = 'all 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            
            // Add extra flair every 3rd move
            if (moveCount % 3 === 0) {
                iconElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation + 180}deg) scale(${scale * 1.3})`;
            } else {
                iconElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
            }
            
            if (moveCount >= maxMoves) {
                clearInterval(danceInterval);
                // Final pose spin
                iconElement.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                iconElement.style.transform = 'translate(0px, 0px) rotate(720deg) scale(1)';
                
                setTimeout(() => {
                    resetIcon();
                    resolve();
                }, 600);
            }
        }, 350);
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
