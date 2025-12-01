// js/data.js

// ===== Number Abbreviation Configuration =====
// Customize abbreviations here
const NUMBER_ABBREVIATIONS = ['', 'K', 'M', 'B', 'T', 'QA', 'QN', 'SX', 'SP', 'OC', 'NO', 'DC'];

// ===== Rarity Configuration =====
// Contains color (RGB) and max level for each rarity tier
const RARITIES = {
    "Common": {
        color: "rgb(0, 195, 255)",
        maxLevel: 50
    },
    "Rare": {
        color: "rgb(0, 255, 13)",
        maxLevel: 50
    },
    "Epic": {
        color: "rgb(183, 0, 255)",
        maxLevel: 50
    },
    "Legendary": {
        color: "rgb(255, 162, 0)",
        maxLevel: 75
    },
    "Mythical": {
        color: "rgb(225, 0, 255)",
        maxLevel: 75
    },
    "Godly": {
        color: "rgb(255, 222, 35)",
        maxLevel: 100
    },
    "Exclusive": {
        color: "rgb(200, 0, 255)",
        maxLevel: 150
    },
    "Secret I": {
        color: "rgb(0, 0, 0)",
        maxLevel: 150
    },
    "Secret II": {
        color: "rgb(0, 0, 0)",
        maxLevel: 150
    },
    "Secret III": {
        color: "rgb(255, 28, 28)",
        maxLevel: 200
    }
};

