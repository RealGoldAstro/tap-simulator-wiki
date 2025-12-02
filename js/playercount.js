// js/playercount.js

// ===== Player Count Configuration =====
const UNIVERSE_ID = '8779464785';
const API_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://games.roblox.com/v1/games?universeIds=8779464785');
const UPDATE_INTERVAL = 60000; // 60 seconds

// ===== Initialize Player Count =====
function initPlayerCount() {
    const headerTitle = document.querySelector('header h1');
    
    if (!headerTitle) {
        console.warn('⚠️ Header title element not found');
        return;
    }
    
    const playerCountSpan = document.createElement('span');
    playerCountSpan.id = 'player-count';
    playerCountSpan.style.color = '#00ff00'; // Green color
    playerCountSpan.style.fontWeight = '600';
    
    headerTitle.innerHTML = 'Tap Simulator Wiki <span style="color: #72B2FF;">•</span> ';
    headerTitle.appendChild(playerCountSpan);
    
    fetchPlayerCount();
    setInterval(fetchPlayerCount, UPDATE_INTERVAL);
}

// ===== Fetch Player Count =====
function fetchPlayerCount() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!data || !data.data || data.data.length === 0) {
                console.warn('⚠️ Invalid API response');
                updatePlayerCountDisplay('N/A');
                return;
            }
            const playerCount = data.data[0].playing || 0;
            updatePlayerCountDisplay(playerCount);
        })
        .catch(error => {
            console.warn('⚠️ Failed to fetch player count:', error.message);
            updatePlayerCountDisplay('N/A');
        });
}

// ===== Update Player Count Display =====
function updatePlayerCountDisplay(count) {
    const playerCountSpan = document.getElementById('player-count');
    if (!playerCountSpan) {
        console.warn('⚠️ Player count span not found');
        return;
    }
    
    let displayText;
    if (typeof count === 'number') {
        displayText = typeof formatNumberAbbreviated === 'function' ? 
            `${formatNumberAbbreviated(count)} Active` : 
            `${count.toLocaleString()} Active`;
    } else {
        displayText = `${count} Active`;
    }
    
    playerCountSpan.textContent = displayText;
}

// ===== Auto-Initialize =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayerCount);
} else {
    initPlayerCount();
}

// js/playercount.js
