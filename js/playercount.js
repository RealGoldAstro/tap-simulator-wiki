// js/playercount.js

// ===== Player Count Configuration =====
const UNIVERSE_ID = '8779464785';
const API_URL = `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`;
const UPDATE_INTERVAL = 60000; // 60 seconds in milliseconds

// ===== Initialize Player Count =====
// Runs on page load to fetch initial count and set up interval
function initPlayerCount() {
    // Get the header h1 element
    const headerTitle = document.querySelector('header h1');
    
    if (!headerTitle) {
        console.warn('⚠️ Header title element not found - player count cannot be displayed');
        return;
    }
    
    // Create span for player count display
    const playerCountSpan = document.createElement('span');
    playerCountSpan.id = 'player-count';
    playerCountSpan.style.color = '#00ff00'; // Green color
    playerCountSpan.style.fontWeight = '600';
    
    // Add player count span to header
    headerTitle.innerHTML = 'Tap Simulator Wiki <span style="color: #72B2FF;">•</span> ';
    headerTitle.appendChild(playerCountSpan);
    
    // Fetch initial player count
    fetchPlayerCount();
    
    // Set up interval to update every minute
    setInterval(fetchPlayerCount, UPDATE_INTERVAL);
}

// ===== Fetch Player Count =====
// Fetches current active players from Roblox API
function fetchPlayerCount() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Validate response structure
            if (!data || !data.data || data.data.length === 0) {
                console.warn('⚠️ Invalid API response structure - no game data found');
                updatePlayerCountDisplay('N/A');
                return;
            }
            
            // Extract playing count
            const gameData = data.data[0];
            const playerCount = gameData.playing || 0;
            
            // Update display with formatted number
            updatePlayerCountDisplay(playerCount);
        })
        .catch(error => {
            console.warn('⚠️ Failed to fetch player count:', error.message);
            updatePlayerCountDisplay('N/A');
        });
}

// ===== Update Player Count Display =====
// Updates the player count span with formatted text
function updatePlayerCountDisplay(count) {
    const playerCountSpan = document.getElementById('player-count');
    
    if (!playerCountSpan) {
        console.warn('⚠️ Player count span not found');
        return;
    }
    
    // Format count if it's a number
    let displayText;
    if (typeof count === 'number') {
        // Use existing formatNumberAbbreviated function if available
        if (typeof formatNumberAbbreviated === 'function') {
            displayText = `${formatNumberAbbreviated(count)} Active`;
        } else {
            // Fallback: add commas to number
            displayText = `${count.toLocaleString()} Active`;
        }
    } else {
        // Show N/A or other status
        displayText = `${count} Active`;
    }
    
    playerCountSpan.textContent = displayText;
}

// ===== Auto-Initialize on DOM Load =====
// Wait for DOM to be ready before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayerCount);
} else {
    // DOM already loaded
    initPlayerCount();
}

// js/playercount.js
