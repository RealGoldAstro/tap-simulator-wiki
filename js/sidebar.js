// js/sidebar.js

// -- Root/sidebar.js

// ===== Sidebar Generation =====
// Dynamically generates sidebar from WIKI_DATA and handles Updates section + footer

// Update log data with dates
const UPDATE_LOGS = [
    {
        version: "Update 1",
        date: "Dec 2, 2025",
        features: [
            { icon: "🏝️", text: "New Island" },
            { icon: "🥚", text: "2 New Eggs" },
            { icon: "🐾", text: "17 New Pets" },
            { icon: "⭐", text: "3 New Secrets" },
            { icon: "🛒", text: "Triple Hatch is now free!" }
        ]
    }
    // Add more updates here (Update 2, 3, etc)
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

    if (!window.WIKI_DATA || Object.keys(WIKI_DATA).length === 0) {
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

// ===== Create Updates Section (behaves like worlds/eggs) =====
function createUpdatesSection() {
    const updatesWrapper = document.createElement('div');
    updatesWrapper.className = 'world-section updates-section-bottom';

    // Header: "Updates" behaves like world headers
    const updatesHeader = document.createElement('div');
    updatesHeader.className = 'world-header collapsed';
    updatesHeader.textContent = 'Updates';

    updatesHeader.addEventListener('click', () => toggleWorld(updatesHeader));

    // List of updates (looks like eggs)
    const updatesList = document.createElement('div');
    updatesList.className = 'egg-list collapsed';

    UPDATE_LOGS.forEach((update, index) => {
        const updateItem = document.createElement('div');
        updateItem.className = 'egg-item update-item';
        updateItem.innerHTML = `
            <span class="update-name">${update.version}</span>
            <span class="update-date-small">• ${update.date}</span>
        `;

        updateItem.addEventListener('click', (e) => {
            e.stopPropagation();
            selectUpdate(updateItem, update, index);
        });

        updatesList.appendChild(updateItem);
    });

    updatesWrapper.appendChild(updatesHeader);
    updatesWrapper.appendChild(updatesList);

    return updatesWrapper;
}

// ===== Select Update (sidebar item) =====
function selectUpdate(updateElement, updateData) {
    // Clear active from all egg/update items
    document.querySelectorAll('.egg-item').forEach(item => item.classList.remove('active'));

    // Mark selected update
    updateElement.classList.add('active');

    // Show update details in main content
    displayUpdateDetails(updateData);
}

// ===== Display Update Details in Content Area =====
function displayUpdateDetails(updateData) {
    const contentArea = document.getElementById('content');

    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }

    const html = `
        <div class="update-details">
            <div class="update-details-header">
                <div class="update-title-section">
                    <span class="gem-icon-large">💎</span>
                    <h2 class="update-details-title">${updateData.version} is out!</h2>
                </div>
                <div class="update-date-large">${updateData.date}</div>
            </div>

            <div class="update-features-grid">
                ${updateData.features.map(f => `
                    <div class="feature-card">
                        <span class="feature-card-icon">${f.icon}</span>
                        <span class="feature-card-text">${f.text}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    contentArea.innerHTML = html;
}

// ===== World / Egg Logic (unchanged) =====
function createWorldSection(worldName, eggs) {
    const worldDiv = document.createElement('div');
    worldDiv.className = 'world-section';

    const worldHeader = document.createElement('div');
    worldHeader.className = 'world-header collapsed';
    worldHeader.textContent = worldName;
    worldHeader.addEventListener('click', () => toggleWorld(worldHeader));

    const eggList = document.createElement('div');
    eggList.className = 'egg-list collapsed';

    for (const eggName in eggs) {
        const eggItem = createEggItem(eggName, eggs[eggName], worldName);
        eggList.appendChild(eggItem);
    }

    worldDiv.appendChild(worldHeader);
    worldDiv.appendChild(eggList);

    return worldDiv;
}

function createEggItem(eggName, eggData, worldName) {
    const eggDiv = document.createElement('div');
    eggDiv.className = 'egg-item';
    eggDiv.textContent = eggName;

    eggDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        selectEgg(eggDiv, eggName, eggData, worldName);
    });

    return eggDiv;
}

function toggleWorld(worldHeader) {
    const eggList = worldHeader.nextElementSibling;

    if (!eggList) {
        console.warn('⚠️ Egg list not found for world section');
        return;
    }

    worldHeader.classList.toggle('collapsed');
    eggList.classList.toggle('collapsed');
}

function selectEgg(eggElement, eggName, eggData, worldName) {
    document.querySelectorAll('.egg-item').forEach(item => item.classList.remove('active'));
    eggElement.classList.add('active');

    if (typeof displayEggDetails === 'function') {
        displayEggDetails(eggName, eggData, worldName);
    } else {
        console.warn('⚠️ displayEggDetails function not found - content.js may not be loaded');
    }
}

// ===== Welcome Page (header title click) =====
function showWelcomePage() {
    const contentArea = document.getElementById('content');

    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }

    document.querySelectorAll('.egg-item').forEach(item => item.classList.remove('active'));

    contentArea.innerHTML = `
        <div class="welcome">
            <h2>Welcome to Tap Simulator Wiki</h2>
            <p>Select an egg from the sidebar to view pet details and evolution stats.</p>
        </div>
    `;
}

// ===== Footer Creation =====
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

function initializeFooter() {
    let footer = document.querySelector('.site-footer');
    if (footer) footer.remove();
    footer = createFooter();
    document.body.appendChild(footer);
}

// ===== Header title click handler =====
document.addEventListener('DOMContentLoaded', () => {
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.addEventListener('click', showWelcomePage);
    }
});

// -- Root/sidebar.js
