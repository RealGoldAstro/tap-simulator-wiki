// js/updatelog.js

// ===== Update Log & Creator Information Display =====
// Displays game updates and creator details on the landing page

// Update log data
const UPDATE_LOG = {
    version: "Update 1",
    gem: "💎",
    features: [
        { icon: "🏝️", text: "New Island", highlight: true },
        { icon: "🥚", text: "2 New Eggs", highlight: false },
        { icon: "🐾", text: "17 New Pets", highlight: true },
        { icon: "⭐", text: "3 New Secrets", highlight: false },
        { icon: "🛒", text: "Triple Hatch is now free!", highlight: true }
    ],
    playLink: "https://www.roblox.com/games/75992362647444/Tap-Simulator"
};

// Creator information
const CREATORS = {
    studio: {
        name: "Cursor Makers",
        url: "https://www.roblox.com/communities/35881183/Cursor-Makers#!/about",
        badge: "🎮"
    },
    owners: [
        {
            name: "Dob",
            url: "https://www.roblox.com/users/63531881/profile",
            role: "Lead Developer"
        },
        {
            name: "Zood",
            url: "https://www.roblox.com/users/85126038/profile",
            role: "Co-Developer"
        }
    ]
};

// Generate update features HTML with staggered animation
function generateUpdateFeatures() {
    return UPDATE_LOG.features.map((feature, index) => {
        const highlightClass = feature.highlight ? 'feature-highlight' : '';
        return `
            <li class="feature-item ${highlightClass}" style="animation-delay: ${index * 0.1}s;">
                <span class="feature-icon">${feature.icon}</span>
                <span class="feature-text">${feature.text}</span>
                ${feature.highlight ? '<span class="new-badge">NEW</span>' : ''}
            </li>
        `;
    }).join('');
}

// Generate creator links HTML
function generateCreatorLinks() {
    return CREATORS.owners.map((owner, index) => `
        <div class="owner-card" style="animation-delay: ${0.3 + index * 0.1}s;">
            <a href="${owner.url}" target="_blank" rel="noopener noreferrer" class="creator-link owner-link">
                <span class="owner-name">${owner.name}</span>
                <span class="owner-role">${owner.role}</span>
            </a>
        </div>
    `).join('');
}

// Build complete welcome page HTML
function buildWelcomePageHTML() {
    return `
        <div class="welcome">
            <div class="welcome-header">
                <h2 class="welcome-title">Welcome to Tap Simulator Wiki</h2>
                <p class="welcome-subtitle">Select an egg from the sidebar to view pet details and evolution stats.</p>
            </div>
            
            <!-- Update Log Section -->
            <div class="update-log-container">
                <div class="update-log-header">
                    <span class="gem-icon">${UPDATE_LOG.gem}</span>
                    <h3 class="update-title">${UPDATE_LOG.version} is out!</h3>
                </div>
                
                <ul class="update-features">
                    ${generateUpdateFeatures()}
                </ul>

                <div class="play-now-section">
                    <a href="${UPDATE_LOG.playLink}" target="_blank" rel="noopener noreferrer" class="play-now-btn">
                        <span class="play-icon">🎮</span>
                        <span>Play Now on Roblox</span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            </div>

            <!-- Creator Information Section -->
            <div class="creator-info-container">
                <div class="creator-section studio-section">
                    <h4 class="section-title">
                        <span class="title-icon">${CREATORS.studio.badge}</span>
                        Game Studio
                    </h4>
                    <a href="${CREATORS.studio.url}" target="_blank" rel="noopener noreferrer" class="creator-link studio-link">
                        <span class="studio-name">${CREATORS.studio.name}</span>
                        <span class="external-link">↗</span>
                    </a>
                </div>
                
                <div class="creator-section owners-section">
                    <h4 class="section-title">
                        <span class="title-icon">👥</span>
                        Game Creators
                    </h4>
                    <div class="owners-list">
                        ${generateCreatorLinks()}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Display update log on welcome screen
function displayUpdateLogOnWelcome() {
    const contentArea = document.getElementById('content');
    
    if (!contentArea) {
        console.warn('⚠️ Content area not found - cannot display update log');
        return;
    }

    contentArea.innerHTML = buildWelcomePageHTML();
    
    // Add entrance animations
    requestAnimationFrame(() => {
        const containers = contentArea.querySelectorAll('.update-log-container, .creator-info-container');
        containers.forEach((container, index) => {
            setTimeout(() => {
                container.classList.add('fade-in-up');
            }, index * 150);
        });
    });
}

// Initialize update log display
function initializeUpdateLog() {
    const contentArea = document.getElementById('content');
    
    if (!contentArea) {
        console.warn('⚠️ Content area not found during initialization');
        return;
    }

    // Check if we're on the welcome screen
    const welcomeSection = contentArea.querySelector('.welcome');
    if (welcomeSection) {
        displayUpdateLogOnWelcome();
    }
}

// Public function to refresh update log (callable from other scripts)
window.refreshUpdateLog = function() {
    displayUpdateLogOnWelcome();
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUpdateLog);
} else {
    initializeUpdateLog();
}

// js/updatelog.js
