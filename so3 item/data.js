// SO3 Item Creation Data
// Based on original work by Aerius and modifications by Brian Pendell

const MAX_ITEMS = 402; // Original: MAXITEMS

// Crafting Categories (Original: cx)
// Index: Name, Special Bonus Item
const craftingCategories = [
	['Alchemy', "Alchemist's Stone"],
	['Engineering', 'NC Program Disk'],
	['Compounding', 'Multi-Flask'],
	['Cooking', 'Keen Kitchen Knife'],
	['Crafting', 'Cherubic Bust'],
	['Smithery', 'Smithy Hammer'],
	['Writing', 'Enchanted Pen']
];

// Inventors Data (Original: ax)
// Index: Name, TimeMod, CostMod, Alc, Eng, Comp, Cook, Craft, Smith, Write Skills
const inventorData = [
	['Adray', -25, 30, 4, 7, 5, 20, 3, 27, 11],       // 0
	['Albel', 0, 5, 15, 16, 16, 16, 12, 30, 4],        // 1
	['Ansala', -20, 0, 99, 0, 0, 0, 0, 0, 0],          // 2
	['Aqua & Evia', 0, 10, 0, 0, 0, 0, 49, 0, 0],     // 3
	['Balbados', -40, 50, 0, 0, 0, 0, 37, 0, 0],       // 4
	['Boyd', 50, 0, 0, 0, 0, 0, 0, 95, 0],            // 5
	['Chilico', 60, -10, 0, 0, 0, 0, 60, 0, 0],        // 6
	['Cliff', 5, 0, 5, 36, 10, 9, 2, 31, 7],          // 7
	['Cornelius', -40, 0, 0, 0, 0, 0, 0, 0, 15],       // 8
	['Count Noppen', 0, 40, 0, 0, 0, 0, 0, 0, 44],     // 9
	['Damda Mooda', 0, 10, 0, 0, 0, 9, 0, 0, 0],      // 10
	['Dejison', -20, 40, 0, 6, 0, 0, 0, 0, 0],        // 11
	['Eliza', -30, 0, 4, 0, 0, 0, 0, 0, 0],           // 12
	['Fayt', 0, 0, 14, 25, 30, 16, 20, 29, 34],        // 13
	['Gossam', 0, 20, 0, 0, 9, 0, 0, 0, 0],          // 14
	['Grats', 0, 0, 0, 0, 0, 0, 0, 25, 0],            // 15
	['Gusto', -20, 0, 0, 0, 0, 0, 0, 60, 0],          // 16
	['Izak', -50, 0, 0, 65, 0, 0, 0, 0, 0],           // 17
	['Lias', 0, 20, 0, 0, 0, 0, 0, 36, 0],            // 18
	['Louise the Diviner', 30, 0, 0, 0, 98, 0, 0, 0, 0], // 19
	['Mackwell', 40, 0, 31, 0, 0, 0, 0, 0, 0],        // 20
	['Maria', 0, -10, 22, 20, 25, 19, 10, 4, 22],     // 21
	['Mayu', 0, -30, 0, 0, 0, 20, 0, 0, 0],           // 22 - Corrected Cooking Skill
	['Meryl', 30, 0, 0, 46, 0, 0, 0, 0, 0],           // 23
	['Milenya', 0, -20, 0, 0, 19, 0, 0, 0, 0],        // 24
	['Mirage', -5, -5, 18, 31, 27, 26, 30, 17, 16],   // 25
	['Mishell', 0, 10, 0, 0, 0, 0, 0, 0, 35],        // 26
	['Misty Lear', 0, 0, 50, 0, 0, 0, 0, 0, 0],       // 27
	['Nel', -5, 0, 20, 5, 10, 30, 15, 25, 14],        // 28
	['Osman the Sage', 40, 0, 0, 0, 0, 0, 0, 0, 73],  // 29
	['Peppita', -10, 10, 12, 15, 11, 6, 40, 5, 6],     // 30
	['Puffy', -40, 0, 0, 0, 57, 0, 0, 0, 0],          // 31
	['Rigel', 40, 0, 0, 0, 0, 57, 0, 0, 0],           // 32
	['Roger', 5, 0, 6, 20, 6, 2, 35, 23, 4],          // 33
	['Sophia', 0, -5, 36, 3, 15, 43, 33, 6, 15],      // 34
	['Stanice', -30, -20, 0, 0, 0, 0, 20, 0, 0],      // 35
	['The Killer Chef', -30, 0, 0, 0, 0, 98, 0, 0, 0], // 36
	['Vanilla', 0, 30, 0, 32, 0, 0, 0, 0, 0]          // 37
];

