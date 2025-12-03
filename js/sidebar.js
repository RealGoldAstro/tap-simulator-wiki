
// js/sidebar.js

// ===== Sidebar Generation =====
// Dynamically generates sidebar from WIKI_DATA

// Update log data with dates
const UPDATE_LOGS = [
    {
        version: "Update 1.1",
        priority: 2,
        date: { date: "December 2, 2025", time: "21:00 GMT" },
        content: [
            {
                type: 'feature-list',
                items: [
                    { icon: "🌈", text: "Rainbow Machine change", subtext: "Changed Rainbow machine time with 5 pets from 3 Minutes to 30 Seconds" },
                    { icon: "🤖", text: "Added some small Anti Cheat measures", subtext: "Added some small Anti Cheat measure for pet power leaderboard" }
                ]
            }
        ]
    },
    {
        version: "Update 1",
        priority: 1,
        date: { date: "December 1, 2025", time: "3:00 GMT" },
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
            }
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
    ],
    madeby: {
        name: "Goldastro",
        url: "https://www.roblox.com/users/1129452280/profile"
    }
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

    // Add updates section at the bottom with special class
    const updatesSection = createUpdatesSection();
    updatesSection.classList.add('updates-section-bottom');
    sidebarContent.appendChild(updatesSection);

    // Add credits section below updates
    const creditsSection = createCreditsSection();
    creditsSection.classList.add('credits-section-bottom');
    sidebarContent.appendChild(creditsSection);
}

// ===== Create Updates Section =====
function createUpdatesSection() {
    const updatesDiv = document.createElement('div');
    updatesDiv.className = 'world-section updates-section';

    // Updates header (clickable button, no dropdown)
    const updatesHeader = document.createElement('div');
    updatesHeader.className = 'world-header no-arrow';
    updatesHeader.textContent = 'Updates';

    // Remove the arrow/collapsed class logic
    updatesHeader.classList.remove('collapsed');

    // Add click event to show all updates
    updatesHeader.addEventListener('click', () => {
        // Highlight this section
        document.querySelectorAll('.world-header').forEach(h => h.classList.remove('active-section'));
        updatesHeader.classList.add('active-section');

        // Reset pagination when opening updates
        updatesVisibleCount = 10;

        // Show the updates page
        displayAllUpdates();
    });

    updatesDiv.appendChild(updatesHeader);
    return updatesDiv;
}

// Global variable for pagination
let updatesVisibleCount = 10;

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

    // Sort by priority (high to low)
    const sortedLogs = [...UPDATE_LOGS].sort((a, b) => (b.priority || 0) - (a.priority || 0));

    // Pagination logic
    const visibleLogs = sortedLogs.slice(0, updatesVisibleCount);
    const hasMore = sortedLogs.length > updatesVisibleCount;

    visibleLogs.forEach((update) => {
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
            ${hasMore ? '<button id="load-more-updates" class="load-more-btn">Load More</button>' : ''}
        </div>
    `;

    contentArea.innerHTML = updatesHTML;

    // Add event listener for Load More button
    if (hasMore) {
        const loadMoreBtn = document.getElementById('load-more-updates');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                updatesVisibleCount += 10;
                displayAllUpdates(); // Re-render with more items
            });
        }
    }

    // Scroll to top only if it's the initial load (or maybe not at all to keep position?)
    // If we re-render on load more, we probably shouldn't scroll to top.
    // Let's only scroll to top if visibleCount is 10 (reset)
    if (updatesVisibleCount === 10) {
        contentArea.scrollTop = 0;
    }
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

// ===== Create Credits Section =====
function createCreditsSection() {
    const creditsDiv = document.createElement('div');
    creditsDiv.className = 'world-section credits-section';

    // Credits header (clickable button, no dropdown)
    const creditsHeader = document.createElement('div');
    creditsHeader.className = 'world-header no-arrow';
    creditsHeader.textContent = 'Credits';

    // Remove the arrow/collapsed class logic
    creditsHeader.classList.remove('collapsed');

    // Add click event to show credits
    creditsHeader.addEventListener('click', () => {
        // Highlight this section
        document.querySelectorAll('.world-header').forEach(h => h.classList.remove('active-section'));
        creditsHeader.classList.add('active-section');

        // Show the credits page
        displayCredits();
    });

    creditsDiv.appendChild(creditsHeader);
    return creditsDiv;
}

// ===== Display Credits Page =====
function displayCredits() {
    const contentArea = document.getElementById('content');

    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }

    // Generate HTML for credits with new grid design
    let creditsHTML = `
        <div class="credits-page-container">
            <div class="credits-header">
                <h2>Credits</h2>
                <p>The team behind Tap Simulator Wiki</p>
            </div>
            
            <div class="credits-grid">
                <!-- Owners Group -->
                ${CREATORS.owners.map(owner => `
                    <a href="${owner.url}" target="_blank" rel="noopener noreferrer" class="credit-card owner-card">
                        <div class="credit-icon">👑</div>
                        <div class="credit-info">
                            <div class="credit-name">${owner.name}</div>
                            <div class="credit-role">Game Owner</div>
                        </div>
                    </a>
                `).join('')}

                <!-- Studio -->
                <a href="${CREATORS.studio.url}" target="_blank" rel="noopener noreferrer" class="credit-card studio-card">
                    <div class="credit-icon">🏢</div>
                    <div class="credit-info">
                        <div class="credit-name">${CREATORS.studio.name}</div>
                        <div class="credit-role">Game Studio</div>
                    </div>
                </a>

                <!-- Wiki Creator -->
                <a href="${CREATORS.madeby.url}" target="_blank" rel="noopener noreferrer" class="credit-card dev-card">
                    <div class="credit-icon">💻</div>
                    <div class="credit-info">
                        <div class="credit-name">${CREATORS.madeby.name}</div>
                        <div class="credit-role">Wiki Developer</div>
                    </div>
                </a>
            </div>
        </div>
    `;

    contentArea.innerHTML = creditsHTML;
    contentArea.scrollTop = 0;
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
