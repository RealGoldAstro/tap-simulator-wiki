// js/content.js

// ===== Display Pet Details Function =====
// Called when an egg is selected from sidebar
function displayPetDetails(eggName, petData, worldName) {
    const contentArea = document.getElementById('content');
    
    // Validation checks
    if (!contentArea) {
        console.warn('⚠️ Content area not found');
        return;
    }
    
    if (!petData || !petData.rarity || !petData.base) {
        console.warn('⚠️ Invalid pet data provided');
        return;
    }
    
    const rarityInfo = RARITIES[petData.rarity];
    if (!rarityInfo) {
        console.warn(`⚠️ Rarity "${petData.rarity}" not found in RARITIES config`);
        return;
    }
    
    // Calculate all 6 states
    const stats = calculateAllStats(petData.base, rarityInfo.maxLevel);
    
    // Generate HTML for pet details
    contentArea.innerHTML = generatePetHTML(eggName, petData, worldName, rarityInfo, stats);
}

// ===== Calculate All 6 States =====
// Returns object with Base/Golden/Rainbow stats at Level 0 and Max Level
function calculateAllStats(baseStat, maxLevel) {
    // Evolution multipliers: Base = x1, Golden = x2, Rainbow = x4
    const baseMultiplier = 1;
    const goldenMultiplier = 2;
    const rainbowMultiplier = 4;
    
    // Formula: Stat = BaseStat × Multiplier × (1 + (Level × 0.005))
    return {
        // Base evolution
        baseLevel0: calculateStat(baseStat, baseMultiplier, 0),
        baseMaxLevel: calculateStat(baseStat, baseMultiplier, maxLevel),
        
        // Golden evolution
        goldenLevel0: calculateStat(baseStat, goldenMultiplier, 0),
        goldenMaxLevel: calculateStat(baseStat, goldenMultiplier, maxLevel),
        
        // Rainbow evolution
        rainbowLevel0: calculateStat(baseStat, rainbowMultiplier, 0),
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

// ===== Generate Pet Details HTML =====
function generatePetHTML(eggName, petData, worldName, rarityInfo, stats) {
    return `
        <div class="pet-details">
            <div class="pet-header">
                <h2 class="pet-name">${petData.petdisplayname}</h2>
                <span class="pet-rarity" style="background-color: ${rarityInfo.color}; color: ${getTextColor(rarityInfo.color)};">
                    ${petData.rarity}
                </span>
                <p style="color: #B0B0B0; margin-top: 0.5rem;">
                    <strong>Egg:</strong> ${eggName} | <strong>World:</strong> ${worldName}
                </p>
            </div>
            
            <div class="pet-info">
                <h3 style="color: #72B2FF; margin-bottom: 1rem;">Evolution Stats</h3>
                <table class="stats-table">
                    <thead>
                        <tr>
                            <th>Evolution</th>
                            <th>Multiplier</th>
                            <th>Level 0</th>
                            <th>Max Level (${rarityInfo.maxLevel})</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="evolution-label">Base</td>
                            <td>×1</td>
                            <td class="stat-value">${formatNumber(stats.baseLevel0)}</td>
                            <td class="stat-value">${formatNumber(stats.baseMaxLevel)}</td>
                        </tr>
                        <tr>
                            <td class="evolution-label">Golden</td>
                            <td>×2</td>
                            <td class="stat-value">${formatNumber(stats.goldenLevel0)}</td>
                            <td class="stat-value">${formatNumber(stats.goldenMaxLevel)}</td>
                        </tr>
                        <tr>
                            <td class="evolution-label">Rainbow</td>
                            <td>×4</td>
                            <td class="stat-value">${formatNumber(stats.rainbowLevel0)}</td>
                            <td class="stat-value">${formatNumber(stats.rainbowMaxLevel)}</td>
                        </tr>
                    </tbody>
                </table>
                
                <p style="color: #B0B0B0; margin-top: 1.5rem; font-size: 0.9rem;">
                    <strong>Note:</strong> Each level adds 0.5% of the pet's base stat for that evolution stage.
                </p>
            </div>
        </div>
    `;
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