// Inventions Data (Original: bx)
// Index: Item Name, Type Index, Base cost, Difficulty, Inventor Group Index (ref inventorGroups)
const inventionData = [
    // --- Alchemy (Type 0) --- Items use group indices 0-14
    ["Repulsive Lump",0,9,1,0],
    ["Philosopher's Stone",0,12,100,1],
    ["Overweight Product",0,17,1,0],
    ["Strange Lump",0,18,1,0],
    ["Misconceived Product",0,30,1,0],
    ["Iron",0,50,15,2],
    ["Ruby",0,160,25,2],
    ["Sapphire",0,160,25,2],
    ["Stone of Evil",0,200,2,3],
    ["Emerald",0,200,25,4],
    ["Air Gem",0,350,40,5],
    ["Earth Gem",0,350,40,5],
    ["Fire Gem",0,350,40,5],
    ["Water Gem",0,350,40,5],
    ["Crystal",0,830,60,6],
    ["Brownie Stone",0,1050,70,7],
    ["Diamond",0,1290,60,8],
    ["Earth Homunculus",0,1300,80,9],
    ["Damask",0,1440,60,10],
    ["Nereid Stone",0,1550,70,7], // Uses group 7 again
    ["Sylph Stone",0,1550,70,11],
    ["Water Homunculus",0,1800,80,9], // Uses group 9 again
    ["Wind Homunculus",0,1800,80,12],
    ["Shell Sapphire",0,2300,90,13], // Uses group 13
    ["Salamander Stone",0,2550,70,7], // Uses group 7 again
    ["Star Ruby",0,2700,80,13], // Uses group 13
    ["Fire Homunculus",0,2800,80,12], // Uses group 12 again
    ["Mythril",0,3070,90,13], // Uses group 13
    ["Rainbow Diamond",0,3080,95,13], // Uses group 13
    ["Dark Crystal",0,3700,95,13], // Uses group 13
    ["Angel Stone",0,5050,70,7], // Uses group 7 again
    ["Orichalcum",0,5700,98,14], // Uses group 14
    ["Celestial Homunculus",0,10300,80,11], // Uses group 11 again

    // --- Engineering (Type 1) --- Items use group indices 15-33
    ["Repulsive Lump",1,9,1,15],
    ["Overwrought Product",1,17,1,15],
    ["Strange Lump",1,18,1,15],
    ["Misconceived Product",1,30,1,15],
    ["Reducer",1,31,30,16],
    ["Duck-Duck Bomb",1,35,15,17],
    ["Em Bomb",1,61,30,18],
    ["Em Bomb Mp",1,61,30,18],
    ["Shielding Device",1,61,70,19],
    ["Flare Bomb",1,65,10,17],
    ["Mind Bomb",1,65,15,18],
    ["Em Stun Bomb",1,91,50,18],
    ["Em Stun Bomb Mp",1,91,50,20],
    ["Berserker Device",1,101,60,21],
    ["Soul Strengthening Device",1,101,60,21],
    ["Mass Reducer",1,161,60,16],
    ["Ultimate Bomb",1,180,80,22],
    ["Em Explosive 2",1,181,40,23],
    ["Em Explosive Mp",1,181,40,23],
    ["Mega-Flare Bomb",1,185,70,24],
    ["Deadly Mind Bomb",1,185,90,23],
    ["Healing Device Mk1",1,201,50,25],
    ["Em Stun Explosive",1,211,60,26],
    ["Em Stun Explosive Mp",1,211,60,26],
    ["ES Hybrid Bomb",1,231,70,23],
    ["Tricky Bomb",1,260,1,27],
    ["Battle Sphere",1,301,50,28],
    ["Tricky Duck Bomb",1,380,1,27],
    ["Healing Device Mk2",1,401,70,29],
    ["Es Hybrid Explosive",1,431,80,24],
    ["Power Blaster",1,580,30,30],
    ["Healing Device Mk3",1,801,100,31],
    ["Beguiling Device",1,1001,80,19],
    ["Pulse Needle",1,1280,50,32],
    ["Hawk Wind",1,1740,20,30],
    ["Photonic Blaster",1,5950,70,33],
    ["Paralyzer",1,6000,90,26],
    ["Particle Laser",1,7440,100,26],

    // --- Compounding (Type 2) --- Items use group indices 34-50
    ["Potion of Youth (Fake)",2,5,65,34],
    ["Bitter Potion",2,12,1,35],
    ["Bubbling Potion",2,12,1,36],
    ["Malodorous Potion",2,12,1,37],
    ["Thick Potion",2,12,1,36],
    ["Fruity Potion",2,13,20,35],
    ["Endorphin Boost",2,18,1,37],
    ["Syrupy Potion",2,20,40,38],
    ["Antidote",2,21,20,39],
    ["Berry Potion",2,21,20,39],
    ["Aqua Potion",2,22,20,39],
    ["Tears of Aphrodite",2,26,1,37],
    ["Pheramone Enhancer",2,36,1,37],
    ["Sleeping Gas",2,40,10,36],
    ["Vial of Poison",2,40,10,40],
    ["Sweet Potion",2,40,20,41],
    ["Tears of Venus",2,56,1,42],
    ["Medicine Bottle",2,60,5,41],
    ["Neural Augmenter",2,61,1,37],
    ["Shielding Device",2,61,70,36],
    ["Tears of Ishtar",2,86,1,37],
    ["Might Tablets",2,90,4,43],
    ["Berserker Device",2,101,60,36],
    ["Soul Strengthening Device",2,101,60,36],
    ["Miracle Power",2,102,1,44],
    ["Faerie Elixir",2,110,80,45],
    ["Heroic Elixir",2,110,80,45],
    ["Molotov Stun Bomb-R1",2,121,40,36],
    ["Umai-bo Stun Bomb-R3",2,121,40,36],
    ["Resurrection Elixir",2,140,2,45],
    ["Fizzing Potion",2,152,1,46],
    ["Deadly Poison",2,160,50,47],
    ["Bubbly Potion",2,202,1,44],
    ["Resurrection Mist",2,210,10,48],
    ["Witch Tablets",2,210,70,49],
    ["Super Potion",2,302,1,44],
    ["Verdurous Potion",2,310,90,41],
    ["Liquid Flare Bomb",2,601,30,36],
    ["Liquid Mind Bomb",2,601,30,36],
    ["Durian Stun Bomb-R4",2,731,40,36],
    ["Grabbag Stun Bomb-R2",2,731,40,36],
    ["Liquid Hybrid Bomb",2,801,90,36],
    ["Beguiling Device",2,1001,80,36],
    ["Cinderella Tablets",2,1001,99,50],
    ["Roe Tablets",2,3060,99,37],

    // --- Cooking (Type 3) --- Items use group indices 51-84
    ["Discordant Dessert",3,6,1,51],
    ["Vanilla Ice Cream",3,15,20,52],
    ["Tuna Salad",3,15,25,53],
    ["Sachertorte",3,15,50,54],
    ["Umeboshi",3,15,20,55],
    ["Curry Rice",3,18,20,56],
    ["Umai-Bo 1",3,20,30,57],
    ["Umai-Bo 2",3,20,30,57],
    ["Umai-Bo 3",3,20,30,57],
    ["Umai-Bo 4",3,20,30,58],
    ["Umai-Bo 5",3,20,30,58],
    ["Umai-Bo 6",3,20,30,58],
    ["Umai-Bo 7",3,20,30,59],
    ["Umai-Bo 8",3,20,30,59],
    ["Umai-Bo 10",3,20,60,60],
    ["Umai-Bo 11",3,20,60,60],
    ["Umai-Bo 12",3,20,60,57],
    ["Umai-Bo 14",3,20,60,60],
    ["Umai-Bo 9",3,20,60,60],
    ["Tasteless Stew",3,21,1,51],
    ["Decorated Cake",3,22,50,58],
    ["Gelatinous Potion",3,25,60,59],
    ["Petite Sirloin",3,30,5,59],
    ["Itty-Bitty Steak",3,30,60,59],
    ["Kid's Meal",3,30,60,54],
    ["Super-Sweet Curry",3,31,1,51],
    ["Cheap Cider",3,32,1,61],
    ["Deluxe Fruit Bowl",3,40,10,52],
    ["Natto",3,40,20,62],
    ["Corn on the Cob",3,40,25,57],
    ["Chopped Steak",3,40,30,53],
    ["Cold Soba",3,40,30,63],
    ["Fresh Spring Rolls",3,40,30,58],
    ["Roast Duck",3,40,30,64],
    ["Pasta Salad",3,40,40,52],
    ["Kimchi",3,40,50,53],
    ["Almond Jelly",3,40,60,65],
    ["Chocolate Banana",3,40,60,52],
    ["Friend Turnips",3,40,60,53],
    ["Grilled Tuna Head",3,40,60,66],
    ["Kirschtorte",3,40,60,54],
    ["Fruit Parfait",3,40,70,52],
    ["Pear Tart",3,40,70,58],
    ["Soft-Shelled Turtle",3,40,70,66],
    ["Watermelon Bar",3,40,70,59],
    ["Awful Cider",3,42,1,67],
    ["Gratin",3,50,30,53],
    ["Mont Blanc",3,50,50,57],
    ["Sirloin 140",3,50,80,68],
    ["Golden Curry",3,63,65,69],
    ["Spicy Cake",3,86,1,70],
    ["Cheap Sashami",3,96,1,51],
    ["Boiled King Crab",3,100,40,57],
    ["Bleu Cheese",3,100,60,52],
    ["Haute Chinese Soup",3,100,60,60],
    ["Otoro",3,100,60,59],
    ["BBQ Pork Ramen",3,102,40,53],
    ["Marbled Beef Sirloin",3,110,70,60],
    ["Peach Dessert Soup",3,130,60,60],
    ["Tough Steak",3,135,1,51],
    ["Prehistoric Meat",3,210,20,71],
    ["Mammoth Meat",3,210,70,72],
    ["Jumbo Pot Stickers",3,280,40,71],
    ["Blue Moon Cider",3,305,40,66],
    ["Joyful Bandit Cider",3,305,75,73],
    ["Granadilla Juice",3,330,40,74],
    ["Rambutan Juice",3,330,70,57],
    ["Silver Scepter Cider",3,330,70,75],
    ["Tamarind Juice",3,330,70,57],
    ["Fiery Cyclops Cider",3,330,75,76],
    ["Hogplum Juice",3,330,80,77],
    ["Leaping Titan Cider",3,330,80,77],
    ["Winking Sage Cider",3,330,80,78],
    ["Broken Prophet Cider",3,340,50,79],
    ["Brass Demon Cider",3,340,80,79],
    ["Howling Fox Cider",3,390,75,79],
    ["Sapodilla Juice",3,390,90,77],
    ["Lord's Ozoni",3,410,80,71],
    ["Hungry Harpy Cider",3,420,90,80],
    ["Fachuchon",3,429,99,60],
    ["Legendary Otoro",3,434,99,59],
    ["Ozoni of Madness",3,434,99,60],
    ["Jackfruit Juice",3,500,80,57],
    ["Growling Fist Cider",3,500,95,80],
    ["Pomegranate Juice",3,570,95,74],
    ["Lansium Juice",3,570,99,74],
    ["Mangosteen Juice",3,570,100,74],
    ["Ultimate Ramen",3,649,99,59],
    ["Amazing Tenderloin",3,694,99,60],
    ["Beautiful Ice Cream",3,694,99,81],
    ["Demonic Durian",3,694,99,60],
    ["Devilish Sea Squirt",3,694,99,60],
    ["Dragon Pot Stickers",3,694,99,60],
    ["Golden Natto",3,694,99,59],
    ["Handmade Soba",3,694,99,82],
    ["Lilien's Ultimate",3,694,99,83],
    ["Luscious Gratin",3,694,99,60],
    ["Luscious Oysters",3,694,99,59],
    ["Perfect Duck",3,694,99,81],
    ["Shining Pasta",3,694,99,60],
    ["Slimy Gelatin",3,694,99,60],
    ["Super-Spicy Stew",3,694,99,60],
    ["Supreme Dorayaki Pie",3,694,99,84],
    ["Tearful Risotto",3,694,99,60],
    ["Marbled Sirloin 1000",3,870,60,60],
    ["Giant King Crab",3,1234,99,81],
    ["Magical Salad",3,1234,99,60],
    ["Well-Aged Cheese",3,1234,99,60],
    ["Spicy Stew",3,2512,40,60],
    ["Umai-Bo 13",3,5010,99,58],

    // --- Crafting (Type 4) --- Items use group indices 85-105
    ["Vulgar Hair Ornament",4,1,1,85],
    ["Disgusting Doll",4,2,1,86],
    ["Over-Carved Figure",4,8,1,86],
    ["Crude Ring",4,10,1,87],
    ["Strange Figure",4,12,1,86],
    ["Heavy Ring",4,15,1,87],
    ["Tacky Earring",4,15,1,87],
    ["Unbelievable Hair Ornament",4,15,1,85],
    ["Embarrassing Earring",4,20,1,85],
    ["Loose Ring",4,20,1,87],
    ["Humiliating Earring",4,30,1,87],
    ["Pitiful Earring",4,50,1,88],
    ["Third-Rate Bracelet",4,60,1,88],
    ["Laughable Bracelet",4,80,1,89],
    ["Purple Orb",4,150,30,90],
    ["Brooch of Footwork",4,170,20,91],
    ["Mystic Orb",4,200,60,92],
    ["Ring of Lunacy",4,200,70,93],
    ["Earring of Accuracy",4,220,40,92],
    ["Ring of Mental Power",4,220,80,92],
    ["Feline Guardian",4,221,2,94],
    ["Bangle of Accuracy",4,222,20,95],
    ["Adorable Kitty Doll",4,241,2,90],
    ["Blue Talisman",4,260,20,95],
    ["Red Talisman",4,260,20,95],
    ["Yellow Talisman",4,260,20,96],
    ["Ankh of Dismissal",4,280,50,97],
    ["Badge of Reflection",4,290,20,92],
    ["Badge of Resistance",4,290,20,98],
    ["Badge of Shielding",4,290,20,98],
    ["Bangle of Intellect",4,300,20,95],
    ["Ring of Healing",4,300,80,98],
    ["Ring of Might",4,305,99,93],
    ["Lunar Talisman",4,320,70,99],
    ["Star Talisman",4,320,70,99],
    ["Blazing Pendant",4,380,30,92],
    ["Green Talisman",4,460,20,100],
    ["Berserker's Pendant",4,490,70,92],
    ["Anti-Poison Amulet",4,500,50,101],
    ["Battle Bonus Ring",4,500,80,98],
    ["Bladebane Cross",4,550,50,102],
    ["Demonbane Cross",4,550,50,92],
    ["Magebane Ankh",4,550,50,102],
    ["Silver Cross",4,550,50,102],
    ["Wingbane Cross",4,550,50,102],
    ["Amulet of Freedom",4,600,50,95],
    ["Faerie Ring",4,600,80,98],
    ["Emerald Ring",4,600,90,91],
    ["Anti-Incapacitation Amulet",4,601,60,103],
    ["Ring of Erudition",4,640,70,98],
    ["Anti-Silence Amulet",4,650,50,104],
    ["Anti-Stone Amulet",4,700,50,99],
    ["Ring of Quietude",4,700,50,93],
    ["Ring of Animosity",4,700,70,92],
    ["Anti-Freezing Amulet",4,800,50,104],
    ["Aqua Ring",4,900,40,98],
    ["Earth Ring",4,900,40,98],
    ["Flare Ring",4,900,40,98],
    ["Wind Ring",4,900,40,98],
    ["Elven Slippers",4,1020,60,92],
    ["Ring of Haste",4,1100,60,98],
    ["Mallet Charm",4,1280,99,92],
    ["Aegis Pendant",4,1370,98,92],
    ["Hammer Charm",4,1390,70,105],
    ["Faerie Earring",4,1600,80,92],
    ["Emerald Earring",4,1700,90,92],
    ["Boots of Prowess",4,2480,99,92],
    ["Star Necklace",4,4100,80,92],
    ["Theives' Boots",4,6700,99,102],
    ["Eldritch Brooch",4,8500,99,91],

    // --- Smithery (Type 5) --- Items use group indices 106-140
    ["Crude Rod",5,1,1,106],
    ["Rickety Gauntlet",5,3,1,106],
    ["Notched Sword",5,20,1,106],
    ["Bent Sword",5,30,1,107],
    ["Botched Sword",5,50,1,106],
    ["Crude Armor",5,50,1,107],
    ["Cloak",5,70,10,108],
    ["Rusty Axe",5,80,1,106],
    ["Thin Armor",5,80,1,107],
    ["Tattered Armor",5,100,1,107],
    ["Leather Armor",5,115,10,109],
    ["Cordon Scepter",5,115,20,110],
    ["Cuirass",5,120,10,111],
    ["Raunzel Daggers",5,123,20,112],
    ["Sword of the Blessed",5,125,10,113],
    ["Ranger's Helm",5,125,20,114],
    ["Mythril Plate",5,140,60,115],
    ["Silk Robe",5,170,20,116],
    ["The Samurai",5,190,10,117],
    ["Replica Gun",5,200,1,106],
    ["Chainmail",5,210,20,118],
    ["Atomic Gauntlets",5,220,90,119],
    ["Assassin's Sickles",5,248,30,112],
    ["Plate Armor",5,320,20,120],
    ["Cuir Bouilli",5,330,40,118],
    ["Prajna Claw",5,360,30,121],
    ["Crystal Robe",5,370,70,122],
    ["Paladin's Helm",5,400,100,119],
    ["Veinslay",5,400,100,119],
    ["Mythril Gauntlets",5,450,100,119],
    ["Devious Armor",5,460,30,117],
    ["Steel Armor",5,520,40,120],
    ["Shark Helm",5,575,50,114],
    ["Cloak of the Stars",5,620,50,122],
    ["Mythril Mesh",5,670,80,123],
    ["Hakuen",5,1000,40,117],
    ["Iron Cape",5,1130,20,124],
    ["Death's Talons",5,1220,70,125],
    ["Demon Slayer",5,3000,70,126],
    ["Flare Baselards",5,3055,50,127],
    ["Arc Wind Rippers",5,3300,90,128],
    ["Elven Cloak",5,3320,30,116],
    ["Cape of the Kraken",5,3320,70,129],
    ["Silvance",5,3400,80,119],
    ["Demonic Claw",5,3450,90,119],
    ["Dragon Blades",5,3500,20,119],
    ["Searing Sword",5,4000,40,113],
    ["Gatling Gauntlets",5,4200,70,130],
    ["Astral Armor",5,4530,99,131],
    ["Visored Helm",5,5002,90,119],
    ["False Gods' Claw",5,5135,20,121],
    ["Rune Blade",5,5250,20,113],
    ["Cattail Staff",5,5340,30,110],
    ["Golden Cape",5,5450,90,132],
    ["Cupid's Staff",5,5550,50,110],
    ["Claw of Judgement",5,6200,100,119],
    ["Rod of the Evil Eye",5,6230,100,132],
    ["The Immortal",5,6300,90,133],
    ["Glass Eye Scepter",5,6400,70,134],
    ["Damask Cape",5,6580,100,132],
    ["Elemental Leather",5,6720,90,135],
    ["Ice Blades",5,6800,95,119],
    ["Bunny's Scepter",5,12280,90,132],
    ["Mythril Dress",5,1320,95,136],
    ["Cape of Acrimony",5,1360,30,124],
    ["Damask Gauntlets",5,1450,50,137],
    ["Superior Leather",5,1470,95,123],
    ["Silver Curiass",5,1640,90,115],
    ["Pulverizers",5,1734,20,137],
    ["Flash Gauntlets",5,1970,30,137],
    ["Drill Helm",5,2000,30,114],
    ["Soul Stealer Claw",5,2085,50,121],
    ["Barbarian's Helm",5,2150,70,138],
    ["Cape of the Banshee",5,2180,50,124],
    ["Superior Plate Armor",5,2540,95,139],
    ["Radiant Sword",5,2600,70,119],
    ["Superior Mesh",5,2620,80,140],
    ["Featherfolk Garb",5,2620,95,136],

    // --- Writing (Type 6) --- Items use group indices 141-154
    ["Glued Rod",6,1,1,141],
    ["Crude Book",6,12,1,142],
    ["Ragged Book",6,18,1,142],
    ["Esoteric Scroll",6,50,1,142],
    ["Secret Teachings",6,150,1,142],
    ["Illegible Book",6,175,1,141],
    ["Earth Discharge",6,350,30,143],
    ["Fire Discharge",6,350,30,144],
    ["Water Discharge",6,350,30,144],
    ["Wind Discharge",6,350,30,144],
    ["Tome of Insight",6,601,50,145],
    ["Earth Resistance",6,710,30,146],
    ["Decayed Tome",6,1500,40,147],
    ["Deteriorating Tome",6,1500,40,148],
    ["Tattered Tome",6,1500,40,148],
    ["Crumbling Tome",6,1500,60,149],
    ["Dated Tome",6,1500,60,150],
    ["Musty Tome",6,1500,60,151],
    ["Mildewed Tome",6,1500,90,152],
    ["Damaged Tome",6,1500,99,152],
    ["Fading Tome",6,1500,99,152],
    ["Moldy Tome",6,1500,99,153],
    ["Brittle Tome",6,1500,100,145],
    ["Tome of Prowess",6,1670,70,145],
    ["Strange Book",6,5400,65,154],
    ["Fire Resistance",6,710,30,146], // Note: Duplicates Earth Resistance group index
    ["Water Resistance",6,710,30,146], // Note: Duplicates Earth Resistance group index
    ["Wind Resistance",6,710,30,146]  // Note: Duplicates Earth Resistance group index
];

