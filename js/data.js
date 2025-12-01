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
    "Leaderboard": {
        color: "rgb(255, 215, 0)",
        maxLevel: 100
    },
    "Secret I": {
        color: "rgb(255, 0, 0)",
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
// Each egg has a type: "Base", "Robux", or "Leaderboard"
// Base eggs: base is a number, uses ×2/×4 multipliers
// Robux/Leaderboard eggs: base is a percentage (85 = 85%), uses ×1.25/×1.5 multipliers
const WIKI_DATA = {
    "World 1": {
        "Basic Egg": {
            type: "Base",
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
                    chance: 0.000003
                }
            ]
        },
        "Acorn Egg": {
            type: "Base",
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
        "Safari Egg": {
            type: "Base",
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
        "Snowman Egg": {
            type: "Base",
            cost: 30000000,
            pets: [
                {
                    petname: "Moose",
                    rarity: "Common",
                    base: 50,
                    petdisplayname: "Moose",
                    chance: 0.4
                },
                {
                    petname: "Mammoth",
                    rarity: "Rare",
                    base: 60,
                    petdisplayname: "Mammoth",
                    chance: 0.3
                },
                {
                    petname: "Snowman",
                    rarity: "Rare",
                    base: 70,
                    petdisplayname: "Snowman",
                    chance: 0.13
                },
                {
                    petname: "Yeti",
                    rarity: "Rare",
                    base: 85,
                    petdisplayname: "Yeti",
                    chance: 0.1
                },
                {
                    petname: "TriYeti",
                    rarity: "Epic",
                    base: 100,
                    petdisplayname: "Tri-Yeti",
                    chance: 0.06
                },
                {
                    petname: "FrostGolem",
                    rarity: "Mythical",
                    base: 250,
                    petdisplayname: "FrostGolem",
                    chance: 0.001
                },
                {
                    petname: "FrostQueen",
                    rarity: "Secret I",
                    base: 3000,
                    petdisplayname: "Frost Queen",
                    chance: 0.00001
                }
            ]
        },
        "Cactus Egg": {
            type: "Base",
            cost: 750000000,
            pets: [
                {
                    petname: "DuneDog",
                    rarity: "Common",
                    base: 125,
                    petdisplayname: "Dune Dog",
                    chance: 0.33
                },
                {
                    petname: "Mummy",
                    rarity: "Common",
                    base: 140,
                    petdisplayname: "Mummy",
                    chance: 0.3
                },
                {
                    petname: "Camel",
                    rarity: "Common",
                    base: 190,
                    petdisplayname: "Camel",
                    chance: 0.25
                },
                {
                    petname: "MummifiedWyvern",
                    rarity: "Rare",
                    base: 240,
                    petdisplayname: "Mummified Wyvern",
                    chance: 0.08
                },
                {
                    petname: "Sphinx",
                    rarity: "Epic",
                    base: 300,
                    petdisplayname: "Sphinx",
                    chance: 0.03
                },
                {
                    petname: "CactusRaider",
                    rarity: "Legendary",
                    base: 500,
                    petdisplayname: "Cactus Raider",
                    chance: 0.005
                },
                {
                    petname: "SerpentGod",
                    rarity: "Mythical",
                    base: 760,
                    petdisplayname: "Serpent God",
                    chance: 0.001
                }
            ]
        },
        "Jungle Egg": {
            type: "Base",
            cost: 40000000000,
            pets: [
                {
                    petname: "Frog",
                    rarity: "Common",
                    base: 320,
                    petdisplayname: "Frog",
                    chance: 0.33
                },
                {
                    petname: "Monkey",
                    rarity: "Common",
                    base: 370,
                    petdisplayname: "Monkey",
                    chance: 0.25
                },
                {
                    petname: "Spider",
                    rarity: "Common",
                    base: 420,
                    petdisplayname: "Spider",
                    chance: 0.18
                },
                {
                    petname: "Gorilla",
                    rarity: "Rare",
                    base: 470,
                    petdisplayname: "Gorilla",
                    chance: 0.12
                },
                {
                    petname: "Panda",
                    rarity: "Epic",
                    base: 560,
                    petdisplayname: "Panda",
                    chance: 0.09
                },
                {
                    petname: "JungleHydra",
                    rarity: "Epic",
                    base: 730,
                    petdisplayname: "Jungle Hydra",
                    chance: 0.028
                },
                {
                    petname: "VenomDominus",
                    rarity: "Legendary",
                    base: 950,
                    petdisplayname: "Venom Dominus",
                    chance: 0.0011
                },
                {
                    petname: "Treant",
                    rarity: "Mythical",
                    base: 2000,
                    petdisplayname: "Treant",
                    chance: 0.0005
                }
            ]
        },
        "Heaven Egg": {
            type: "Base",
            cost: 1500000000000,
            pets: [
                {
                    petname: "HolySquirrel",
                    rarity: "Common",
                    base: 850,
                    petdisplayname: "Holy Squirrel",
                    chance: 0.33
                },
                {
                    petname: "HaloChicken",
                    rarity: "Rare",
                    base: 900,
                    petdisplayname: "Halo Chicken",
                    chance: 0.28
                },
                {
                    petname: "Phoenix",
                    rarity: "Rare",
                    base: 1000,
                    petdisplayname: "Phoenix",
                    chance: 0.14
                },
                {
                    petname: "TriPhoenix",
                    rarity: "Epic",
                    base: 1100,
                    petdisplayname: "Tri-Phoenix",
                    chance: 0.14
                },
                {
                    petname: "TreeOfLife",
                    rarity: "Legendary",
                    base: 1400,
                    petdisplayname: "Tree Of Life",
                    chance: 0.035
                },
                {
                    petname: "DivineGaurd",
                    rarity: "Legendary",
                    base: 1500,
                    petdisplayname: "Divine Gaurd",
                    chance: 0.0049
                },
                {
                    petname: "Archangel",
                    rarity: "Mythical",
                    base: 2500,
                    petdisplayname: "Archangel",
                    chance: 0.0049
                },
                {
                    petname: "WeepingAngle",
                    rarity: "Secret I",
                    base: 6500,
                    petdisplayname: "Weeping Angle",
                    chance: 0.000003
                }
            ]
        },
        "Sakura Egg": {
            type: "Base",
            cost: 40000000000000,
            pets: [
                {
                    petname: "NinjaPup",
                    rarity: "Common",
                    base: 2200,
                    petdisplayname: "Ninja Pup",
                    chance: 0.35
                },
                {
                    petname: "KarateLynx",
                    rarity: "Rare",
                    base: 2300,
                    petdisplayname: "Karate Lynx",
                    chance: 0.28
                },
                {
                    petname: "SakuraNymph",
                    rarity: "Rare",
                    base: 2650,
                    petdisplayname: "Sakura Nymph",
                    chance: 0.19
                },
                {
                    petname: "BonsaiMonster",
                    rarity: "Epic",
                    base: 2900,
                    petdisplayname: "Bonsai Monster",
                    chance: 0.14
                },
                {
                    petname: "NinjaDemon",
                    rarity: "Epic",
                    base: 3250,
                    petdisplayname: "Ninja Demon",
                    chance: 0.035
                },
                {
                    petname: "NinjaTriDemon",
                    rarity: "Legendary",
                    base: 3900,
                    petdisplayname: "Ninja Tri-Demon",
                    chance: 0.0049
                },
                {
                    petname: "SakuraQueen",
                    rarity: "Mythical",
                    base: 8000,
                    petdisplayname: "Sakura Queen",
                    chance: 0.0001
                },
                {
                    petname: "SakuraDominator",
                    rarity: "Secret I",
                    base: 25000,
                    petdisplayname: "Sakura Dominator",
                    chance: 0.000003
                }
            ]
        },
        "Elemental Egg": {
            type: "Base",
            cost: 1500000000000000,
            pets: [
                {
                    petname: "FireNinja",
                    rarity: "Common",
                    base: 5000,
                    petdisplayname: "Fire Ninja",
                    chance: 0.38
                },
                {
                    petname: "SenseiPanda",
                    rarity: "Rare",
                    base: 5300,
                    petdisplayname: "Sensei Panda",
                    chance: 0.3
                },
                {
                    petname: "MonkeyWarrior",
                    rarity: "Rare",
                    base: 5900,
                    petdisplayname: "Monkey Warrior",
                    chance: 0.18
                },
                {
                    petname: "BearBender",
                    rarity: "Epic",
                    base: 6500,
                    petdisplayname: "Bear Bender",
                    chance: 0.12
                },
                {
                    petname: "SilentAssassin",
                    rarity: "Legendary",
                    base: 6900,
                    petdisplayname: "Silent Assassin",
                    chance: 0.02
                },
                {
                    petname: "WaterBeast",
                    rarity: "Legendary",
                    base: 7500,
                    petdisplayname: "Water Beast",
                    chance: 0.0015
                },
                {
                    petname: "Samureye",
                    rarity: "Mythical",
                    base: 13000,
                    petdisplayname: "Samureye",
                    chance: 0.0001
                },
                {
                    petname: "DivineDragon",
                    rarity: "Secret I",
                    base: 26000,
                    petdisplayname: "Divine Dragon",
                    chance: 0.000002
                },
                {
                    petname: "RagingClaw",
                    rarity: "Secret II",
                    base: 40000,
                    petdisplayname: "Raging Claw",
                    chance: 0.000001
                }
            ]
        }
    },
    "Exclusive Eggs": {
        "Chronos Egg": {
            type: "Robux",
            packs: [
                { amount: 1, price: 399 },
                { amount: 3, price: 1200 },
                { amount: 10, price: 3200 }
            ],
            pets: [
                {
                    petname: "Kairos",
                    rarity: "Exclusive",
                    base: 75,
                    petdisplayname: "Kairos",
                    chance: 0.5
                },
                {
                    petname: "Paradox",
                    rarity: "Exclusive",
                    base: 85,
                    petdisplayname: "Paradox",
                    chance: 0.35
                },
                {
                    petname: "Chronos",
                    rarity: "Exclusive",
                    base: 100,
                    petdisplayname: "Chronos",
                    chance: 0.001
                }
            ]
        }
    },
    "Leaderboard": {
        "Season One": {
            type: "Leaderboard",
            pets: [
                {
                    petname: "DivineCelestia",
                    rarity: "Leaderboard",
                    base: 125,
                    petdisplayname: "Divine Celestia",
                    leaderboardTier: "Top 10",
                    chance: 1.0
                },
                {
                    petname: "SilverEmperor",
                    rarity: "Leaderboard",
                    base: 110,
                    petdisplayname: "Silver Emperor",
                    leaderboardTier: "Top 100",
                    chance: 1.0
                },
                {
                    petname: "TrophyGaurdian",
                    rarity: "Leaderboard",
                    base: 90,
                    petdisplayname: "Trophy Gaurdian",
                    leaderboardTier: "Top 250",
                    chance: 1.0
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

// ===== Format Chance Display =====
// Converts decimal to "X% / 1 in Y" format
// Handles very small percentages correctly (e.g., 0.00001% shows correctly, not as 0%)
function formatChance(decimal) {
    if (!decimal || decimal <= 0) {
        console.warn('⚠️ Invalid chance value provided');
        return 'Unknown';
    }
    
    // Convert to percentage with dynamic precision
    const percentage = (decimal * 100);
    let percentageStr;
    
    if (percentage >= 0.001) {
        // Normal percentages: show up to 3 decimal places, remove trailing zeros
        percentageStr = percentage.toFixed(3).replace(/\.?0+$/, '');
    } else {
        // Very small percentages: use scientific notation or more decimals
        percentageStr = percentage.toExponential(2);
    }
    
    // Calculate ratio (1 in X) with abbreviations
    const ratio = 1 / decimal;
    const ratioText = formatNumberAbbreviated(Math.round(ratio));
    
    return `${percentageStr}% / 1 in ${ratioText}`;
}

// ===== Validation Check =====
// Warn if any egg has invalid data
(function validateData() {
    for (const world in WIKI_DATA) {
        for (const egg in WIKI_DATA[world]) {
            const eggData = WIKI_DATA[world][egg];
            
            if (!eggData.type) {
                console.warn(`⚠️ ${egg} in ${world} has no type specified`);
            }
            
            if (eggData.type === "Base") {
                if (!eggData.cost || eggData.cost <= 0) {
                    console.warn(`⚠️ Base egg ${egg} in ${world} has invalid cost`);
                }
            }
            
            if (eggData.type === "Robux") {
                if (!eggData.packs || !Array.isArray(eggData.packs)) {
                    console.warn(`⚠️ Robux egg ${egg} in ${world} has no packs array`);
                }
            }
            
            if (!eggData.pets || !Array.isArray(eggData.pets)) {
                console.warn(`⚠️ ${egg} in ${world} has no pets array`);
                continue;
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
                if (eggData.type !== "Leaderboard" && (!petData.chance || petData.chance <= 0 || petData.chance > 1)) {
                    console.warn(`⚠️ Invalid chance for pet ${index + 1} in ${egg} (${world})`);
                }
            });
        }
    }
})();

// js/data.js
