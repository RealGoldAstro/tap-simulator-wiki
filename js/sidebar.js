// js/sidebar.js

// ===== Sidebar Generation =====
// Dynamically generates sidebar from WIKI_DATA

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

(function initSidebar() {
    const sidebarContent = document.querySelector('.sidebar-content');
    
    // Validation check
    if (!sidebarContent) {
        console.warn('⚠️ Sidebar content container not found');
        return;
    }
    
    if (!WIKI_DATA || Object.keys(WIKI_DATA).length === 0) {
        console.warn('⚠️ WIKI_DATA is empty or not loaded');
        sidebarContent.innerHTML = '<p>No data available</p>';
        return;
    }
    
    // Generate sidebar HTML from data
    generateSidebar();
    
    // Initialize footer
    initializeFooter();
})();

// ===== Generate Sidebar Function =====
function generateSidebar() {
    const sidebarContent = document.querySelector('.sidebar-content');
    sidebarContent.innerHTML = ''; // Clear existing content
    
    // Add update log dropdown at the bottom
    const updateSection = createUpdateSection();
    
    // Loop through each world
    for (const worldName in WIKI_DATA) {
        const worldSection = createWorldSection(worldName, WIKI_DATA[worldName]);
        sidebarContent.appendChild(worldSection);
    }
    
    // Append update section at the bottom
    sidebarContent.appendChild(updateSection);
}

// ===== Create Update Section =====
function createUpdateSection() {
    const updateDiv = document.createElement('div');
    updateDiv.className = 'update-section-sidebar';
    
    const currentUpdate = UPDATE_LOGS[currentUpdateIndex];
    
    updateDiv.innerHTML = `
        <div class="update-header-sidebar" id="updateHeaderSidebar">
            <span class="gem-icon">💎</span>
            <div class="update-info-sidebar">
                <span class="update-version-sidebar">${currentUpdate.version}</span>
                <span class="update-date-sidebar">${currentUpdate.date}</span>
            </div>
            <span class="dropdown-arrow-sidebar">▲</span>
        </div>
        <div class="update-dropdown-sidebar collapsed" id="updateDropdownSidebar">
            <div class="update-options-sidebar">
                ${UPDATE_LOGS.map((update, index) => `
                    <div class="update-option-sidebar" data-index="${index}">
                        <span class="update-version">${update.version}</span>
                        <span class="update-date">${update.date}</span>
                    </div>
                `).join('')}
            </div>
            <div class="update-content-sidebar">
                <ul class="update-list-sidebar">
                    ${currentUpdate.features.map(feature => `
                        <li>
                            <span class="feature-icon">${feature.icon}</span>
                            <span class="feature-text">${feature.text}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Add event listeners after appending
    setTimeout(() => {
        setupUpdateSidebarListeners();
    }, 0);
    
    return updateDiv;
}

// ===== Setup Update Sidebar Listeners =====
function setupUpdateSidebarListeners() {
    const header = document.getElementById('updateHeaderSidebar');
    const dropdown = document.getElementById('updateDropdownSidebar');
    
    if (!header || !dropdown) {
        console.warn('⚠️ Update sidebar elements not found');
        return;
    }
    
    // Toggle dropdown
    header.addEventListener('click', () => {
        dropdown.classList.toggle('collapsed');
        header.classList.toggle('active');
    });
    
    // Update option clicks
    const options = document.querySelectorAll('.update-option-sidebar');
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(option.getAttribute('data-index'));
            changeUpdateSidebar(index);
        });
    });
}

// ===== Change Update in Sidebar =====
function changeUpdateSidebar(index) {
    if (index < 0 || index >= UPDATE_LOGS.length) {
        console.warn('⚠️ Invalid update index');
        return;
    }
    
    currentUpdateIndex = index;
    const currentUpdate = UPDATE_LOGS[index];
    
    // Update header text
    const header = document.getElementById('updateHeaderSidebar');
    if (header) {
        header.querySelector('.update-version-sidebar').textContent = currentUpdate.version;
        header.querySelector('.update-date-sidebar').textContent = currentUpdate.date;
    }
    
    // Update content
    const contentList = document.querySelector('.update-list-sidebar');
    if (contentList) {
        contentList.innerHTML = currentUpdate.features.map(feature => `
            <li>
                <span class="feature-icon">${feature.icon}</span>
                <span class="feature-text">${feature.text}</span>
            </li>
        `).join('');
    }
}

// ===== Create World Section =====
function createWorldSection(worldName, eggs) {
    // World container
    const worldDiv = document.createElement('div');
    worldDiv.className = 'world-section';
    
    // World header (clickable to collapse/expand) - collapsed by default
    const worldHeader = document.createElement('div');
    worldHeader.className = 'world-header collapsed';
    worldHeader.textContent = worldName;
    worldHeader.addEventListener('click', () => toggleWorld(worldHeader));
    
    // Egg list container - collapsed by default
    const eggList = document.createElement('div');
    eggList.className = 'egg-list collapsed';
    
    // Loop through each egg in this world
    for (const eggName in eggs) {
        const eggItem = createEggItem(eggName, eggs[eggName], worldName);
        eggList.appendChild(eggItem);
    }
    
    // Append header and list to world section
    worldDiv.appendChild(worldHeader);
    worldDiv.appendChild(eggList);
    
    return worldDiv;
}

// ===== Create Egg Item =====
function createEggItem(eggName, eggData, worldName) {
    const eggDiv = document.createElement('div');
    eggDiv.className = 'egg-item';
    eggDiv.textContent = eggName;
    
    // Click event to display egg details (passes entire egg data with cost and pets)
    eggDiv.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent world toggle
        selectEgg(eggDiv, eggName, eggData, worldName);
    });
    
    return eggDiv;
}

// ===== Toggle World Collapse/Expand =====
function toggleWorld(worldHeader) {
    const eggList = worldHeader.nextElementSibling;
    
    if (!eggList) {
        console.warn('⚠️ Egg list not found for world section');
        return;
    }
    
    // Toggle collapsed state
    worldHeader.classList.toggle('collapsed');
    eggList.classList.toggle('collapsed');
}

// ===== Select Egg =====
function selectEgg(eggElement, eggName, eggData, worldName) {
    // Remove active class from all eggs
    document.querySelectorAll('.egg-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected egg
    eggElement.classList.add('active');
    
    // Trigger content display (content.js will handle this)
    if (typeof displayEggDetails === 'function') {
        displayEggDetails(eggName, eggData, worldName);
    } else {
        console.warn('⚠️ displayEggDetails function not found - content.js may not be loaded');
    }
}

// ===== Show Welcome Page =====
function showWelcomePage() {
    const contentArea = document.getElementById('content');
    
    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }
    
    // Remove active class from all eggs
    document.querySelectorAll('.egg-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Display welcome content
    contentArea.innerHTML = `
        <div class="welcome">
            <h2>Welcome to Tap Simulator Wiki</h2>
            <p>Select an egg from the sidebar to view pet details and evolution stats.</p>
        </div>
    `;
}

// ===== Create Footer =====
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

// ===== Initialize Footer =====
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

// ===== Add Click Handler to Header Title =====
document.addEventListener('DOMContentLoaded', () => {
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.style.cursor = 'pointer';
        headerTitle.addEventListener('click', showWelcomePage);
    }
});

// js/sidebar.js
