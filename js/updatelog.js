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

// Initialize update log display
function initializeUpdateLog() {
    const contentArea = document.getElementById('content');
    
    // Validation check
    if (!contentArea) {
        console.warn('⚠️ Content area not found for update log');
        return;
    }

    // Check if we're on the welcome screen
    const welcomeSection = contentArea.querySelector('.welcome');
    if (welcomeSection) {
        displayUpdateLogOnWelcome();
    }
}

// Display update log on welcome screen
function displayUpdateLogOnWelcome() {
    const contentArea = document.getElementById('content');
    
    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }

    // Build HTML for update log
    const updateHTML = `
        <div class="welcome">
            <h2>Welcome to Tap Simulator Wiki</h2>
            <p>Select an egg from the sidebar to view pet details and evolution stats.</p>
            
            <!-- Update Log Section -->
            <div class="update-log-container">
                <div class="update-log-header">
                    <span class="gem-icon">💎</span>
                    <h3>${UPDATE_LOG.version} is out!</h3>
                </div>
                <ul class="update-features">
                    ${UPDATE_LOG.features.map(feature => `
                        <li>
                            <span class="feature-icon">${feature.icon}</span>
                            <span class="feature-text">${feature.text}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Creator Information Section -->
            <div class="creator-info-container">
                <div class="creator-section">
                    <h4>Game Studio</h4>
                    <a href="${CREATORS.studio.url}" target="_blank" rel="noopener noreferrer" class="creator-link studio-link">
                        ${CREATORS.studio.name}
                    </a>
                </div>
                
                <div class="creator-section">
                    <h4>Game Creators</h4>
                    <div class="owners-list">
                        ${CREATORS.owners.map(owner => `
                            <a href="${owner.url}" target="_blank" rel="noopener noreferrer" class="creator-link owner-link">
                                ${owner.name}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    contentArea.innerHTML = updateHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeUpdateLog();
});

// js/updatelog.js
