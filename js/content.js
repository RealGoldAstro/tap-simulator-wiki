// js/content.js

// ===== Display Egg Details Function =====
// Called when an egg is selected from sidebar - displays all pets in that egg
function displayEggDetails(eggName, petsArray, worldName) {
    const contentArea = document.getElementById('content');
    
    // Validation checks
    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }
    
    if (!Array.isArray(petsArray) || petsArray.length === 0) {
        console.warn('⚠️ Invalid or empty pets array provided');
        contentArea.innerHTML = '<div class="welcome"><h2>No pets found</h2></div>';
        return;
    }
    
    // Generate HTML for egg details with all pets
    contentArea.innerHTML = generateEggHTML(eggName, petsArray, worldName);
}

// ===== Generate Egg Details HTML =====
function generateEggHTML(eggName, petsArray, worldName) {
    return `
        <div class="pet-details">
            <div class="pet-header">
                <h2 class="pet-title">${eggName}</h2>
                <p class="pet-meta">World: ${worldName} • Contains ${petsArray.length} pet${petsArray.length > 1 ? 's' : ''}</p>
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
                    <tbody>
                        ${generatePetRows(petsArray)}
                    </tbody>
                </table>
            </div>
        </div>
    `;
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
        
        // Format chance display
        const chanceDisplay = formatChance(petData.chance);
        
        // Get text color for rarity badge
        const textColor = getTextColor(rarityInfo.color);
        
        return `
            <tr>
                <td><strong>${petData.petdisplayname}</strong></td>
                <td>
                    <span class="rarity-badge" style="background-color: ${rarityInfo.color}; color: ${textColor};">
                        ${petData.rarity}
                    </span>
                </td>
                <td>${chanceDisplay}</td>
                <td class="stat-value">${formatNumber(stats.baseLevel0)}</td>
                <td class="stat-value">${formatNumber(stats.goldenLevel0)}</td>
                <td class="stat-value">${formatNumber(stats.rainbowLevel0)}</td>
                <td class="stat-value">${formatNumber(stats.baseMaxLevel)}</td>
                <td class="stat-value">${formatNumber(stats.goldenMaxLevel)}</td>
                <td class="stat-value">${formatNumber(stats.rainbowMaxLevel)}</td>
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

// ===== Format Number with Commas =====
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
