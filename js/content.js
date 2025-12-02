// js/content.js

// ===== Display Egg Details Function =====
// Called when an egg is selected from sidebar - displays all pets in that egg
function displayEggDetails(eggName, eggData, worldName) {
    const contentArea = document.getElementById('content');
    
    // Validation checks
    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }
    
    if (!eggData || !eggData.pets || !Array.isArray(eggData.pets) || eggData.pets.length === 0) {
        console.warn('⚠️ Invalid or empty egg data provided');
        contentArea.innerHTML = `
            <div class="welcome-screen">
                <h2>⚠️ No Data Available</h2>
                <p>This egg has no pets or invalid data.</p>
            </div>
        `;
        return;
    }
    
    // Determine egg type (Base, Robux, or Leaderboard)
    const eggType = eggData.type || 'Base';
    
    // Build table header based on egg type
    let tableHeader;
    
    if (eggType === "Leaderboard" || eggType === "Robux") {
        // Leaderboard and Robux: Remove Golden, Rainbow M, Base M, Golden M, Rainbow
        tableHeader = `
            |Pet|Rarity${eggType === "Leaderboard" ? '|Tier' : '|Chance'}|Base|M Base|M Rainbow|Max Level|
            |--|--|--|--|--|--|--|
        `;
    } else {
        // Base eggs: Show all columns + Max Level
        tableHeader = `
            |Pet|Rarity|Chance|Base|Golden|Rainbow|M Base|M Golden|M Rainbow|Max Level|
            |--|--|--|--|--|--|--|--|--|--|
        `;
    }
    
    // Build HTML content
    let htmlContent = `
        <div class="egg-details">
            <div class="pet-header">
                <h2>${eggName}</h2>
                <span style="color: #FFD700; font-weight: 700; font-size: 1.1rem;">
                    💰 ${eggData.cost ? formatNumber(eggData.cost) : 'N/A'}
                </span>
            </div>
            
            <div class="pet-meta">
                ${worldName ? `<span><strong>World:</strong> ${worldName}</span>` : ''}
                ${eggType === "Robux" ? '<span><strong>Robux Store:</strong> Premium</span>' : ''}
                ${eggType === "Leaderboard" ? `<span><strong>${eggName}</strong></span>` : ''}
            </div>
            
            ${eggType === "Base" ? '<p class="notice">⚠️ <strong>Notice:</strong> All percentages are based off your best pet\'s base stat</p>' : ''}
            ${eggType === "Leaderboard" ? '<p class="notice">ℹ️ <strong>Notice:</strong> Leaderboard based off total pet power</p>' : ''}
            
            <div class="pets-table">
                <table>
                    <thead>
                        <tr>
                            ${createTableHeaders(eggType)}
                        </tr>
                    </thead>
                    <tbody>
                        ${eggData.pets.map(pet => createPetRow(pet, eggType)).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    contentArea.innerHTML = htmlContent;
}

// ===== Create Table Headers =====
function createTableHeaders(eggType) {
    if (eggType === "Leaderboard") {
        return `
            <th>Pet</th>
            <th>Rarity</th>
            <th>Tier</th>
            <th>Base</th>
            <th>M Base</th>
            <th>M Rainbow</th>
            <th>Max Level</th>
        `;
    } else if (eggType === "Robux") {
        return `
            <th>Pet</th>
            <th>Rarity</th>
            <th>Chance</th>
            <th>Base</th>
            <th>M Base</th>
            <th>M Rainbow</th>
            <th>Max Level</th>
        `;
    } else {
        // Base eggs
        return `
            <th>Pet</th>
            <th>Rarity</th>
            <th>Chance</th>
            <th>Base</th>
            <th>Golden</th>
            <th>Rainbow</th>
            <th>M Base</th>
            <th>M Golden</th>
            <th>M Rainbow</th>
            <th>Max Level</th>
        `;
    }
}

// ===== Create Pet Row =====
function createPetRow(pet, eggType) {
    if (!pet || !pet.name) {
        console.warn('⚠️ Invalid pet data:', pet);
        return '';
    }
    
    // Format numbers with commas
    const formatStat = (value) => {
        if (!value && value !== 0) return 'N/A';
        return typeof value === 'number' ? formatNumber(value) : value;
    };
    
    // Build row based on egg type
    if (eggType === "Leaderboard") {
        return `
            <tr>
                <td>${pet.name || 'Unknown'}</td>
                <td><span class="rarity-badge rarity-${(pet.rarity || 'common').toLowerCase().replace(/\s+/g, '-')}">${pet.rarity || 'Common'}</span></td>
                <td>${pet.tier || 'N/A'}</td>
                <td>${formatStat(pet.base)}</td>
                <td>${formatStat(pet.mBase)}</td>
                <td>${formatStat(pet.mRainbow)}</td>
                <td>${formatStat(pet.maxLevel)}</td>
            </tr>
        `;
    } else if (eggType === "Robux") {
        return `
            <tr>
                <td>${pet.name || 'Unknown'}</td>
                <td><span class="rarity-badge rarity-${(pet.rarity || 'common').toLowerCase().replace(/\s+/g, '-')}">${pet.rarity || 'Common'}</span></td>
                <td>${pet.chance || 'N/A'}</td>
                <td>${formatStat(pet.base)}</td>
                <td>${formatStat(pet.mBase)}</td>
                <td>${formatStat(pet.mRainbow)}</td>
                <td>${formatStat(pet.maxLevel)}</td>
            </tr>
        `;
    } else {
        // Base eggs - all columns
        return `
            <tr>
                <td>${pet.name || 'Unknown'}</td>
                <td><span class="rarity-badge rarity-${(pet.rarity || 'common').toLowerCase().replace(/\s+/g, '-')}">${pet.rarity || 'Common'}</span></td>
                <td>${pet.chance || 'N/A'}</td>
                <td>${formatStat(pet.base)}</td>
                <td>${formatStat(pet.golden)}</td>
                <td>${formatStat(pet.rainbow)}</td>
                <td>${formatStat(pet.mBase)}</td>
                <td>${formatStat(pet.mGolden)}</td>
                <td>${formatStat(pet.mRainbow)}</td>
                <td>${formatStat(pet.maxLevel)}</td>
            </tr>
        `;
    }
}

// ===== Format Number with Commas =====
function formatNumber(num) {
    if (num === null || num === undefined) return 'N/A';
    
    // Handle percentage strings (e.g., "50%")
    if (typeof num === 'string') {
        return num;
    }
    
    // Convert to number if possible
    const number = Number(num);
    if (isNaN(number)) return 'N/A';
    
    // Format with commas
    return number.toLocaleString('en-US');
}

// ===== Display Welcome Screen =====
function displayWelcomeScreen() {
    const contentArea = document.getElementById('content');
    
    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }
    
    contentArea.innerHTML = `
        <div class="welcome-screen">
            <div class="game-icon-container">
                <div class="game-icon-placeholder">
                    🐾
                </div>
            </div>
            <h2>Welcome to Tap Simulator Wiki</h2>
            <p>Select an egg from the sidebar to view pet details</p>
            <div class="welcome-features">
                <div class="feature-card">
                    <span class="feature-icon">📊</span>
                    <h3>Complete Stats</h3>
                    <p>View base, golden, rainbow, and mega variants</p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🎯</span>
                    <h3>Accurate Chances</h3>
                    <p>See exact drop rates for each pet</p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">⚡</span>
                    <h3>Quick Navigation</h3>
                    <p>Organize by worlds and egg types</p>
                </div>
            </div>
        </div>
    `;
}

// ===== Initialize Content Area =====
(function initContent() {
    displayWelcomeScreen();
})();

// js/content.js