// Inventor Groups (Original: dx)
// Index: Array of inventor indices (referencing inventorData) that can make items associated with this group index
// Total 155 groups (0-154)
const inventorGroups = [
    // === Alchemy (Groups 0-14) ===
	/* 0*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 12, 20, 27, 2],
	/* 1*/ [30, 12],
	/* 2*/ [13, 7, 28, 1, 30, 0, 12, 20, 27],
	/* 3*/ [12, 2],
	/* 4*/ [13, 7, 28, 1, 30, 33, 0, 12, 20, 27],
	/* 5*/ [13, 34, 21, 28, 25, 0, 20, 27, 2],
	/* 6*/ [13, 34, 21, 28, 25, 0, 12, 20, 27],
	/* 7*/ [13, 30, 25, 27, 2],
	/* 8*/ [13, 34, 21, 28, 30, 25, 0, 12, 20, 27],
	/* 9*/ [13, 34, 21, 28, 25, 20, 27, 2],
	/*10*/ [13, 34, 21, 28, 1, 30, 25, 0, 12, 20, 27],
	/*11*/ [13, 30, 27, 2],
	/*12*/ [13, 34, 21, 28, 20, 27, 2],
	/*13*/ [13, 7, 28, 1, 30, 33, 12, 20, 27], // Corrected based on structure vs original source comment ambiguity
	/*14*/ [2],                                // *** CORRECTED for Orichalcum *** Was wrong before

    // === Engineering (Groups 15-33) === (19 groups)
	/*15*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 11, 37, 23, 17],
	/*16*/ [13, 7, 21, 33, 25, 11, 37, 23, 17],
	/*17*/ [13, 7, 21, 28, 1, 30, 33, 25, 0, 11, 37, 23, 17],
	/*18*/ [13, 7, 21, 28, 1, 33, 25, 0, 11, 37, 23, 17],
	/*19*/ [37, 23], // Shielding Device, Beguiling Device
	/*20*/ [13, 7, 21, 33, 11, 37, 23, 17], // Em Bomb Mp
	/*21*/ [13, 7, 33, 25, 37, 23], // Berserker Device, Soul Strengthening Device
	/*22*/ [13, 7, 21, 33, 37, 17], // Ultimate Bomb
	/*23*/ [13, 7, 21, 33, 25, 37, 23, 17], // Em Explosive 2, Em Explosive Mp, Deadly Mind Bomb, ES Hybrid Bomb
	/*24*/ [13, 7, 21, 33, 25, 0, 37, 23, 17], // Mega-Flare Bomb, Es Hybrid Explosive
	/*25*/ [34, 7, 21, 37, 23], // Healing Device Mk1
	/*26*/ [21, 23, 17], // Em Stun Explosive, Em Stun Explosive Mp, Paralyzer, Particle Laser
	/*27*/ [13, 7, 28, 1, 33, 0, 11, 37], // Tricky Bomb, Tricky Duck Bomb
	/*28*/ [13, 7, 33, 11, 37, 23, 17], // Battle Sphere
	/*29*/ [30, 23], // Healing Device Mk2
	/*30*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 11, 37, 17], // Power Blaster, Hawk Wind
	/*31*/ [23, 17], // Healing Device Mk3
	/*32*/ [13, 34, 7, 21, 30, 33, 25, 37, 23, 17], // Pulse Needle
	/*33*/ [13, 7, 21, 30, 33, 25, 37, 23, 17], // Photonic Blaster

    // === Compounding (Groups 34-50) === (17 groups)
	/*34*/ [7, 1, 30, 33, 31], // Potion of Youth (Fake)
	/*35*/ [34, 28, 33, 25, 24, 19], // Bitter Potion, Fruity Potion
	/*36*/ [31], // Bubbling Potion, Thick Potion, Sleeping Gas, Shielding Device, Berserker D, Soul Strength D, Molotov, Umai-bo, Liq Flare, Liq Mind, Durian, Grabbag, Liq Hybrid, Beguiling D
	/*37*/ [13, 30, 14], // Malodorous Potion, Endorphin Boost, Tears of Aphrodite, Pheramone Enhancer, Neural Augmenter, Tears of Ishtar, Roe Tablets
	/*38*/ [34, 7, 28, 1, 33, 25, 24, 19], // Syrupy Potion
	/*39*/ [13, 34, 28, 30, 33, 25, 14, 24, 31, 19], // Antidote, Berry Potion, Aqua Potion
	/*40*/ [13, 30, 14, 31], // Vial of Poison
	/*41*/ [34, 28, 33, 25, 0, 24, 19], // Sweet Potion, Medicine Bottle, Verdurous Potion
	/*42*/ [13, 30, 14, 24], // Tears of Venus
	/*43*/ [13, 7, 21, 1, 30, 14, 31, 19], // Might Tablets
	/*44*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 14, 24, 31, 19], // Miracle Power, Bubbly Potion, Super Potion
	/*45*/ [34, 7, 28, 1, 33, 25, 0, 24, 19], // Faerie Elixir, Heroic Elixir, Resurrection Elixir
	/*46*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 14, 24, 31], // Fizzing Potion
	/*47*/ [31, 19], // Deadly Poison
	/*48*/ [34, 7, 21, 28, 1, 25, 19], // Resurrection Mist
	/*49*/ [7, 21, 28, 1, 33, 24, 31, 19], // Witch Tablets
	/*50*/ [13, 34, 7, 21, 28, 1, 30, 33, 14, 24, 31, 19], // Cinderella Tablets

    // === Cooking (Groups 51-84) === (34 groups)
	/*51*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 10, 22, 32, 36], // Discordant Dessert, Tasteless Stew, Super-Sweet Curry, Cheap Sashami, Tough Steak
	/*52*/ [21, 1, 32], // Vanilla Ice Cream, Deluxe Fruit Bowl, Pasta Salad, Chocolate Banana, Fruit Parfait, Bleu Cheese
	/*53*/ [13, 21, 28, 25, 22], // Tuna Salad, Chopped Steak, Kimchi, Friend Turnips, Gratin, BBQ Pork Ramen
	/*54*/ [25, 32], // Sachertorte, Kid's Meal, Kirschtorte
	/*55*/ [28, 25, 10, 22], // Umeboshi
	/*56*/ [13, 7, 21, 28, 30, 33, 25, 0, 10, 22], // Curry Rice
	/*57*/ [32], // Umai-Bo 1,2,3,12. Corn on Cob, Mont Blanc, Boiled King Crab, Rambutan Juice, Tamarind Juice, Jackfruit Juice
	/*58*/ [13, 28, 22], // Umai-Bo 4,5,6. Decorated Cake, Fresh Spring Rolls, Pear Tart, Umai-Bo 13
	/*59*/ [7, 33, 10], // Umai-Bo 7,8. Gelatinous Potion, Petite Sirloin, Itty-Bitty Steak, Watermelon Bar, Otoro, Legendary Otoro, Ultimate Ramen, Golden Natto, Luscious Oysters
	/*60*/ [34, 36], // Umai-Bo 10,11,14,9. Haute Chinese Soup, Marbled Beef Sirloin, Peach Dessert Soup, Fachuchon, Ozoni of Madness, Amazing T, Demonic Durian, Devilish Sea Squirt, Dragon PS, Shining Pasta, Slimy G, Super-Spicy S, Tearful Risotto, Marbled Sirloin 1000, Magical Salad, Well-Aged Cheese, Spicy Stew, Lilien's Ultimate, Luscious Gratin
	/*61*/ [13, 34, 7, 21, 28, 1, 25, 0], // Cheap Cider
	/*62*/ [13, 28, 0, 22], // Natto
	/*63*/ [13, 21, 28, 25, 0, 22], // Cold Soba
	/*64*/ [34], // Roast Duck
	/*65*/ [13, 28, 25, 22], // Almond Jelly
	/*66*/ [7, 30, 33, 0, 10], // Grilled Tuna Head, Soft-Shelled Turtle, Blue Moon Cider
	/*67*/ [0], // Awful Cider
	/*68*/ [21, 32], // Sirloin 140
	/*69*/ [13, 34, 28, 30, 33, 10, 22, 36], // Golden Curry
	/*70*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 10, 22, 32], // Spicy Cake
	/*71*/ [7, 33, 0, 10], // Prehistoric Meat, Jumbo Pot Stickers, Lord's Ozoni
	/*72*/ [7, 21, 1, 30, 33, 0, 10, 32], // Mammoth Meat
	/*73*/ [10], // Joyful Bandit Cider
	/*74*/ [32, 36], // Granadilla Juice, Pomegranate Juice, Lansium Juice, Mangosteen Juice
	/*75*/ [7, 30, 33, 10], // Silver Scepter Cider
	/*76*/ [7, 30, 33, 0, 10, 36], // Fiery Cyclops Cider
	/*77*/ [36], // Hogplum Juice, Leaping Titan Cider, Sapodilla Juice
	/*78*/ [7, 28, 33, 32, 36], // Winking Sage Cider
	/*79*/ [10, 22], // Broken Prophet Cider, Brass Demon Cider, Howling Fox Cider
	/*80*/ [10, 22, 36], // Hungry Harpy Cider, Growling Fist Cider
	/*81*/ [30, 32], // Beautiful Ice Cream, Perfect Duck, Giant King Crab
	/*82*/ [7, 25, 10], // Handmade Soba
	/*83*/ [30, 25, 32], // Lilien's Ultimate group seems wrong based on name (maybe Louise?) - Check source if possible
	/*84*/ [7, 33, 25, 10], // Supreme Dorayaki Pie

    // === Crafting (Groups 85-105) === (21 groups)
	/*85*/ [1, 30, 33, 25, 0], // Vulgar Hair Ornament, Unbelievable Hair Ornament, Embarrassing Earring
	/*86*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 35, 4, 3], // Disgusting Doll, Over-Carved Figure, Strange Figure
	/*87*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 35, 4, 3, 6], // Crude Ring, Heavy Ring, Tacky Earring, Loose Ring, Humiliating Earring
	/*88*/ [13, 34, 7, 21, 28, 35, 4, 3, 6], // Pitiful Earring, Third-Rate Bracelet
	/*89*/ [13, 34, 7, 21, 28, 35, 4, 3], // Laughable Bracelet
	/*90*/ [13, 7, 28, 33, 0, 35], // Purple Orb, Adorable Kitty Doll
	/*91*/ [13, 28, 1, 25, 35], // Brooch of Footwork, Emerald Ring, Eldritch Brooch
	/*92*/ [6], // Mystic Orb, Earring of Accuracy, Ring of Mental Power, Badge of Reflection, Blazing Pendant, Berserker's Pendant, Demonbane Cross, Ring of Animosity, Elven Slippers, Mallet Charm, Aegis Pendant, Faerie Earring, Emerald Earring, Boots of Prowess, Star Necklace
	/*93*/ [3], // Ring of Lunacy, Ring of Might, Ring of Quietude
	/*94*/ [13, 7, 28, 33, 35], // Feline Guardian
	/*95*/ [34, 21, 4, 3], // Bangle of Accuracy, Blue Talisman, Red Talisman, Bangle of Intellect, Amulet of Freedom
	/*96*/ [13, 34, 21, 28, 1, 30, 25, 35, 4, 3, 6], // Yellow Talisman
	/*97*/ [13, 28, 1, 25, 35, 6], // Ankh of Dismissal
	/*98*/ [34, 21, 4], // Badge of Resistance, Badge of Shielding, Ring of Healing, Battle Bonus Ring, Faerie Ring, Ring of Erudition, Aqua Ring, Earth Ring, Flare Ring, Wind Ring, Ring of Haste
	/*99*/ [34, 21, 30, 4, 3], // Lunar Talisman, Star Talisman, Anti-Stone Amulet
	/*100*/ [13, 7, 28, 1, 33, 25, 0, 35], // Green Talisman
	/*101*/ [13, 34, 7, 21, 28, 1, 33, 25, 0, 35, 4, 3], // Anti-Poison Amulet
	/*102*/ [3, 6], // Bladebane Cross, Magebane Ankh, Silver Cross, Wingbane Cross, Thieves' Boots
	/*103*/ [13, 7, 28, 30, 35, 4, 3, 6], // Anti-Incapacitation Amulet
	/*104*/ [34, 30, 3], // Anti-Silence Amulet, Anti-Freezing Amulet
	/*105*/ [13, 34, 21, 28, 1, 30, 25, 35, 4, 3], // Hammer Charm

    // === Smithery (Groups 106-140) === (35 groups)
	/*106*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 15, 18, 16], // Crude Rod, Rickety Gauntlet, Notched Sword, Botched Sword, Rusty Axe, Replica Gun
	/*107*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 15, 18, 16, 5], // Bent Sword, Crude Armor, Thin Armor, Tattered Armor
	/*108*/ [34, 30, 15], // Cloak
	/*109*/ [21, 28, 1, 25, 0, 15], // Leather Armor
	/*110*/ [34, 16], // Cordon Scepter, Cattail Staff, Cupid's Staff
	/*111*/ [13, 7, 33, 15], // Cuirass
	/*112*/ [28, 15], // Raunzel Daggers, Assassin's Sickles
	/*113*/ [13, 15, 18], // Sword of the Blessed, Searing Sword, Rune Blade
	/*114*/ [33, 15, 18], // Ranger's Helm, Shark Helm, Drill Helm
	/*115*/ [13, 7, 33, 5], // Mythril Plate, Silver Curiass
	/*116*/ [34, 30, 18], // Silk Robe, Elven Cloak
	/*117*/ [1, 0, 16, 5], // The Samurai, Devious Armor, Hakuen
	/*118*/ [21, 28, 1, 25, 0, 18], // Chainmail, Cuir Bouilli
	/*119*/ [16, 5], // Atomic Gauntlets, Paladin's Helm, Veinslay, Mythril Gauntlets, Silvance, Demonic Claw, Dragon Blades, Visored Helm, Claw of Judgement, Ice Blades, Radiant Sword
	/*120*/ [13, 7, 33, 18], // Plate Armor, Steel Armor
	/*121*/ [1, 18], // Prajna Claw, False Gods' Claw, Soul Stealer Claw
	/*122*/ [34, 30, 5], // Crystal Robe, Cloak of the Stars
	/*123*/ [21, 28, 1, 25, 0, 5], // Mythril Mesh, Superior Leather
	/*124*/ [30, 16], // Iron Cape, Cape of Acrimony, Cape of the Banshee
	/*125*/ [1, 16, 5], // Death's Talons
	/*126*/ [0, 16, 5], // Demon Slayer
	/*127*/ [28, 15, 18], // Flare Baselards
	/*128*/ [28, 16, 5], // Arc Wind Rippers
	/*129*/ [30, 5], // Cape of the Kraken
	/*130*/ [7, 25, 16, 5], // Gatling Gauntlets
	/*131*/ [13, 7, 33, 25, 16], // Astral Armor
	/*132*/ [5], // Golden Cape, Rod of the Evil Eye, Damask Cape, Bunny's Scepter
	/*133*/ [0], // The Immortal
	/*134*/ [34, 5], // Glass Eye Scepter
	/*135*/ [21, 28, 1, 25, 0, 16], // Elemental Leather
	/*136*/ [34, 30, 16], // Mythril Dress, Featherfolk Garb
	/*137*/ [7, 25, 15, 18], // Damask Gauntlets, Pulverizers, Flash Gauntlets
	/*138*/ [33, 16, 5], // Barbarian's Helm
	/*139*/ [33, 16], // Superior Plate Armor
	/*140*/ [13, 21, 28, 1, 25, 0, 16], // Superior Mesh

    // === Writing (Groups 141-154) === (14 groups)
	/*141*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 8, 26, 9], // Glued Rod, Illegible Book
	/*142*/ [13, 34, 7, 21, 28, 1, 30, 33, 25, 0, 8, 26, 9, 29], // Crude Book, Ragged Book, Esoteric Scroll, Secret Teachings
	/*143*/ [13, 34, 7, 21, 28, 1, 30, 33, 0, 8, 26, 9, 29], // Earth Discharge
	/*144*/ [13, 34, 7, 21, 28, 1, 33, 0, 8, 26, 9, 29], // Fire Discharge, Water Discharge, Wind Discharge
	/*145*/ [34, 21, 25, 29], // Tome of Insight, Brittle Tome, Tome of Prowess
	/*146*/ [13, 34, 7, 28, 1, 30, 33, 8, 26, 9], // Earth Resistance, Fire Resistance, Water Resistance, Wind Resistance
	/*147*/ [13, 34, 7, 21, 28, 1, 33, 25, 0, 8, 26, 9, 29], // Decayed Tome
	/*148*/ [13, 7, 28, 1, 33, 8, 26], // Deteriorating Tome, Tattered Tome
	/*149*/ [13, 28, 0, 26, 9], // Crumbling Tome
	/*150*/ [13, 34, 7, 21, 28, 1, 33, 25, 8, 26, 9, 29], // Dated Tome
	/*151*/ [7, 1, 33, 8, 9], // Musty Tome
	/*152*/ [29], // Mildewed Tome, Damaged Tome, Fading Tome
	/*153*/ [34, 21, 25, 0, 29], // Moldy Tome
	/*154*/ [8, 9] // Strange Book
];

// Make data accessible globally (or could be imported if using modules)
window.so3data = {
    craftingCategories,
    inventorData,
    inventionData,
    inventorGroups,
    MAX_ITEMS // MAX_ITEMS is not actually used in the script, but kept for reference
};