// ===== Wiki Data Structure =====
// Each egg contains cost and an array of pets (supports up to 50 pets per egg)
// Chance is stored as decimal (e.g., 0.001 = 0.001% / 1 in 100,000)
const WIKI_DATA = {
    "World 1": {
        "Basic Egg": {
            cost: 250,
            pets: [
                {
                    petname: "Dog",
                    rarity: "Common",
                    base: 2,
                    petdisplayname: "Dog",
                    chance: 0.35
                },
                {
                    petname: "Cat",
                    rarity: "Common",
                    base: 2,
                    petdisplayname: "Cat",
                    chance: 0.29
                },
                {
                    petname: "Bunny",
                    rarity: "Common",
                    base: 3,
                    petdisplayname: "Bunny",
                    chance: 0.18
                },
                {
                    petname: "Bear",
                    rarity: "Rare",
                    base: 4,
                    petdisplayname: "Bear",
                    chance: 0.12
                },
                {
                    petname: "Panther",
                    rarity: "Rare",
                    base: 6,
                    petdisplayname: "Panther",
                    chance: 0.059
                },
                {
                    petname: "Dumb Dog",
                    rarity: "Secret I",
                    base: 67,
                    petdisplayname: "Dumb Dog",
                    chance: 0.0003
                }
            ]
        },
        "Acorn Egg": {
            cost: 2700,
            pets: [
                {
                    petname: "Hamster",
                    rarity: "Common",
                    base: 6,
                    petdisplayname: "Hamster",
                    chance: 0.34
                },
                {
                    petname: "Mouse",
                    rarity: "Common",
                    base: 7,
                    petdisplayname: "Mouse",
                    chance: 0.24
                },
                {
                    petname: "Chicken",
                    rarity: "Common",
                    base: 8,
                    petdisplayname: "Chicken",
                    chance: 0.20
                },
                {
                    petname: "Sheep",
                    rarity: "Rare",
                    base: 10,
                    petdisplayname: "Sheep",
                    chance: 0.13
                },
                {
                    petname: "Doggy",
                    rarity: "Rare",
                    base: 12,
                    petdisplayname: "Doggy",
                    chance: 0.068
                },
                {
                    petname: "Owl",
                    rarity: "Epic",
                    base: 17,
                    petdisplayname: "Owl",
                    chance: 0.024
                }
            ]
        },
        "Mountain Egg": {
            cost: 500000,
            pets: [
                {
                    petname: "Baor",
                    rarity: "Common",
                    base: 25,
                    petdisplayname: "Baor",
                    chance: 0.5
                },
                {
                    petname: "Goat",
                    rarity: "Common",
                    base: 27,
                    petdisplayname: "Goat",
                    chance: 0.3
                },
                {
                    petname: "Elephant",
                    rarity: "Rare",
                    base: 30,
                    petdisplayname: "Elephant",
                    chance: 0.09
                },
                {
                    petname: "Lion",
                    rarity: "Rare",
                    base: 33,
                    petdisplayname: "Lion",
                    chance: 0.08
                },
                {
                    petname: "Lynx",
                    rarity: "Epic",
                    base: 40,
                    petdisplayname: "Lynx",
                    chance: 0.03
                },
                {
                    petname: "CardinalHydra",
                    rarity: "Legendary",
                    base: 75,
                    petdisplayname: "Cardinal Hydra",
                    chance: 0.008
                }
            ]
        },
        "Mountain Egg": {
            cost: 500000,
            pets: [
                {
                    petname: "Baor",
                    rarity: "Common",
                    base: 25,
                    petdisplayname: "Baor",
                    chance: 0.5
                },
                {
                    petname: "Goat",
                    rarity: "Common",
                    base: 27,
                    petdisplayname: "Goat",
                    chance: 0.3
                },
                {
                    petname: "Elephant",
                    rarity: "Rare",
                    base: 30,
                    petdisplayname: "Elephant",
                    chance: 0.09
                },
                {
                    petname: "Lion",
                    rarity: "Rare",
                    base: 33,
                    petdisplayname: "Lion",
                    chance: 0.08
                },
                {
                    petname: "Lynx",
                    rarity: "Epic",
                    base: 40,
                    petdisplayname: "Lynx",
                    chance: 0.03
                },
                {
                    petname: "CardinalHydra",
                    rarity: "Legendary",
                    base: 75,
                    petdisplayname: "Cardinal Hydra",
                    chance: 0.008
                }
            ]
        },
        "Mountain Egg": {
            cost: 500000,
            pets: [
                {
                    petname: "Baor",
                    rarity: "Common",
                    base: 25,
                    petdisplayname: "Baor",
                    chance: 0.5
                },
                {
                    petname: "Goat",
                    rarity: "Common",
                    base: 27,
                    petdisplayname: "Goat",
                    chance: 0.3
                },
                {
                    petname: "Elephant",
                    rarity: "Rare",
                    base: 30,
                    petdisplayname: "Elephant",
                    chance: 0.09
                },
                {
                    petname: "Lion",
                    rarity: "Rare",
                    base: 33,
                    petdisplayname: "Lion",
                    chance: 0.08
                },
                {
                    petname: "Lynx",
                    rarity: "Epic",
                    base: 40,
                    petdisplayname: "Lynx",
                    chance: 0.03
                },
                {
                    petname: "CardinalHydra",
                    rarity: "Legendary",
                    base: 75,
                    petdisplayname: "Cardinal Hydra",
                    chance: 0.008
                }
            ]
        },
        "Mountain Egg": {
            cost: 500000,
            pets: [
                {
                    petname: "Baor",
                    rarity: "Common",
                    base: 25,
                    petdisplayname: "Baor",
                    chance: 0.5
                },
                {
                    petname: "Goat",
                    rarity: "Common",
                    base: 27,
                    petdisplayname: "Goat",
                    chance: 0.3
                },
                {
                    petname: "Elephant",
                    rarity: "Rare",
                    base: 30,
                    petdisplayname: "Elephant",
                    chance: 0.09
                },
                {
                    petname: "Lion",
                    rarity: "Rare",
                    base: 33,
                    petdisplayname: "Lion",
                    chance: 0.08
                },
                {
                    petname: "Lynx",
                    rarity: "Epic",
                    base: 40,
                    petdisplayname: "Lynx",
                    chance: 0.03
                },
                {
                    petname: "CardinalHydra",
                    rarity: "Legendary",
                    base: 75,
                    petdisplayname: "Cardinal Hydra",
                    chance: 0.008
                }
            ]
        },
        "Mountain Egg": {
            cost: 500000,
            pets: [
                {
                    petname: "Baor",
                    rarity: "Common",
                    base: 25,
                    petdisplayname: "Baor",
                    chance: 0.5
                },
                {
                    petname: "Goat",
                    rarity: "Common",
                    base: 27,
                    petdisplayname: "Goat",
                    chance: 0.3
                },
                {
                    petname: "Elephant",
                    rarity: "Rare",
                    base: 30,
                    petdisplayname: "Elephant",
                    chance: 0.09
                },
                {
                    petname: "Lion",
                    rarity: "Rare",
                    base: 33,
                    petdisplayname: "Lion",
                    chance: 0.08
                },
                {
                    petname: "Lynx",
                    rarity: "Epic",
                    base: 40,
                    petdisplayname: "Lynx",
                    chance: 0.03
                },
                {
                    petname: "CardinalHydra",
                    rarity: "Legendary",
                    base: 75,
                    petdisplayname: "Cardinal Hydra",
                    chance: 0.008
                }
            ]
        },
        "Mountain Egg": {
            cost: 500000,
            pets: [
                {
                    petname: "Baor",
                    rarity: "Common",
                    base: 25,
                    petdisplayname: "Baor",
                    chance: 0.5
                },
                {
                    petname: "Goat",
                    rarity: "Common",
                    base: 27,
                    petdisplayname: "Goat",
                    chance: 0.3
                },
                {
                    petname: "Elephant",
                    rarity: "Rare",
                    base: 30,
                    petdisplayname: "Elephant",
                    chance: 0.09
                },
                {
                    petname: "Lion",
                    rarity: "Rare",
                    base: 33,
                    petdisplayname: "Lion",
                    chance: 0.08
                },
                {
                    petname: "Lynx",
                    rarity: "Epic",
                    base: 40,
                    petdisplayname: "Lynx",
                    chance: 0.03
                },
                {
                    petname: "CardinalHydra",
                    rarity: "Legendary",
                    base: 75,
                    petdisplayname: "Cardinal Hydra",
                    chance: 0.008
                }
            ]
        },
        "Mountain Egg": {
            cost: 500000,
            pets: [
                {
                    petname: "Baor",
                    rarity: "Common",
                    base: 25,
                    petdisplayname: "Baor",
                    chance: 0.5
                },
                {
                    petname: "Goat",
                    rarity: "Common",
                    base: 27,
                    petdisplayname: "Goat",
                    chance: 0.3
                },
                {
                    petname: "Elephant",
                    rarity: "Rare",
                    base: 30,
                    petdisplayname: "Elephant",
                    chance: 0.09
                },
                {
                    petname: "Lion",
                    rarity: "Rare",
                    base: 33,
                    petdisplayname: "Lion",
                    chance: 0.08
                },
                {
                    petname: "Lynx",
                    rarity: "Epic",
                    base: 40,
                    petdisplayname: "Lynx",
                    chance: 0.03
                },
                {
                    petname: "CardinalHydra",
                    rarity: "Legendary",
                    base: 75,
                    petdisplayname: "Cardinal Hydra",
                    chance: 0.008
                }
            ]
        }
    },
    "Exclusive Eggs": {
        "Chronos Egg": {
            cost: 399, 
            pets: [
                {
                    petname: "Pet_Dolphin",
                    rarity: "Legendary",
                    base: 25000,
                    petdisplayname: "Ocean Dolphin",
                    chance: 0.5
                },
                {
                    petname: "Pet_Whale",
                    rarity: "Mythical",
                    base: 45000,
                    petdisplayname: "Blue Whale",
                    chance: 0.00001
                }
            ]
        },
        "Deep Sea Egg": {
            cost: 150000,
            pets: [
                {
                    petname: "Pet_Shark",
                    rarity: "Mythical",
                    base: 50000,
                    petdisplayname: "Deep Sea Shark",
                    chance: 0.65
                },
                {
                    petname: "Pet_Megalodon",
                    rarity: "Godly",
                    base: 95000,
                    petdisplayname: "Ancient Megalodon",
                    chance: 0.0001
                }
            ]
        }
    },
    "World 3": {
        "Sky Egg": {
            cost: 500000,
            pets: [
                {
                    petname: "Pet_Dragon",
                    rarity: "Godly",
                    base: 100000,
                    petdisplayname: "Sky Dragon",
                    chance: 0.55
                },
                {
                    petname: "Pet_Wyvern",
                    rarity: "Exclusive",
                    base: 220000,
                    petdisplayname: "Storm Wyvern",
                    chance: 0.00005
                }
            ]
        },
        "Heaven Egg": {
            cost: 2000000,
            pets: [
                {
                    petname: "Pet_Phoenix",
                    rarity: "Exclusive",
                    base: 250000,
                    petdisplayname: "Heaven Phoenix",
                    chance: 0.7
                },
                {
                    petname: "Pet_Seraphim",
                    rarity: "Secret I",
                    base: 500000,
                    petdisplayname: "Divine Seraphim",
                    chance: 0.000001
                }
            ]
        }
    }
};

