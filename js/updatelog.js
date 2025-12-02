// js/updatelog.js

// ===== Update Log & Creator Information Display =====
// Displays game updates and creator details on the landing page

// Update log data
const UPDATE_LOG = {
    version: "Update 1",
    features: [
        { icon: "🏝️", text: "New Island" },
        { icon: "🥚", text: "2 New Eggs" },
        { icon: "🐾", text: "17 New Pets" },
        { icon: "⭐", text: "3 New Secrets" },
        { icon: "🛒", text: "Triple Hatch is now free!" }
    ]
};

// Creator information
const CREATORS = {
    studio: {
        name: "Cursor Makers",
        url: "https://www.roblox.com/communities/35881183/Cursor-Makers#!/about"
    },
    owners: [
        {
            name: "Dob",
            url: "https://www.roblox.com/users/63531881/profile"
        },
        {
            name: "Zood",
            url: "https://www.roblox.com/users/85126038/profile"
        }
    ]
};

// Generate update features HTML
function generateUpdateFeatures() {
    return UPDATE_LOG.features.map(feature => `
        <li>
            <span class="feature-icon">${feature.icon}</span>
            ${feature.text}
        </li>
    `).join('');
}

// Generate creator links HTML
function generateCreatorLinks() {
    return CREATORS.owners.map(owner => `
        <a href="${owner.url}" target="_blank" rel="noopener noreferrer" class="creator-link">
            ${owner.name}
        </a>
    `).join('');
}

// Build complete welcome page HTML
function buildWelcomePageHTML() {
    return `
        <div class="welcome">
            <h2>Welcome to Tap Simulator Wiki</h2>
            <p>Select an egg from the sidebar to view pet details and evolution stats.</p>
            
            <!-- Update Log Section -->
            <div class="update-section">
                <h3><span class="gem-icon">💎</span> ${UPDATE_LOG.version} is out!</h3>
                <ul class="update-list">
                    ${generateUpdateFeatures()}
                </ul>
            </div>

            <!-- Creator Information Section -->
            <div class="creator-section">
                <p class="creator-text">
                    Created by ${generateCreatorLinks()} • Studio: 
                    <a href="${CREATORS.studio.url}" target="_blank" rel="noopener noreferrer" class="creator-link">
                        ${CREATORS.studio.name}
                    </a>
                </p>
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

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUpdateLog);
} else {
    initializeUpdateLog();
}

// js/updatelog.js
