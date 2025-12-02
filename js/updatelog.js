// js/updatelog.js

// ===== Update Log & Creator Information Display =====
// Displays game updates with dropdown and footer creator info

// Update log data with dates
const UPDATE_LOGS = [
    {
        version: "Update 1",
        date: "December 2, 2025",
        features: [
            { icon: "🏝️", text: "New Island" },
            { icon: "🥚", text: "2 New Eggs" },
            { icon: "🐾", text: "17 New Pets" },
            { icon: "⭐", text: "3 New Secrets" },
            { icon: "🛒", text: "Triple Hatch is now free!" }
        ]
    }
    // Add more updates here in the future
];

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

let currentUpdateIndex = 0;

// Generate update features HTML
function generateUpdateFeatures(features) {
    return features.map(feature => `
        <li>
            <span class="feature-icon">${feature.icon}</span>
            ${feature.text}
        </li>
    `).join('');
}

// Generate update dropdown options
function generateUpdateOptions() {
    return UPDATE_LOGS.map((update, index) => `
        <div class="update-option" data-index="${index}">
            <span class="update-version">${update.version}</span>
            <span class="update-date">${update.date}</span>
        </div>
    `).join('');
}

// Build update log HTML
function buildUpdateLogHTML() {
    const currentUpdate = UPDATE_LOGS[currentUpdateIndex];
    
    return `
        <div class="update-log-center">
            <div class="update-dropdown-container">
                <button class="update-dropdown-btn" id="updateDropdownBtn">
                    <span class="update-info">
                        <span class="gem-icon">💎</span>
                        <span class="update-version-text">${currentUpdate.version}</span>
                        <span class="update-date-text">${currentUpdate.date}</span>
                    </span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                
                <div class="update-dropdown-menu" id="updateDropdownMenu">
                    ${generateUpdateOptions()}
                </div>
            </div>
            
            <div class="update-content" id="updateContent">
                <ul class="update-list">
                    ${generateUpdateFeatures(currentUpdate.features)}
                </ul>
            </div>
        </div>
    `;
}

// Build complete welcome page HTML
function buildWelcomePageHTML() {
    return `
        <div class="welcome">
            <h2>Welcome to Tap Simulator Wiki</h2>
            <p>Select an egg from the sidebar to view pet details and evolution stats.</p>
            
            ${buildUpdateLogHTML()}
        </div>
    `;
}

// Create footer element
function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="footer-content">
            <span class="footer-text">Created by</span>
            <a href="${CREATORS.owners[0].url}" target="_blank" rel="noopener noreferrer" class="footer-link">
                ${CREATORS.owners[0].name}
            </a>
            <span class="footer-separator">•</span>
            <a href="${CREATORS.owners[1].url}" target="_blank" rel="noopener noreferrer" class="footer-link">
                ${CREATORS.owners[1].name}
            </a>
            <span class="footer-separator">•</span>
            <span class="footer-text">Studio:</span>
            <a href="${CREATORS.studio.url}" target="_blank" rel="noopener noreferrer" class="footer-link">
                ${CREATORS.studio.name}
            </a>
        </div>
    `;
    return footer;
}

// Initialize footer
function initializeFooter() {
    // Check if footer already exists
    let footer = document.querySelector('.site-footer');
    if (footer) {
        footer.remove();
    }
    
    // Create and append new footer
    footer = createFooter();
    document.body.appendChild(footer);
}

// Toggle dropdown menu
function toggleDropdown() {
    const menu = document.getElementById('updateDropdownMenu');
    const btn = document.getElementById('updateDropdownBtn');
    
    if (!menu || !btn) {
        console.warn('⚠️ Dropdown elements not found');
        return;
    }
    
    const isOpen = menu.classList.contains('show');
    
    if (isOpen) {
        menu.classList.remove('show');
        btn.classList.remove('active');
    } else {
        menu.classList.add('show');
        btn.classList.add('active');
    }
}

// Change update version
function changeUpdate(index) {
    if (index < 0 || index >= UPDATE_LOGS.length) {
        console.warn('⚠️ Invalid update index');
        return;
    }
    
    currentUpdateIndex = index;
    const currentUpdate = UPDATE_LOGS[index];
    
    // Update button text
    const btn = document.getElementById('updateDropdownBtn');
    if (btn) {
        btn.querySelector('.update-version-text').textContent = currentUpdate.version;
        btn.querySelector('.update-date-text').textContent = currentUpdate.date;
    }
    
    // Update content
    const content = document.getElementById('updateContent');
    if (content) {
        content.querySelector('.update-list').innerHTML = generateUpdateFeatures(currentUpdate.features);
    }
    
    // Close dropdown
    toggleDropdown();
}

// Setup event listeners
function setupUpdateLogListeners() {
    // Dropdown button click
    const dropdownBtn = document.getElementById('updateDropdownBtn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });
    }
    
    // Update option clicks
    const options = document.querySelectorAll('.update-option');
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(option.getAttribute('data-index'));
            changeUpdate(index);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('updateDropdownMenu');
        const btn = document.getElementById('updateDropdownBtn');
        
        if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.remove('show');
            btn.classList.remove('active');
        }
    });
}

// Display update log on welcome screen
function displayUpdateLogOnWelcome() {
    const contentArea = document.getElementById('content');
    
    if (!contentArea) {
        console.warn('⚠️ Content area not found - cannot display update log');
        return;
    }

    contentArea.innerHTML = buildWelcomePageHTML();
    setupUpdateLogListeners();
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
    
    // Initialize footer
    initializeFooter();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUpdateLog);
} else {
    initializeUpdateLog();
}

// js/updatelog.js
