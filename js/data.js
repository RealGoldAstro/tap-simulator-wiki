// js/data.js

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
// Each egg contains an array of pets (supports up to 50 pets per egg)
const WIKI_DATA = {
    "World 1": {
        "Starter Egg": [
            {
                petname: "Pet_Bunny",
                rarity: "Common",
                base: 2000,
                petdisplayname: "Bunny Chow Mein",
                chance: "70%"
            },
            {
                petname: "Pet_Rabbit",
                rarity: "Rare",
                base: 4500,
                petdisplayname: "Speed Rabbit",
                chance: "30%"
            }
        ],
        "Forest Egg": [
            {
                petname: "Pet_Fox",
                rarity: "Rare",
                base: 5000,
                petdisplayname: "Forest Fox",
                chance: "60%"
            },
            {
                petname: "Pet_Wolf",
                rarity: "Epic",
                base: 11000,
                petdisplayname: "Alpha Wolf",
                chance: "40%"
            }
        ],
        "Mountain Egg": [
            {
                petname: "Pet_Eagle",
                rarity: "Epic",
                base: 12000,
                petdisplayname: "Mountain Eagle",
                chance: "55%"
            },
            {
                petname: "Pet_Hawk",
                rarity: "Legendary",
                base: 22000,
                petdisplayname: "Sky Hawk",
                chance: "45%"
            }
        ]
    },
    "World 2": {
        "Ocean Egg": [
            {
                petname: "Pet_Dolphin",
                rarity: "Legendary",
                base: 25000,
                petdisplayname: "Ocean Dolphin",
                chance: "50%"
            },
            {
                petname: "Pet_Whale",
                rarity: "Mythical",
                base: 45000,
                petdisplayname: "Blue Whale",
                chance: "50%"
            }
        ],
        "Deep Sea Egg": [
            {
                petname: "Pet_Shark",
                rarity: "Mythical",
                base: 50000,
                petdisplayname: "Deep Sea Shark",
                chance: "65%"
            },
            {
                petname: "Pet_Megalodon",
                rarity: "Godly",
                base: 95000,
                petdisplayname: "Ancient Megalodon",
                chance: "35%"
            }
        ]
    },
    "World 3": {
        "Sky Egg": [
            {
                petname: "Pet_Dragon",
                rarity: "Godly",
                base: 100000,
                petdisplayname: "Sky Dragon",
                chance: "55%"
            },
            {
                petname: "Pet_Wyvern",
                rarity: "Exclusive",
                base: 220000,
                petdisplayname: "Storm Wyvern",
                chance: "45%"
            }
        ],
        "Heaven Egg": [
            {
                petname: "Pet_Phoenix",
                rarity: "Exclusive",
                base: 250000,
                petdisplayname: "Heaven Phoenix",
                chance: "70%"
            },
            {
                petname: "Pet_Seraphim",
                rarity: "Secret I",
                base: 500000,
                petdisplayname: "Divine Seraphim",
                chance: "30%"
            }
        ]
    }
};

// ===== Validation Check =====
// Warn if any egg has invalid data
(function validateData() {
    for (const world in WIKI_DATA) {
        for (const egg in WIKI_DATA[world]) {
            const petArray = WIKI_DATA[world][egg];
            
            if (!Array.isArray(petArray)) {
                console.warn(`⚠️ ${egg} in ${world} is not an array`);
                continue;
            }
            
            if (petArray.length === 0) {
                console.warn(`⚠️ ${egg} in ${world} has no pets`);
            }
            
            petArray.forEach((petData, index) => {
                if (!RARITIES[petData.rarity]) {
                    console.warn(`⚠️ Invalid rarity "${petData.rarity}" for pet ${index + 1} in ${egg} (${world})`);
                }
                if (!petData.base || petData.base <= 0) {
                    console.warn(`⚠️ Invalid base stat for pet ${index + 1} in ${egg} (${world})`);
                }
                if (!petData.chance) {
                    console.warn(`⚠️ Missing chance for pet ${index + 1} in ${egg} (${world})`);
                }
            });
        }
    }
})();

// js/data.js
