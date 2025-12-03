
// js/sidebar.js

// ===== Sidebar Generation =====
// Dynamically generates sidebar from WIKI_DATA

// Update log data with dates
const UPDATE_LOGS = [
    {
        version: "Update 1",

        date: { date: "December 2, 2025", time: "8:00 GMT" },
        content: [
            {
                type: 'feature-list',
                items: [
                    { icon: "🏝️", text: "New Island", subtext: "Sakura Island Added" },
                    { icon: "🥚", text: "2 New Eggs", subtext: "Sakura Egg & Void Egg" },
                    { icon: "🐾", text: "17 New Pets" },
                    { icon: "⭐", text: "3 New Secrets" },
                    { icon: "🛒", text: "Triple Hatch is now free!" }
                ]
            },
            // Example of how to add an image:
            // { 
            //     type: 'image', 
            //     src: 'assets/update1_preview.png', 
            //     caption: 'New Sakura Island Preview' 
            // },
            // Example of text block:
            // {
            //     type: 'text',
            //     text: 'Explore the new island and discover hidden secrets!'
            // }
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

    // Loop through each world
    for (const worldName in WIKI_DATA) {
        const worldSection = createWorldSection(worldName, WIKI_DATA[worldName]);
        sidebarContent.appendChild(worldSection);
    }

    // Add updates section at the bottom
    const updatesSection = createUpdatesSection();
    sidebarContent.appendChild(updatesSection);
}

// ===== Create Updates Section =====
function createUpdatesSection() {
    const updatesDiv = document.createElement('div');
    updatesDiv.className = 'world-section updates-section';

    // Updates header (clickable button, no dropdown)
    const updatesHeader = document.createElement('div');
    updatesHeader.className = 'world-header no-arrow'; // Added no-arrow class
    updatesHeader.textContent = 'Updates';

    // Remove the arrow/collapsed class logic
    updatesHeader.classList.remove('collapsed');

    // Add click event to show all updates
    updatesHeader.addEventListener('click', () => {
        // Highlight this section
        document.querySelectorAll('.world-header').forEach(h => h.classList.remove('active-section'));
        updatesHeader.classList.add('active-section');

        // Show the updates page
        displayAllUpdates();
    });

    updatesDiv.appendChild(updatesHeader);
    return updatesDiv;
}

// ===== Display All Updates (Single Page) =====
function displayAllUpdates() {
    const contentArea = document.getElementById('content');

    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }

    // Generate HTML for all updates
    let updatesHTML = `
        <div class="updates-page-container">
            <div class="updates-page-header">
                <h2>Update Log</h2>
                <p>Track the latest changes and additions to the game.</p>
            </div>
            <div class="updates-timeline">
    `;

    // Loop through updates (assuming UPDATE_LOGS is ordered new -> old, if not we might need to sort)
    const reversedLogs = [...UPDATE_LOGS].reverse();

    reversedLogs.forEach((update) => {
        updatesHTML += `
            <div class="update-entry">
                <div class="update-entry-header">
                    <div class="update-version-title">${update.version}</div>
                    <div class="update-timestamp">${formatLocalTime(update.date)}</div>
                </div>
                <div class="update-entry-content">
        `;

        // Render content based on type
        if (update.content && Array.isArray(update.content)) {
            update.content.forEach(block => {
                if (block.type === 'feature-list') {
                    updatesHTML += `
                        <ul class="update-features-list-page">
                            ${block.items.map(feature => `
                                <li>
                                    <span class="feature-icon-page">${feature.icon}</span>
                                    <div class="feature-content-wrapper">
                                        <span class="feature-text-page">${feature.text}</span>
                                        ${feature.subtext ? `<span class="feature-subtext-page">${feature.subtext}</span>` : ''}
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                } else if (block.type === 'image') {
                    updatesHTML += `
                        <div class="update-content-image-wrapper">
                            <img src="${block.src}" alt="${block.caption || 'Update Image'}" class="update-content-image">
                            ${block.caption ? `<div class="update-image-caption">${block.caption}</div>` : ''}
                        </div>
                    `;
                } else if (block.type === 'header') {
                    updatesHTML += `<h3 class="update-content-header">${block.text}</h3>`;
                } else if (block.type === 'text') {
                    updatesHTML += `<p class="update-content-text">${block.text}</p>`;
                }
            });
        }

        updatesHTML += `
                </div>
            </div>
        `;
    });

    updatesHTML += `
            </div>
        </div>
    `;

    contentArea.innerHTML = updatesHTML;

    // Scroll to top
    contentArea.scrollTop = 0;
}

// ===== Format Local Time =====
function formatLocalTime(dateObj) {
    // Handle legacy string format
    if (typeof dateObj === 'string') return dateObj;

    const { date, time } = dateObj;
    const fullString = `${date} ${time}`;
    const dateObjParsed = new Date(fullString);

    // Check if valid
    if (isNaN(dateObjParsed.getTime())) {
        return `${date} (${time})`; // Fallback
    }

    // Format to local string
    return dateObjParsed.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
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
