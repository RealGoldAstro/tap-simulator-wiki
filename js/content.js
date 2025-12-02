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
        contentArea.innerHTML = '<div class="welcome"><h2>No pets found</h2></div>';
        return;
    }
    
    // Generate HTML for egg details with all pets
    contentArea.innerHTML = generateEggHTML(eggName, eggData, worldName);
}

// ===== Generate Egg Details HTML =====
function generateEggHTML(eggName, eggData, worldName) {
    const eggType = eggData.type || "Base";
    
    // Format world/category display based on egg type
    let categoryDisplay;
    if (eggType === "Robux") {
        categoryDisplay = `Robux Store: ${worldName}`;
    } else if (eggType === "Leaderboard") {
        categoryDisplay = "Weekly Leaderboard Pets";
    } else {
        categoryDisplay = `World: ${worldName}`;
    }

    // Generate cost/pack display based on egg type
    let costDisplay = '';
    let noticeDisplay = '';
    
    if (eggType === "Base") {
        // Base egg: show currency cost
        const costFormatted = formatNumberAbbreviated(eggData.cost);
        costDisplay = `
            <div style="display: flex; align-items: center; gap: 0.3rem; margin-top: 0.8rem;">
                <img src="assets/clicks.png" alt="Cost" style="width: 20px; height: 20px;" onerror="this.style.display='none'">
                <span style="color: #FFD700; font-weight: 700; font-size: 1.1rem;">${costFormatted}</span>
            </div>
        `;
    } else if (eggType === "Robux") {
        // Robux egg: show pack options
        const packsHTML = eggData.packs.map(pack => {
            return `<span style="color: #E8EAED; font-weight: 600;">${pack.amount}x</span> <span style="color: #FFD700;">R$${pack.price}</span>`;
        }).join(' • ');
        
        costDisplay = `
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.8rem; flex-wrap: wrap;">
                <img src="assets/robux.png" alt="Robux" style="width: 20px; height: 20px;" onerror="this.style.display='none'">
                <div style="font-size: 0.95rem;">${packsHTML}</div>
            </div>
        `;
        
        noticeDisplay = `
            <div style="background: rgba(255, 215, 0, 0.1); border-left: 3px solid #FFD700; padding: 0.8rem; margin-bottom: 1.5rem; border-radius: 4px;">
                <p style="color: #FFD700; font-size: 0.9rem; margin: 0;">
                    <strong>⚠️ Notice:</strong> All percentages are based off your best pet's base stat
                </p>
            </div>
        `;
    } else if (eggType === "Leaderboard") {
        // Leaderboard egg: no cost, just notice
        noticeDisplay = `
            <div style="background: rgba(114, 178, 255, 0.1); border-left: 3px solid #72B2FF; padding: 0.8rem; margin-bottom: 1.5rem; border-radius: 4px;">
                <p style="color: #72B2FF; font-size: 0.9rem; margin: 0;">
                    <strong>ℹ️ Notice:</strong> Leaderboard based off total pet power
                </p>
            </div>
        `;
    }
    
    // Generate table headers based on egg type
    let tableHeaders;
    if (eggType === "Robux" || eggType === "Leaderboard") {
        // Robux/Leaderboard: Only show Petname, Rarity, Tier/Chance, Base, Max Level
        tableHeaders = `
            <th>Petname</th>
            <th>Rarity</th>
            ${eggType === "Leaderboard" ? '<th>Tier</th>' : '<th>Chance</th>'}
            <th>Base</th>
            <th>Max Level</th>
        `;
    } else {
        // Base: Show all columns including evolution stats + Max Level
        tableHeaders = `
            <th>Petname</th>
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
    
    return `
        <div class="pet-details">
            <div class="pet-header">
                <h2 class="pet-title">${eggName}</h2>
                <p class="pet-meta">
                    ${categoryDisplay} • Contains ${eggData.pets.length} pet${eggData.pets.length > 1 ? 's' : ''}
                </p>
                ${costDisplay}
            </div>
            
            <div class="pet-info">
                ${noticeDisplay}
                <table class="pets-table">
                    <thead>
                        <tr>
                            ${tableHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        ${generatePetRows(eggData.pets, eggType)}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ===== Generate Pet Rows =====
// Creates table rows for all pets in the egg - columns vary by egg type
function generatePetRows(petsArray, eggType) {
    return petsArray.map(petData => {
        // Get rarity info
        const rarityInfo = RARITIES[petData.rarity];
        
        if (!rarityInfo) {
            console.warn(`⚠️ Rarity "${petData.rarity}" not found for ${petData.petdisplayname}`);
            return '';
        }
        
        // Calculate all stats for this pet based on egg type
        const stats = calculatePetStats(petData.base, rarityInfo.maxLevel, eggType);
        
        // Get text color for rarity badge
        const textColor = getTextColor(rarityInfo.color);
        
        // Determine if stats should show as percentages
        const isPercentage = (eggType === "Robux" || eggType === "Leaderboard");
        
        // Format stats with appropriate suffix
        const formatStat = (value) => {
            if (isPercentage) {
                return value.toFixed(1).replace(/\.0$/, '') + '%';
            } else {
                return formatNumberAbbreviated(value);
            }
        };
        
        // Chance/Tier column (depends on egg type)
        let chanceOrTierColumn;
        if (eggType === "Leaderboard") {
            chanceOrTierColumn = `<td><span style="color: #72B2FF; font-weight: 600;">${petData.leaderboardTier}</span></td>`;
        } else {
            const chanceDisplay = formatChance(petData.chance);
            chanceOrTierColumn = `<td>${chanceDisplay}</td>`;
        }
        
        // Generate row based on egg type
        if (eggType === "Robux" || eggType === "Leaderboard") {
            // Robux/Leaderboard: Only show Petname, Rarity, Tier/Chance, Base, Max Level
            return `
                <tr>
                    <td><strong>${petData.petdisplayname}</strong></td>
                    <td>
                        <span class="rarity-badge" style="background-color: ${rarityInfo.color}; color: ${textColor};">
                            ${petData.rarity}
                        </span>
                    </td>
                    ${chanceOrTierColumn}
                    <td class="stat-value">${formatStat(stats.baseLevel0)}</td>
                    <td class="stat-value">${formatStat(stats.baseMaxLevel)}</td>
                </tr>
            `;
        } else {
            // Base: Show all columns including evolution stats + Max Level
            return `
                <tr>
                    <td><strong>${petData.petdisplayname}</strong></td>
                    <td>
                        <span class="rarity-badge" style="background-color: ${rarityInfo.color}; color: ${textColor};">
                            ${petData.rarity}
                        </span>
                    </td>
                    ${chanceOrTierColumn}
                    <td class="stat-value">${formatStat(stats.baseLevel0)}</td>
                    <td class="stat-value">${formatStat(stats.goldenLevel0)}</td>
                    <td class="stat-value">${formatStat(stats.rainbowLevel0)}</td>
                    <td class="stat-value">${formatStat(stats.baseMaxLevel)}</td>
                    <td class="stat-value">${formatStat(stats.goldenMaxLevel)}</td>
                    <td class="stat-value">${formatStat(stats.rainbowMaxLevel)}</td>
                    <td class="stat-value">${formatStat(stats.baseMaxLevel)}</td>
                </tr>
            `;
        }
    }).join('');
}

// ===== Calculate Pet Stats =====
// Calculates all 6 states: Base/Golden/Rainbow × Level0/MaxLevel
// Uses different multipliers based on egg type
function calculatePetStats(baseStat, maxLevel, eggType) {
    // Determine multipliers based on egg type
    let baseMultiplier, goldenMultiplier, rainbowMultiplier;
    
    if (eggType === "Robux" || eggType === "Leaderboard") {
        // Percentage-based pets: smaller multipliers
        baseMultiplier = 1;
        goldenMultiplier = 1.25;
        rainbowMultiplier = 1.5;
    } else {
        // Base eggs: standard multipliers
        baseMultiplier = 1;
        goldenMultiplier = 2;
        rainbowMultiplier = 4;
    }
    
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
    return finalStat; // Keep decimals for percentages
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