// ===== Format Number with Abbreviations =====
// Converts numbers over 999 to abbreviated format (1000 -> 1K, 1000000 -> 1M, etc.)
function formatNumberAbbreviated(num) {
    if (num < 1000) {
        return num.toString();
    }
    
    let tier = Math.floor(Math.log10(num) / 3);
    if (tier >= NUMBER_ABBREVIATIONS.length) {
        tier = NUMBER_ABBREVIATIONS.length - 1;
    }
    
    const suffix = NUMBER_ABBREVIATIONS[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;
    
    // Format with appropriate decimal places
    const formatted = scaled >= 100 ? scaled.toFixed(0) : scaled.toFixed(1);
    return formatted + suffix;
}

// ===== Format Chance Display with Luck =====
// Converts decimal to "X% / 1 in Y" format with luck multiplier applied
// Example: 0.001 with 100% luck → "0.001% / 1 in 100K"
// Example: 0.001 with 400% luck → "0.004% / 1 in 25K"
function formatChance(decimal, luckMultiplier = 1) {
    if (!decimal || decimal <= 0) {
        console.warn('⚠️ Invalid chance value provided');
        return 'Unknown';
    }
    
    // Apply luck multiplier to chance
    const adjustedChance = Math.min(decimal * luckMultiplier, 1); // Cap at 100%
    
    // Convert to percentage
    const percentage = (adjustedChance * 100).toFixed(3).replace(/\.?0+$/, '');
    
    // Calculate ratio (1 in X) with abbreviations
    const ratio = 1 / adjustedChance;
    const ratioText = formatNumberAbbreviated(Math.round(ratio));
    
    return `${percentage}% / 1 in ${ratioText}`;
}

// ===== Validation Check =====
// Warn if any egg has invalid data
(function validateData() {
    for (const world in WIKI_DATA) {
        for (const egg in WIKI_DATA[world]) {
            const eggData = WIKI_DATA[world][egg];
            
            if (!eggData.pets || !Array.isArray(eggData.pets)) {
                console.warn(`⚠️ ${egg} in ${world} has no pets array`);
                continue;
            }
            
            if (!eggData.cost || eggData.cost <= 0) {
                console.warn(`⚠️ ${egg} in ${world} has invalid cost`);
            }
            
            if (eggData.pets.length === 0) {
                console.warn(`⚠️ ${egg} in ${world} has no pets`);
            }
            
            eggData.pets.forEach((petData, index) => {
                if (!RARITIES[petData.rarity]) {
                    console.warn(`⚠️ Invalid rarity "${petData.rarity}" for pet ${index + 1} in ${egg} (${world})`);
                }
                if (!petData.base || petData.base <= 0) {
                    console.warn(`⚠️ Invalid base stat for pet ${index + 1} in ${egg} (${world})`);
                }
                if (!petData.chance || petData.chance <= 0 || petData.chance > 1) {
                    console.warn(`⚠️ Invalid chance for pet ${index + 1} in ${egg} (${world}) - must be decimal between 0 and 1`);
                }
            });
        }
    }
})();

// js/data.js
