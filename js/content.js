// js/content.js

// ===== Global Luck Multiplier =====
let currentLuckMultiplier = 1; // Default 100% = 1x

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
        contentArea.innerHTML = '<div class="welcome"><h2>No pets found</h2></div>';
        return;
    }
    
    // Generate HTML for egg details with all pets
    contentArea.innerHTML = generateEggHTML(eggName, eggData, worldName);
    
    // Attach luck input event listener
    attachLuckInputListener();
}

// ===== Generate Egg Details HTML =====
function generateEggHTML(eggName, eggData, worldName) {
    const costFormatted = formatNumberAbbreviated(eggData.cost);
    
    return `
        <div class="pet-details">
            <div class="pet-header">
                <h2 class="pet-title">${eggName}</h2>
                <p class="pet-meta">
                    World: ${worldName} • Contains ${eggData.pets.length} pet${eggData.pets.length > 1 ? 's' : ''}
                </p>
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.8rem; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 0.3rem;">
                        <img src="assets/clicks.png" alt="Cost" style="width: 20px; height: 20px;" onerror="this.style.display='none'">
                        <span style="color: #FFD700; font-weight: 700; font-size: 1.1rem;">${costFormatted}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <label for="luck-input" style="color: #72B2FF; font-size: 0.9rem; font-weight: 600;">Luck:</label>
                        <input 
                            type="number" 
                            id="luck-input" 
                            value="100" 
                            min="1" 
                            max="100000"
                            style="width: 80px; padding: 0.3rem 0.5rem; background: rgba(18, 44, 103, 0.5); border: 1px solid rgba(114, 178, 255, 0.3); border-radius: 4px; color: #E8EAED; font-size: 0.9rem;"
                        >
                        <span style="color: #9CA3AF; font-size: 0.9rem;">%</span>
                    </div>
                </div>
            </div>
            
            <div class="pet-info">
                <table class="pets-table">
                    <thead>
                        <tr>
                            <th>Petname</th>
                            <th>Rarity</th>
                            <th>Chance</th>
                            <th>Base</th>
                            <th>Golden</th>
                            <th>Rainbow</th>
                            <th>M Base</th>
                            <th>M Golden</th>
                            <th>M Rainbow</th>
                        </tr>
                    </thead>
                    <tbody id="pets-table-body">
                        ${generatePetRows(eggData.pets)}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ===== Attach Luck Input Listener =====
function attachLuckInputListener() {
    const luckInput = document.getElementById('luck-input');
    
    if (!luckInput) {
        console.warn('⚠️ Luck input not found');
        return;
    }
    
    // Update luck multiplier when input changes
    luckInput.addEventListener('input', () => {
        const luckPercent = parseFloat(luckInput.value) || 100;
        currentLuckMultiplier = luckPercent / 100;
        
        // Refresh the pet rows with new luck
        refreshPetRows();
    });
}

// ===== Refresh Pet Rows =====
// Re-generates pet rows with updated luck multiplier
function refreshPetRows() {
    const tbody = document.getElementById('pets-table-body');
    
    if (!tbody) {
        console.warn('⚠️ Pet table body not found');
        return;
    }
    
    // Get current egg data from the displayed content
    const contentArea = document.getElementById('content');
    if (!contentArea) return;
    
    // Store reference to current pets (need to access from somewhere)
    // For now, we'll regenerate from the last selected egg
    // This is a simplified approach - in production you'd store the current egg data
    const petRows = tbody.querySelectorAll('tr');
    petRows.forEach(row => {
        const chanceCell = row.cells[2];
        const petChanceDecimal = parseFloat(row.dataset.chance);
        
        if (chanceCell && petChanceDecimal) {
            chanceCell.innerHTML = formatChance(petChanceDecimal, currentLuckMultiplier);
        }
    });
}

// ===== Generate Pet Rows =====
// Creates table rows for all pets in the egg
function generatePetRows(petsArray) {
    return petsArray.map(petData => {
        // Get rarity info
        const rarityInfo = RARITIES[petData.rarity];
        
        if (!rarityInfo) {
            console.warn(`⚠️ Rarity "${petData.rarity}" not found for ${petData.petdisplayname}`);
            return '';
        }
        
        // Calculate all 6 stats for this pet
        const stats = calculatePetStats(petData.base, rarityInfo.maxLevel);
        
        // Format chance display with current luck
        const chanceDisplay = formatChance(petData.chance, currentLuckMultiplier);
        
        // Get text color for rarity badge
        const textColor = getTextColor(rarityInfo.color);
        
        return `
            <tr data-chance="${petData.chance}">
                <td><strong>${petData.petdisplayname}</strong></td>
                <td>
                    <span class="rarity-badge" style="background-color: ${rarityInfo.color}; color: ${textColor};">
                        ${petData.rarity}
                    </span>
                </td>
                <td>${chanceDisplay}</td>
                <td class="stat-value">${formatNumberAbbreviated(stats.baseLevel0)}</td>
                <td class="stat-value">${formatNumberAbbreviated(stats.goldenLevel0)}</td>
                <td class="stat-value">${formatNumberAbbreviated(stats.rainbowLevel0)}</td>
                <td class="stat-value">${formatNumberAbbreviated(stats.baseMaxLevel)}</td>
                <td class="stat-value">${formatNumberAbbreviated(stats.goldenMaxLevel)}</td>
                <td class="stat-value">${formatNumberAbbreviated(stats.rainbowMaxLevel)}</td>
            </tr>
        `;
    }).join('');
}

// ===== Calculate Pet Stats =====
// Calculates all 6 states: Base/Golden/Rainbow × Level0/MaxLevel
function calculatePetStats(baseStat, maxLevel) {
    // Evolution multipliers: Base = x1, Golden = x2, Rainbow = x4
    const baseMultiplier = 1;
    const goldenMultiplier = 2;
    const rainbowMultiplier = 4;
    
    return {
        // Level 0 stats
        baseLevel0: calculateStat(baseStat, baseMultiplier, 0),
        goldenLevel0: calculateStat(baseStat, goldenMultiplier, 0),
        rainbowLevel0: calculateStat(baseStat, rainbowMultiplier, 0),
        
        // Max level stats
        baseMaxLevel: calculateStat(baseStat, baseMultiplier, maxLevel),
        goldenMaxLevel: calculateStat(baseStat, goldenMultiplier, maxLevel),
        rainbowMaxLevel: calculateStat(baseStat, rainbowMultiplier, maxLevel)
    };
}

// ===== Calculate Single Stat =====
// Formula: BaseStat × EvolutionMultiplier × (1 + (Level × 0.005))
function calculateStat(baseStat, evolutionMultiplier, level) {
    const levelBonus = 1 + (level * 0.005);
    const finalStat = baseStat * evolutionMultiplier * levelBonus;
    return Math.floor(finalStat); // Round down for clean numbers
}

// ===== Get Text Color Based on Background =====
// Returns white or black depending on background brightness
function getTextColor(rgbColor) {
    // Extract RGB values
    const match = rgbColor.match(/\d+/g);
    if (!match || match.length < 3) return '#ffffff';
    
    const r = parseInt(match[0]);
    const g = parseInt(match[1]);
    const b = parseInt(match[2]);
    
    // Calculate brightness (perceived luminance)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return white for dark backgrounds, black for light backgrounds
    return brightness < 128 ? '#ffffff' : '#000000';
}

// js/content.js
