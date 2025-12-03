// js/playercount.js

// ===== Player Count Configuration =====
const API_URL = 'https://roblox-playercount-proxy-c16f5cfev-astros-projects-7d607cbf.vercel.app/api/players';
const UPDATE_INTERVAL = 30000; // 30 seconds (display refresh only, backend saves every 10 min)

// ===== Initialize Player Count =====
// Creates 3 stacked lines: Active, 24hr Peak, 7d Peak
function initPlayerCount() {
  const headerContent = document.querySelector('.header-content');
  const headerTitle = document.querySelector('header h1');
  if (!headerContent || !headerTitle) {
    console.warn('⚠️ Header content or title element not found - player count cannot be displayed');
    return;
  }

  // Create wrapper for centered player count
  let playerCountWrapper = document.getElementById('player-count-wrapper');
  if (!playerCountWrapper) {
    playerCountWrapper = document.createElement('div');
    playerCountWrapper.id = 'player-count-wrapper';
    playerCountWrapper.style.flex = '1'; // Take remaining space between title and icon
    playerCountWrapper.style.display = 'flex';
    playerCountWrapper.style.justifyContent = 'center';
    playerCountWrapper.style.alignItems = 'center';
    playerCountWrapper.style.pointerEvents = 'none';

    // Inner container - VERTICAL stack
    const inner = document.createElement('div');
    inner.id = 'player-count-container';
    inner.style.display = 'flex';
    inner.style.flexDirection = 'column'; // Stack vertically
    inner.style.alignItems = 'center';
    inner.style.gap = '0.15rem';
    inner.style.fontSize = '0.75rem';

    // Line 1: Active Players (green number + gray "Active")
    const activeLine = document.createElement('div');
    activeLine.style.display = 'flex';
    activeLine.style.alignItems = 'baseline';
    activeLine.style.gap = '0.25rem';

    const activeNumber = document.createElement('span');
    activeNumber.id = 'player-count-number';
    activeNumber.style.color = '#22c55e'; // Green
    activeNumber.style.fontWeight = '600';
    activeNumber.style.fontSize = '0.8rem';

    const activeLabel = document.createElement('span');
    activeLabel.id = 'player-count-label';
    activeLabel.textContent = 'Active';
    activeLabel.style.color = '#E5E7EB'; // White-gray
    activeLabel.style.fontWeight = '500';

    activeLine.appendChild(activeNumber);
    activeLine.appendChild(activeLabel);

    // Line 2: 24hr Peak
    const peak24hLine = document.createElement('div');
    peak24hLine.id = 'peak24h-line';
    peak24hLine.style.color = '#9CA3AF'; // Gray
    peak24hLine.style.fontWeight = '500';
    peak24hLine.style.fontSize = '0.7rem';
    peak24hLine.textContent = '24hr Peak • ---';

    // Line 3: 7d Peak
    const peak7dLine = document.createElement('div');
    peak7dLine.id = 'peak7d-line';
    peak7dLine.style.color = '#9CA3AF'; // Gray
    peak7dLine.style.fontWeight = '500';
    peak7dLine.style.fontSize = '0.7rem';
    peak7dLine.textContent = '7d Peak • ---';

    // Append all lines to container
    inner.appendChild(activeLine);
    inner.appendChild(peak24hLine);
    inner.appendChild(peak7dLine);
    playerCountWrapper.appendChild(inner);

    // Insert between title and icon
    headerContent.insertBefore(playerCountWrapper, headerContent.lastElementChild);
  }

  // Initial fetch + start interval
  fetchPlayerCount();
  setInterval(fetchPlayerCount, UPDATE_INTERVAL);
}

// ===== Fetch Player Count =====
// Calls Vercel proxy to get current + peak data
function fetchPlayerCount() {
  if (!API_URL || API_URL.indexOf('your-vercel-app-name') !== -1) {
    console.warn('⚠️ API_URL for player count is not set to your real Vercel URL');
    updatePlayerCountDisplay(null, null, null);
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
        updatePlayerCountDisplay(null, null, null);
        return;
      }

      const currentPlayers = data.playing;
      const peak24h = data.peak24h || 0;
      const peak7d = data.peak7d || 0;
      
      updatePlayerCountDisplay(currentPlayers, peak24h, peak7d);
    })
    .catch(error => {
      console.warn('⚠️ Failed to fetch player count from proxy:', error.message);
      updatePlayerCountDisplay(null, null, null);
    });
}

// ===== Update Player Count Display =====
// Updates all 3 lines with current and peak data
function updatePlayerCountDisplay(current, peak24h, peak7d) {
  const activeNumber = document.getElementById('player-count-number');
  const peak24hLine = document.getElementById('peak24h-line');
  const peak7dLine = document.getElementById('peak7d-line');

  if (!activeNumber || !peak24hLine || !peak7dLine) {
    console.warn('⚠️ Player count elements not found for update');
    return;
  }

  // Update active players (current)
  if (typeof current === 'number') {
    activeNumber.textContent = current.toLocaleString();
  } else {
    activeNumber.textContent = 'N/A';
  }

  // Update 24hr peak
  if (typeof peak24h === 'number') {
    peak24hLine.textContent = `24hr Peak • ${peak24h.toLocaleString()}`;
  } else {
    peak24hLine.textContent = '24hr Peak • ---';
  }

  // Update 7d peak
  if (typeof peak7d === 'number') {
    peak7dLine.textContent = `7d Peak • ${peak7d.toLocaleString()}`;
  } else {
    peak7dLine.textContent = '7d Peak • ---';
  }
}

// ===== Auto-Initialize on DOM Load =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayerCount);
} else {
  initPlayerCount();
}

// js/playercount.js
