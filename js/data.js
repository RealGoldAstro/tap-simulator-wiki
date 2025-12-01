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
// Add worlds and eggs here - this is the single source of truth
const WIKI_DATA = {
    "World 1": {
        "Starter Egg": {
            petname: "Pet_Bunny",
            rarity: "Common",
            base: 2000,
            petdisplayname: "Bunny Chow Mein"
        },
        "Forest Egg": {
            petname: "Pet_Fox",
            rarity: "Rare",
            base: 5000,
            petdisplayname: "Forest Fox"
        },
        "Mountain Egg": {
            petname: "Pet_Eagle",
            rarity: "Epic",
            base: 12000,
            petdisplayname: "Mountain Eagle"
        }
    },
    "World 2": {
        "Ocean Egg": {
            petname: "Pet_Dolphin",
            rarity: "Legendary",
            base: 25000,
            petdisplayname: "Ocean Dolphin"
        },
        "Deep Sea Egg": {
            petname: "Pet_Shark",
            rarity: "Mythical",
            base: 50000,
            petdisplayname: "Deep Sea Shark"
        }
    },
    "World 3": {
        "Sky Egg": {
            petname: "Pet_Dragon",
            rarity: "Godly",
            base: 100000,
            petdisplayname: "Sky Dragon"
        },
        "Heaven Egg": {
            petname: "Pet_Phoenix",
            rarity: "Exclusive",
            base: 250000,
            petdisplayname: "Heaven Phoenix"
        }
    }
};

// ===== Validation Check =====
// Warn if any egg has invalid rarity
(function validateData() {
    for (const world in WIKI_DATA) {
        for (const egg in WIKI_DATA[world]) {
            const petData = WIKI_DATA[world][egg];
            if (!RARITIES[petData.rarity]) {
                console.warn(`⚠️ Invalid rarity "${petData.rarity}" for ${egg} in ${world}`);
            }
            if (!petData.base || petData.base <= 0) {
                console.warn(`⚠️ Invalid base stat for ${egg} in ${world}`);
            }
        }
    }
})();

// js/data.js
