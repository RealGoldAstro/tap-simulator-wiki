// js/playercount.js
// -- Web/Client/playercount.js

// ===== Player Count Configuration =====
// Use your Vercel URL here (after you deploy the proxy):
// Example: const API_URL = 'https://tap-sim-playercount.vercel.app/api/players';
const API_URL = 'https://your-vercel-app-name.vercel.app/api/players'; // TODO: replace with real URL
const UPDATE_INTERVAL = 30000; // 30 seconds

// ===== Initialize Player Count =====
// Puts "1,384 Active" in the middle of the header row (between title and icon)
function initPlayerCount() {
    const headerContent = document.querySelector('.header-content');
    const headerTitle = document.querySelector('header h1');

    if (!headerContent || !headerTitle) {
        console.warn('⚠️ Header content or title element not found - player count cannot be displayed');
        return;
    }

    // Create a flex spacer for the counter if it doesn't exist
    let playerCountWrapper = document.getElementById('player-count-wrapper');
    if (!playerCountWrapper) {
        playerCountWrapper = document.createElement('div');
        playerCountWrapper.id = 'player-count-wrapper';
        playerCountWrapper.style.flex = '1'; // take remaining space between title and icon
        playerCountWrapper.style.display = 'flex';
        playerCountWrapper.style.justifyContent = 'center';
        playerCountWrapper.style.alignItems = 'center';
        playerCountWrapper.style.pointerEvents = 'none';

        const inner = document.createElement('div');
        inner.id = 'player-count-container';
        inner.style.display = 'flex';
        inner.style.alignItems = 'baseline';
        inner.style.gap = '0.25rem';
        inner.style.fontSize = '0.8rem'; // smaller than title

        // Green number (full value with commas)
        const numberSpan = document.createElement('span');
        numberSpan.id = 'player-count-number';
        numberSpan.style.color = '#22c55e'; // green
        numberSpan.style.fontWeight = '600';

        // Light gray "Active" label
        const labelSpan = document.createElement('span');
        labelSpan.id = 'player-count-label';
        labelSpan.textContent = 'Active';
        labelSpan.style.color = '#E5E7EB'; // white-gray
        labelSpan.style.fontWeight = '500';

        inner.appendChild(numberSpan);
        inner.appendChild(labelSpan);
        playerCountWrapper.appendChild(inner);

        // Insert the wrapper between title and icon (assumes icon container is last child)
        headerContent.insertBefore(playerCountWrapper, headerContent.lastElementChild);
    }

    // Initial fetch + start interval (no tight loops)
    fetchPlayerCount();
    setInterval(fetchPlayerCount, UPDATE_INTERVAL);
}

// ===== Fetch Player Count =====
// Calls your Vercel proxy (which talks to Roblox)
function fetchPlayerCount() {
    if (!API_URL || API_URL.indexOf('your-vercel-app-name') !== -1) {
        console.warn('⚠️ API_URL for player count is not set to your real Vercel URL');
        updatePlayerCountDisplay('N/A');
        return;
    }

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || typeof data.playing !== 'number') {
                console.warn('⚠️ Invalid proxy response for player count');
                updatePlayerCountDisplay('N/A');
                return;
            }

            const playerCount = data.playing;
            updatePlayerCountDisplay(playerCount);
        })
        .catch(error => {
            console.warn('⚠️ Failed to fetch player count from proxy:', error.message);
            updatePlayerCountDisplay('N/A');
        });
}

// ===== Update Player Count Display =====
// Shows full number with commas in green, "Active" in white-gray
function updatePlayerCountDisplay(count) {
    const numberSpan = document.getElementById('player-count-number');
    const labelSpan = document.getElementById('player-count-label');

    if (!numberSpan || !labelSpan) {
        console.warn('⚠️ Player count elements not found for update');
        return;
    }

    if (typeof count === 'number') {
        // Full number with commas (e.g., 1,826)
        numberSpan.textContent = count.toLocaleString();
    } else {
        // For N/A or other fallback text
        numberSpan.textContent = count;
    }
}

// ===== Auto-Initialize on DOM Load =====
// Ensures script runs after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayerCount);
} else {
    initPlayerCount();
}

// -- Web/Client/playercount.js
