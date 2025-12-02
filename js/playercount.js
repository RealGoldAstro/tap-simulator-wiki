// js/playercount.js
// -- Web/Client/playercount.js

// ===== Player Count Configuration =====
// Roblox universe + proxy + refresh interval
const UNIVERSE_ID = '8779464785';
const API_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(`https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`);
const UPDATE_INTERVAL = 60000; // 60 seconds

// ===== Initialize Player Count =====
// Puts "1,384 Active" in the middle of the header row (between title and icon)
function initPlayerCount() {
    const headerContent = document.querySelector('.header-content');
    const headerTitle = document.querySelector('header h1');

    if (!headerContent || !headerTitle) {
        console.warn('⚠️ Header content or title element not found - player count cannot be displayed');
        return;
    }

    // Ensure header row is flex so we can place the counter in the middle
    const style = getComputedStyle(headerContent);
    if (style.display !== 'flex') {
        console.warn('⚠️ .header-content is not flex - centering may not be perfect');
    }

    // Create a flex spacer that will live between title and icon
    let playerCountWrapper = document.getElementById('player-count-wrapper');
    if (!playerCountWrapper) {
        playerCountWrapper = document.createElement('div');
        playerCountWrapper.id = 'player-count-wrapper';
        playerCountWrapper.style.flex = '1'; // takes available space between title and icon
        playerCountWrapper.style.display = 'flex';
        playerCountWrapper.style.justifyContent = 'center'; // centers inside that space
        playerCountWrapper.style.alignItems = 'center';
        playerCountWrapper.style.pointerEvents = 'none'; // no interaction needed

        // Inner container just for the text
        const inner = document.createElement('div');
        inner.id = 'player-count-container';
        inner.style.display = 'flex';
        inner.style.alignItems = 'baseline';
        inner.style.gap = '0.25rem';
        inner.style.fontSize = '0.8rem'; // slightly smaller than title

        // Green number
        const numberSpan = document.createElement('span');
        numberSpan.id = 'player-count-number';
        numberSpan.style.color = '#22c55e'; // green
        numberSpan.style.fontWeight = '600';

        // Light gray "Active"
        const labelSpan = document.createElement('span');
        labelSpan.id = 'player-count-label';
        labelSpan.textContent = 'Active';
        labelSpan.style.color = '#E5E7EB'; // white-gray
        labelSpan.style.fontWeight = '500';

        inner.appendChild(numberSpan);
        inner.appendChild(labelSpan);
        playerCountWrapper.appendChild(inner);

        // Insert wrapper between title and icon (assumes layout: [title][icon-container])
        // title is first child, icon container should already be last
        headerContent.insertBefore(playerCountWrapper, headerContent.lastElementChild);
    }

    // Initial fetch + interval
    fetchPlayerCount();
    setInterval(fetchPlayerCount, UPDATE_INTERVAL);
}

// ===== Fetch Player Count =====
// Calls Roblox API through public CORS proxy
function fetchPlayerCount() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.data || data.data.length === 0) {
                console.warn('⚠️ Invalid API response - no game data found');
                updatePlayerCountDisplay('N/A');
                return;
            }

            const gameData = data.data[0];
            const playerCount = typeof gameData.playing === 'number' ? gameData.playing : 0;
            updatePlayerCountDisplay(playerCount);
        })
        .catch(error => {
            console.warn('⚠️ Failed to fetch player count:', error.message);
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
        // Full number with commas (e.g., 1,384)
        numberSpan.textContent = count.toLocaleString();
    } else {
        // For N/A or other fallback text
        numberSpan.textContent = count;
    }
}

// ===== Auto-Initialize on DOM Load =====
// Ensures script runs after DOM is available
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayerCount);
} else {
    initPlayerCount();
}

// -- Web/Client/playercount.js
