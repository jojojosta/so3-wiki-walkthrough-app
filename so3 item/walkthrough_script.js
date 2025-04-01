document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.walkthrough-checkbox, .checklist input[type="checkbox"]');
    const tocLinks = document.querySelectorAll('#toc-nav a');

    // --- Restore Checkbox States on Load ---
    function restoreCheckboxStates() {
        checkboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState === 'true') {
                checkbox.checked = true;
                applyCompletedStyle(checkbox, true); // Apply style without transition
            } else {
                checkbox.checked = false;
                applyCompletedStyle(checkbox, false); // Apply style without transition
            }
             // Add event listener after setting initial state
             checkbox.addEventListener('change', handleCheckboxChange);
        });
        console.log(`Restored states for ${checkboxes.length} checkboxes.`);
    }

    // --- Handle Checkbox Change ---
    function handleCheckboxChange(event) {
        const checkbox = event.target;
        localStorage.setItem(checkbox.id, checkbox.checked);
        applyCompletedStyle(checkbox, checkbox.checked);
    }

    // --- Apply Visual Style for Completion ---
    function applyCompletedStyle(checkbox, isChecked) {
        // Find the closest parent '.walkthrough-step' or the parent 'li' for checklist items
        const parentStep = checkbox.closest('.walkthrough-step');
        const parentLi = checkbox.closest('li'); // For checklist items

        if (parentStep && checkbox.classList.contains('walkthrough-checkbox')) { // Main section checkbox
            const contentDiv = parentStep.querySelector('.step-content');
            if (contentDiv) {
                 if (isChecked) {
                     parentStep.classList.add('completed');
                 } else {
                     parentStep.classList.remove('completed');
                 }
            }
        } else if (parentLi && parentLi.querySelector('input[type="checkbox"]') === checkbox) { // Checklist item
             if (isChecked) {
                 parentLi.classList.add('completed'); // Style the list item itself
             } else {
                 parentLi.classList.remove('completed');
             }
        }
    }

    // --- Smooth Scrolling for Navigation ---
    function handleNavClick(event) {
        event.preventDefault(); // Stop default anchor jump
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn(`Navigation target not found: ${targetId}`);
        }
    }

    // --- Initial Setup ---
    restoreCheckboxStates(); // Load saved states

    // Add navigation listeners
    tocLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

});


       
     // --- PA Data Structure ---
     const startingScoresOthers = { sophia: 26, cliff: 19, maria: 22, nel: 19, roger: 21, albel: 17, peppita: 20, mirage: 20, adray: 22 };
     const startingScoresFayt = { sophia: 24, cliff: 19, maria: 21, nel: 17, roger: 19, albel: 16, peppita: 20, mirage: 23, adray: 21 };
     const trackedCharacters = ["sophia", "cliff", "maria", "nel", "roger", "albel", "peppita", "mirage", "adray"];
     const parsePoints = (value) => value === undefined || value === null || String(value).toLowerCase() === 'no change' ? 0 : parseInt(value, 10) || 0;
 
     // --- PA DATA ARRAY GOES HERE (Use the large array from previous responses) ---
     const paData = [ // PA1
        { paId: "PA1", location: "Grantier Resort Hotel, Room 105", availability: "Before playing in the Battle Simulator", requirements: "Must not have spoken to Fayt's parents yet", action: "Check the garbage can in the room.", choices: [ { text: "Checked garbage can", effects: { other_sophia: -3, other_cliff: -1, other_maria: -3, other_nel: -3, other_roger: 1, other_albel: -1, other_peppita: -1, other_mirage: -3, other_adray: 1, fayt_sophia: -1 } } ] },
        // PA2
        { paId: "PA2", location: "Grantier Resort Hotel, Private Beach", availability: "Before playing in the Battle Simulator", requirements: "Must not have spoken to Fayt's parents yet", action: "Talk to Sophia", choices: [ { text: "Talked to Sophia", effects: { other_sophia: 5, other_cliff: -3, other_maria: 5, other_nel: -3, other_roger: 0, other_albel: 5, other_peppita: -3, other_mirage: 0, other_adray: 2, fayt_sophia: -5 } } ] },
        // PA3
        { paId: "PA3", location: "Grantier Resort Hotel, Private Beach", availability: "Before playing in the Battle Simulator", requirements: "None", action: "Talk to the young woman (not fox-person)", choices: [ { text: "Choice 1: Uh, yeah. Something like that.", effects: { other_sophia: -5, other_cliff: 2, other_maria: -5, other_nel: -1, other_roger: 3, other_albel: 3, other_peppita: 0, other_mirage: -1, other_adray: 2, fayt_sophia: -5 } }, { text: "Choice 2: Huh? Oh, just some little kid. Never seen her.", effects: { other_sophia: -8, other_cliff: -3, other_maria: -5, other_nel: -3, other_roger: -3, other_albel: 0, other_peppita: -3, other_mirage: -3, other_adray: -1, fayt_sophia: -5 } }, { text: "Choice 3: My girlfriend! She's pretty cute, huh?", effects: { other_sophia: 6, other_cliff: -3, other_maria: 0, other_nel: 2, other_roger: -2, other_albel: -3, other_peppita: 1, other_mirage: 1, other_adray: -2, fayt_sophia: 8 } } ] },
        // PA4
        { paId: "PA4", location: "Grantier Resort Hotel, Transporter to Private Beach", availability: "Before playing in the Battle Simulator", requirements: "Must have seen PA3 and have chosen option 1 or option 2.", action: "Automatic", choices: [ { text: "Automatic Event", effects: { other_sophia: 0, other_cliff: -3, other_maria: -3, other_nel: -3, other_roger: 3, other_albel: -5, other_peppita: 1, other_mirage: -3, other_adray: -2, fayt_sophia: 3 } } ] },
        // PA5
        { paId: "PA5", location: "Grantier Resort Hotel, Rossetti Troupe's waiting room", availability: "Before playing in the Battle Simulator", requirements: "None", action: "Enter the room in the Northeast corner of the hotel lobby", choices: [ { text: "Choice 1: No, I believe you.", effects: { other_sophia: 2, other_cliff: 1, other_maria: 1, other_nel: 1, other_roger: 1, other_albel: -1, other_peppita: 3, other_mirage: 1, other_adray: 2, fayt_sophia: 1, fayt_peppita: 3 } }, { text: "Choice 2: You're exaggerating a bit, aren't you?", effects: { other_sophia: -2, other_cliff: 2, other_maria: 0, other_nel: 1, other_roger: -2, other_albel: 3, other_peppita: -5, other_mirage: -1, other_adray: -1, fayt_sophia: 0, fayt_peppita: -3 } } ] },
        // PA6
        { paId: "PA6", location: "Grantier Resort Hotel, Rossetti Troupe's waiting room", availability: "Before playing in the Battle Simulator, after PA5", requirements: "See PA5", action: "Approach the barricaded door in the south end of the room", choices: [ { text: "Approached Door", effects: { other_sophia: -3, other_cliff: 0, other_maria: 0, other_nel: 0, other_roger: 3, other_albel: 0, other_peppita: -3, other_mirage: 0, other_adray: 2, fayt_peppita: 0 } } ] },
        // PA7
        { paId: "PA7", location: "Grantier Resort Hotel, Lounge", availability: "Storyline", requirements: "None", action: "Access one of the Game Room panels in the lounge", choices: [ { text: "Choice 1: Don't worry, I'll protect you.", effects: { other_sophia: 3, other_cliff: 0, other_maria: 1, other_nel: 0, other_roger: 2, other_albel: 0, other_peppita: 1, other_mirage: 1, other_adray: 4, fayt_sophia: 1 } }, { text: "Choice 2: I see. You don't like hanging out with me.", effects: { other_sophia: -3, other_cliff: -2, other_maria: -2, other_nel: -2, other_roger: -2, other_albel: -3, other_peppita: -1, other_mirage: -2, other_adray: -2, fayt_sophia: 3 } } ] },
        // PA8
        { paId: "PA8", location: "Grantier Resort Hotel, Game Room", availability: "Storyline", requirements: "PA7", action: "N/A", choices: [ { text: "Choose other options first", effects: { other_sophia: 1, other_cliff: 0, other_maria: 1, other_nel: 1, other_roger: 0, other_albel: 0, other_peppita: 0, other_mirage: 1, other_adray: -1, fayt_sophia: 1 } }, { text: "Choose 'Start Game' first", effects: { other_sophia: 1, other_cliff: 1, other_maria: 0, other_nel: 0, other_roger: 1, other_albel: 1, other_peppita: 1, other_mirage: 0, other_adray: 1, fayt_sophia: 2 } } ] },
        // PA9
        { paId: "PA9", location: "Grantier Resort Hotel, Game Room", availability: "Storyline", requirements: "Must have won the first round of battle", action: "N/A", choices: [ { text: "Choice 1: Let's try again.", effects: { other_sophia: -3, other_cliff: 2, other_maria: -1, other_nel: -3, other_roger: 3, other_albel: 2, other_peppita: -2, other_mirage: 3, other_adray: 2, fayt_sophia: -2 } }, { text: "Choice 2: Let's just give up.", effects: { other_sophia: 0, other_cliff: -1, other_maria: 1, other_nel: 0, other_roger: -3, other_albel: -4, other_peppita: 2, other_mirage: 1, other_adray: -2, fayt_sophia: -2 } } ] },
        // PA10
        { paId: "PA10", location: "Grantier Resort Hotel, Game Room", availability: "Storyline", requirements: "Must have won second round of battle", action: "N/A", choices: [ { text: "Choice 1: This is good exercise for her.", effects: { other_sophia: -3, other_cliff: -3, other_maria: -2, other_nel: -4, other_roger: -2, other_albel: 4, other_peppita: -4, other_mirage: -3, other_adray: 4, fayt_sophia: -2 } }, { text: "Choice 2: I guess that's about it for today.", effects: { other_sophia: 2, other_cliff: 1, other_maria: 2, other_nel: 2, other_roger: 1, other_albel: 0, other_peppita: 2, other_mirage: 3, other_adray: -1, fayt_sophia: 0 } } ] },
        // PA11
        { paId: "PA11", location: "Grantier Resort Hotel, Game Room", availability: "Storyline", requirements: "Lose or escape a battle", action: "N/A", choices: [ { text: "Escape Battle", effects: { other_sophia: -1, other_cliff: 0, other_maria: -2, other_nel: -3, other_roger: 0, other_albel: -4, other_peppita: 2, other_mirage: 0, other_adray: -4, fayt_sophia: 0 } }, { text: "Lose Battle", effects: { other_sophia: 2, other_cliff: -1, other_maria: 0, other_nel: -3, other_roger: -2, other_albel: -4, other_peppita: 0, other_mirage: 2, other_adray: -2, fayt_sophia: 1 } } ] },
        // PA12
        { paId: "PA12", location: "Grantier Resort Hotel, Rossetti Troupe's waiting room", availability: "After Battle Simulator", requirements: "None", action: "Go to the Rossettis' room and speak to Peppita", choices: [ { text: "Spoke to Peppita", effects: { other_sophia: 3, other_cliff: 0, other_maria: -3, other_nel: 3, other_roger: 0, other_albel: -3, other_peppita: 5, other_mirage: 0, other_adray: 3, fayt_sophia: 3, fayt_peppita: 3 } } ] },
        // PA13
        { paId: "PA13", location: "Evacuation Facility", availability: "After speaking to Rossettis (Room 509), before putting Sophia to bed", requirements: "None", action: "Talk to Peppita and Ursus in east stairwell", choices: [ { text: "Choice 1: No, that's not true.", effects: { other_sophia: 3, other_cliff: 3, other_maria: 3, other_nel: 3, other_roger: 3, other_albel: 1, other_peppita: 5, other_mirage: 3, other_adray: 3 } }, { text: "Choice 2: Why couldn't you just mind your own business?!", effects: { other_sophia: -5, other_cliff: -5, other_maria: -5, other_nel: -5, other_roger: -5, other_albel: -5, other_peppita: 0, other_mirage: -5, other_adray: -5, fayt_sophia: -3, fayt_peppita: -5 } } ] },
        // PA14
        { paId: "PA14", location: "Transport Ship Helre, Bridge", availability: "After Vendeeni attack, before entering Escape Pod", requirements: "N/A", action: "Talk to crew about bloodtype.", choices: [ { text: "Choice 1: Type A", effects: { other_sophia: 0, other_cliff: -1, other_maria: 1, other_nel: 1, other_roger: 0, other_albel: 0, other_peppita: 0, other_mirage: -1, other_adray: -1 } }, { text: "Choice 2: Type B", effects: { other_sophia: -1, other_cliff: 0, other_maria: 0, other_nel: -1, other_roger: 1, other_albel: 0, other_peppita: 0, other_mirage: 1, other_adray: 1 } }, { text: "Choice 3: Type O", effects: { other_sophia: 1, other_cliff: 0, other_maria: -1, other_nel: 0, other_roger: 0, other_albel: 1, other_peppita: -1, other_mirage: 0, other_adray: 0 } }, { text: "Choice 4: Type AB", effects: { other_sophia: 0, other_cliff: 1, other_maria: 0, other_nel: 0, other_roger: -1, other_albel: -1, other_peppita: 1, other_mirage: 0, other_adray: 0 } } ] },
        // PA15
        { paId: "PA15", location: "Transport Ship Helre, Central Starboard Corridor", availability: "After Vendeeni attack, before entering Escape Pod", requirements: "Door to Escape Pods unblocked", action: "Talk to attendants (Upper), then Rossettis (Lower)", choices: [ { text: "Completed Task", effects: { other_sophia: 2, other_cliff: 3, other_maria: 1, other_nel: 1, other_roger: 3, other_albel: -2, other_peppita: 5, other_mirage: 1, other_adray: 3, fayt_sophia: 3, fayt_peppita: 2 } } ] },
        // PA16
        { paId: "PA16", location: "Escape Pod", availability: "Storyline", requirements: "None", action: "N/A", choices: [ { text: "Choice 1: Let's check it out...", effects: { other_sophia: 2, other_cliff: 1, other_maria: 1, other_nel: 1, other_roger: -2, other_albel: -2, other_peppita: 1, other_mirage: 1, other_adray: -1 } }, { text: "Choice 2: I'm sure it's okay.", effects: { other_sophia: -2, other_cliff: 0, other_maria: 1, other_nel: 0, other_roger: 2, other_albel: 2, other_peppita: -1, other_mirage: 2, other_adray: 1 } } ] },
        // PA17
        { paId: "PA17", location: "Royal City of Airyglyph, Aqueduct entrance", availability: "Before leaving Kirlsa for Granah Hills", requirements: "None", action: "Talk to Cliff near Aqueducts entrance", choices: [ { text: "Choice 1: I'm worried about Mirage.", effects: { other_sophia: 1, other_cliff: 1, other_maria: 2, other_nel: 1, other_roger: 1, other_albel: -1, other_peppita: 1, other_mirage: 1, other_adray: 2, fayt_cliff: -2 } }, { text: "Choice 2: I never dreamed...", effects: { other_sophia: -1, other_cliff: -2, other_maria: -3, other_nel: -1, other_roger: -1, other_albel: -3, other_peppita: 0, other_mirage: -2, other_adray: -2, fayt_cliff: 2 } } ] },
        // PA18
        { paId: "PA18", location: "Mining Town of Kirlsa, 'Iron Maiden' Inn", availability: "After saving Nel/Tynave/Farleen, before Arias", requirements: "Must not have returned to Arias yet", action: "Talk to Nel upstairs.", choices: [ { text: "Choice 1: I just felt like it.", effects: { other_sophia: 1, other_cliff: 3, other_maria: -1, other_nel: -3, other_roger: 1, other_albel: -2, other_peppita: 1, other_mirage: 1, other_adray: 5, fayt_cliff: 1, fayt_nel: -2 } }, { text: "Choice 2: I thought I should make it up...", effects: { other_sophia: -1, other_cliff: 2, other_maria: -2, other_nel: -1, other_roger: 0, other_albel: 3, other_peppita: -1, other_mirage: 0, other_adray: 2, fayt_cliff: 0, fayt_nel: -2 } }, { text: "Choice 3: You can't expect us to abandon...", effects: { other_sophia: 3, other_cliff: 3, other_maria: 1, other_nel: 3, other_roger: 2, other_albel: 0, other_peppita: 3, other_mirage: 2, other_adray: 2, fayt_cliff: 3, fayt_nel: 2 } } ] },
        // PA19
        { paId: "PA19", location: "Peterny, 'The Biting Kid' Tavern", availability: "After arriving in Peterny, before resting", requirements: "Must be done before resting", action: "Talk to one of the guys at tables.", choices: [ { text: "Choice 1: Yeah, I've heard of them.", effects: { other_sophia: -2, other_cliff: 2, other_maria: 1, other_nel: -2, other_roger: 4, other_albel: 3, other_peppita: -3, other_mirage: -1, other_adray: -2 } }, { text: "Choice 2: No, I've never heard of them.", effects: { other_sophia: 2, other_cliff: 1, other_maria: 0, other_nel: -2, other_roger: 0, other_albel: 0, other_peppita: 2, other_mirage: 1, other_adray: 2 } } ] },
        // PA20
        { paId: "PA20", location: "Duggus Forest, Grapebind area", availability: "During search for Ameena", requirements: "None", action: "Give Fairy water from 'boiling' spring", choices: [ { text: "Gave boiling water", effects: { other_sophia: -3, other_cliff: -2, other_maria: -2, other_nel: -2, other_roger: -2, other_albel: -1, other_peppita: -3, other_mirage: -1, other_adray: -1 } } ] },
        // PA21
        { paId: "PA21", location: "Duggus Forest, Moonshadow Clan's hideout", availability: "During search for Ameena", requirements: "None", action: "Find cabin, watch scene.", choices: [ { text: "Choice 1: Ask Roger to help.", effects: { other_sophia: 2, other_cliff: -2, other_maria: -1, other_nel: 2, other_roger: 3, other_albel: -3, other_peppita: 2, other_mirage: -2, other_adray: 2, fayt_cliff: -2, fayt_nel: 1, fayt_roger: 2 } }, { text: "Choice 2: Turn down his offer.", effects: { other_sophia: -1, other_cliff: 3, other_maria: 2, other_nel: -1, other_roger: -3, other_albel: 3, other_peppita: -2, other_mirage: 2, other_adray: -2, fayt_cliff: -2, fayt_nel: -1, fayt_roger: -2 } } ] },
        // PA22
        { paId: "PA22", location: "Peterny, West Side, Luxury Inn", availability: "After rescuing Ameena, before war", requirements: "None", action: "Speak to Ruddle/Rumina (2nd guest room).", choices: [ { text: "Choice 1: North gate.", effects: { other_sophia: -2, other_cliff: -2, other_maria: -2, other_nel: -2, other_roger: -2, other_albel: -1, other_peppita: -2, other_mirage: -2, other_adray: -2 } }, { text: "Choice 2: Go east.", effects: { other_sophia: -2, other_cliff: -2, other_maria: -2, other_nel: -2, other_roger: -2, other_albel: -1, other_peppita: -2, other_mirage: -2, other_adray: -2 } }, { text: "Choice 3: South gate.", effects: { other_sophia: 2, other_cliff: 2, other_maria: 2, other_nel: 2, other_roger: 2, other_albel: 1, other_peppita: 2, other_mirage: 2, other_adray: 2 } }, { text: "Choice 4: West gate.", effects: { other_sophia: -2, other_cliff: -2, other_maria: -2, other_nel: -2, other_roger: -2, other_albel: -1, other_peppita: -2, other_mirage: -2, other_adray: -2 } } ] },
        // PA23
        { paId: "PA23", location: "Arias, 'The Dozing' Inn", availability: "After saving Ameena, before war", requirements: "PA22 Choice 3", action: "Speak to Ruddle/Rumina.", choices: [ { text: "Choice 1: Northwest gate.", effects: { other_sophia: 2, other_cliff: 2, other_maria: 2, other_nel: 3, other_roger: 2, other_albel: 2, other_peppita: 2, other_mirage: 2, other_adray: 1 } }, { text: "Choice 2: Southwest gate.", effects: { other_sophia: 2, other_cliff: 2, other_maria: 2, other_nel: 0, other_roger: 2, other_albel: 0, other_peppita: 2, other_mirage: 2, other_adray: 3 } }, { text: "Choice 3: Go east.", effects: { other_sophia: -2, other_cliff: -2, other_maria: -2, other_nel: -2, other_roger: -2, other_albel: -1, other_peppita: -2, other_mirage: -2, other_adray: -3 } } ] },
        // PA24
        { paId: "PA24", location: "Airyglyph, 'Wyvern's Tail' Inn", availability: "After saving Ameena, before war", requirements: "PA23 Choice 1 or 2", action: "Speak to Ruddle/Rumina.", choices: [ { text: "Choice 1: Already passed Kirlsa.", effects: { other_sophia: 2, other_cliff: 2, other_maria: 2, other_nel: 2, other_roger: 2, other_albel: 1, other_peppita: 2, other_mirage: 2, other_adray: 2 } }, { text: "Choice 2: Almost at Kirlsa.", effects: { other_sophia: -2, other_cliff: -2, other_maria: -2, other_nel: -2, other_roger: -2, other_albel: -1, other_peppita: -2, other_mirage: -2, other_adray: -2 } } ] },
        // PA25
        { paId: "PA25", location: "Surferio", availability: "After saving Ameena, before Crosell", requirements: "PA21 Choice 1", action: "Speak to Roger and friends.", choices: [ { text: "Choice 1: Cooperate.", effects: { other_sophia: 2, other_cliff: -2, other_maria: -1, other_nel: 0, other_roger: 5, other_albel: -2, other_peppita: 1, other_mirage: 2, other_adray: 4, fayt_cliff: -1, fayt_roger: 0 } }, { text: "Choice 2: Refuse.", effects: { other_sophia: -1, other_cliff: 2, other_maria: 2, other_nel: -1, other_roger: -5, other_albel: 2, other_peppita: 2, other_mirage: -2, other_adray: -2, fayt_cliff: 0, fayt_roger: -2 } } ] },
        // PA26
        { paId: "PA26", location: "Aquios, East Side Private Home", availability: "Before first Queen meeting", requirements: "None", action: "Speak to man (2 doors from grocer).", choices: [ { text: "Spoke to man", effects: { other_sophia: 0, other_cliff: 0, other_maria: 0, other_nel: -2, other_roger: 0, other_albel: -1, other_peppita: 0, other_mirage: 0, other_adray: 0, fayt_cliff: 0, fayt_nel: 2 } } ] },
        // PA27
        { paId: "PA27", location: "Aquios, Castle 1F", availability: "Before first Queen meeting", requirements: "None", action: "Explore, talk to Nel at stairs.", choices: [ { text: "Explored (Stairs)", effects: { other_sophia: -2, other_cliff: -2, other_maria: -3, other_nel: -3, other_roger: -1, other_albel: -3, other_peppita: -1, other_mirage: -3, other_adray: -1 } } ] },
        // PA28
        { paId: "PA28", location: "Aquios, Castle 2F", availability: "Before first Queen meeting", requirements: "None", action: "Explore, talk to Nel at chamber.", choices: [ { text: "Explored (Chamber)", effects: { other_sophia: -2, other_cliff: -2, other_maria: -3, other_nel: -3, other_roger: -1, other_albel: -3, other_peppita: -1, other_mirage: -3, other_adray: -1 } } ] },
        // PA29
        { paId: "PA29", location: "Peterny, North Side", availability: "After Queen audience, before Copper Ore", requirements: "None", action: "Talk to Cliff.", choices: [ { text: "Talked to Cliff", effects: { other_sophia: -3, other_cliff: -3, other_maria: -2, other_nel: -3, other_roger: -2, other_albel: -2, other_peppita: -2, other_mirage: -4, other_adray: -2, fayt_cliff: 2 } } ] },
        // PA30
        { paId: "PA30", location: "Arias, South Gate", availability: "After Clair, before Copper Ore", requirements: "None", action: "Speak to Fervent Man.", choices: [ { text: "Choice 1: I'll do what I can.", effects: { other_sophia: -3, other_cliff: 2, other_maria: -5, other_nel: 5, other_roger: -1, other_albel: -2, other_peppita: -5, other_mirage: 3, other_adray: -4 } }, { text: "Choice 2: Leave it to me.", effects: { other_sophia: -5, other_cliff: -2, other_maria: -7, other_nel: 4, other_roger: 3, other_albel: 5, other_peppita: -7, other_mirage: -4, other_adray: 4 } }, { text: "Choice 3: Situation is grave?", effects: { other_sophia: 0, other_cliff: 0, other_maria: 0, other_nel: 3, other_roger: 0, other_albel: -4, other_peppita: 0, other_mirage: 0, other_adray: -2 } } ] },
        // PA31
        { paId: "PA31", location: "Arias, South Gate", availability: "After Clair, before Copper Ore", requirements: "PA30 Choice 3", action: "Speak to Fervent Man again.", choices: [ { text: "Spoke again (after Choice 3)", effects: { fayt_nel: 3 } } ] },
        // PA32
        { paId: "PA32", location: "Arias, Mansion Conference Room", availability: "After battle near mines, before Copper Ore", requirements: "None", action: "Speak to Clair.", choices: [ { text: "Choice 1: More than useful.", effects: { other_sophia: 1, other_cliff: 2, other_maria: 0, other_nel: 2, other_roger: 1, other_albel: -3, other_peppita: 1, other_mirage: 1, other_adray: -1, fayt_nel: 4 } }, { text: "Choice 2: Disappointed.", effects: { other_sophia: -4, other_cliff: -3, other_maria: -1, other_nel: -6, other_roger: -2, other_albel: 0, other_peppita: -3, other_mirage: -1, other_adray: 3, fayt_nel: -5 } } ] },
        // PA33
        { paId: "PA33", location: "Arias, Mansion Bedroom", availability: "After Albel battle, before Aquios", requirements: "None", action: "Attempt to speak to Farleen.", choices: [ { text: "Choice 1: Leave her alone.", effects: { other_sophia: 1, other_cliff: 0, other_maria: 0, other_nel: 2, other_roger: 0, other_albel: 0, other_peppita: 1, other_mirage: 1, other_adray: -2 } }, { text: "Choice 2: Poke cheek.", effects: { other_sophia: -2, other_cliff: 0, other_maria: -1, other_nel: 0, other_roger: 1, other_albel: -2, other_peppita: 2, other_mirage: -1, other_adray: -1 } }, { text: "Choice 3: Tickle nose.", effects: { other_sophia: -3, other_cliff: 0, other_maria: -2, other_nel: 0, other_roger: 2, other_albel: -1, other_peppita: 0, other_mirage: -2, other_adray: 3 } } ] },
        // PA34
        { paId: "PA34", location: "Aquios, Castle Audience Chamber", availability: "After Copper Ore, before war", requirements: "None", action: "Return to Queen's Chamber.", choices: [ { text: "Choice 1: Yes (Join Adray).", effects: { other_sophia: 0, other_cliff: 1, other_maria: -1, other_nel: -1, other_roger: 3, other_albel: 2, other_peppita: 2, other_mirage: 1, other_adray: 3, fayt_adray: 2 } }, { text: "Choice 2: No (Don't Join Adray).", effects: { other_sophia: -1, other_cliff: 0, other_maria: 1, other_nel: 2, other_roger: -2, other_albel: -1, other_peppita: -1, other_mirage: 0, other_adray: -1, fayt_adray: -2 } } ] },
        // PA35
        { paId: "PA35", location: "Arias, Mansion Conference Room", availability: "After resting at Mansion, before war", requirements: "None", action: "Speak to Clair (Optional PA).", choices: [ { text: "Choice 1: Yes.", effects: {} }, { text: "Choice 2: No.", effects: { other_sophia: 2, other_cliff: -3, other_maria: 3, other_nel: 4, other_roger: -3, other_albel: -5, other_peppita: -4, other_mirage: 4, other_adray: -5 } } ] },
        // PA36
        { paId: "PA36", location: "Peterny, Center Plaza", availability: "After war, before Sacred Orb", requirements: "None", action: "Speak to man at table.", choices: [ { text: "Choice 1: Yes, want to hear.", effects: { other_sophia: -2, other_cliff: 2, other_maria: -2, other_nel: 3, other_roger: 2, other_albel: -3, other_peppita: 2, other_mirage: -2, other_adray: 3 } }, { text: "Choice 2: I'll pass.", effects: { other_sophia: 2, other_cliff: -1, other_maria: 3, other_nel: -3, other_roger: -3, other_albel: 2, other_peppita: -2, other_mirage: 2, other_adray: -3 } } ] },
        // PA37
        { paId: "PA37", location: "Arias, Cemetery", availability: "After war, before Sacred Orb", requirements: "None", action: "Talk to Maria.", choices: [ { text: "Choice 1: Same strange power?", effects: { other_sophia: -1, other_cliff: -2, other_maria: 4, other_nel: -1, other_roger: -1, other_albel: 0, other_peppita: -2, other_mirage: -1, other_adray: -2, fayt_maria: -1 } }, { text: "Choice 2: No! I'm normal!", effects: { other_sophia: -2, other_cliff: -4, other_maria: -1, other_nel: -4, other_roger: -3, other_albel: -5, other_peppita: -2, other_mirage: -3, other_adray: -4, fayt_maria: -3 } }, { text: "Choice 3: You may be right...", effects: { other_sophia: 3, other_cliff: 4, other_maria: 7, other_nel: 3, other_roger: 3, other_albel: 4, other_peppita: 4, other_mirage: 3, other_adray: 6, fayt_maria: 3 } } ] },
        // PA38
        { paId: "PA38", location: "Kirlsa, Home by Inn", availability: "After war, before Crosell", requirements: "None", action: "Talk to girl.", choices: [ { text: "Choice 1: Yes, it's true.", effects: { other_sophia: -3, other_cliff: -3, other_maria: -3, other_nel: -5, other_roger: -3, other_albel: 0, other_peppita: -3, other_mirage: -3, other_adray: 0 } }, { text: "Choice 2: No, it's not true.", effects: { other_sophia: 3, other_cliff: 3, other_maria: 3, other_nel: 5, other_roger: 3, other_albel: 3, other_peppita: 3, other_mirage: 3, other_adray: 3 } } ] },
        // PA39
        { paId: "PA39", location: "Airyglyph, Aqueduct entrance", availability: "While Queen travels", requirements: "None", action: "Speak to Adray.", choices: [ { text: "Spoke to Adray", effects: { other_sophia: -2, other_cliff: 1, other_maria: -1, other_nel: -4, other_roger: 2, other_albel: 1, other_peppita: -2, other_mirage: -1, other_adray: 3, fayt_adray: 1 } } ] },
        // PA40
        { paId: "PA40", location: "Airyglyph, Castle 1F", availability: "Recruiting Albel", requirements: "None", action: "Don't follow Woltar / Talk twice.", choices: [ { text: "Didn't Follow Woltar", effects: { other_sophia: -2, other_cliff: -2, other_maria: -3, other_nel: -2, other_roger: -1, other_albel: -3, other_peppita: -1, other_mirage: -3, other_adray: 1 } }, { text: "Spoke to Woltar Twice", effects: { other_sophia: -4, other_cliff: -2, other_maria: -2, other_nel: -3, other_roger: -2, other_albel: 2, other_peppita: -4, other_mirage: -3, other_adray: 3 } } ] },
        // PA41
        { paId: "PA41", location: "Airyglyph, Castle Guard Room", availability: "Recruiting Albel", requirements: "None", action: "Go to Treasure Room / 1F.", choices: [ { text: "Didn't Follow (Guard Room)", effects: { other_sophia: -2, other_cliff: -2, other_maria: -3, other_nel: -2, other_roger: -1, other_albel: -3, other_peppita: -1, other_mirage: -3, other_adray: 1 } } ] },
        // PA42
        { paId: "PA42", location: "Kirlsa, Woltar's Mansion 2F", availability: "After recruiting Albel, before Crosell", requirements: "None", action: "Enter Woltar's office.", choices: [ { text: "Entered Office", effects: { other_sophia: 0, other_cliff: 0, other_maria: 0, other_nel: -1, other_roger: 0, other_albel: 0, other_peppita: 0, other_mirage: 0, other_adray: 1, fayt_nel: 3 } } ] },
        // PA43
        { paId: "PA43", location: "Airyglyph, Castle King's Office", availability: "After recruiting Albel, before Crosell", requirements: "None", action: "Enter king's office (2F).", choices: [ { text: "Choice 1: Okay, deliver letter.", effects: { other_sophia: 2, other_cliff: -3, other_maria: -2, other_nel: -3, other_roger: 2, other_albel: 0, other_peppita: 3, other_mirage: -1, other_adray: 3 } }, { text: "Choice 2: Refuse.", effects: { other_sophia: -2, other_cliff: 3, other_maria: 2, other_nel: 3, other_roger: -2, other_albel: 0, other_peppita: -3, other_mirage: 1, other_adray: -3 } } ] },
        // PA44
        { paId: "PA44", location: "Peterny, West Side", availability: "After recruiting Albel, before Crosell", requirements: "None", action: "Speak to Albel.", choices: [ { text: "Choice 1: Lacked compassion.", effects: { other_sophia: 4, other_cliff: 2, other_maria: -2, other_nel: -4, other_roger: -3, other_albel: -5, other_peppita: 6, other_mirage: 2, other_adray: 4, fayt_albel: -2 } }, { text: "Choice 2: Bad luck.", effects: { other_sophia: 3, other_cliff: 4, other_maria: 2, other_nel: 1, other_roger: 0, other_albel: 2, other_peppita: -2, other_mirage: 0, other_adray: -1, fayt_albel: 3 } }, { text: "Choice 3: King too ruthless.", effects: { other_sophia: -7, other_cliff: -5, other_maria: -4, other_nel: -6, other_roger: 2, other_albel: 6, other_peppita: -7, other_mirage: -4, other_adray: -3, fayt_albel: 5 } } ] },
        // PA45
        { paId: "PA45", location: "Peterny, West Side, Luxury Inn", availability: "After recruiting Albel, before Crosell", requirements: "None", action: "Stay at the inn.", choices: [ { text: "Choice 1: I hate you.", effects: { other_sophia: -2, other_cliff: 2, other_maria: 0, other_nel: 2, other_roger: 0, other_albel: -3, other_peppita: -2, other_mirage: 0, other_adray: -2 } }, { text: "Choice 2: Not really.", effects: { other_sophia: 1, other_cliff: -1, other_maria: -1, other_nel: 0, other_roger: 2, other_albel: 5, other_peppita: 2, other_mirage: 0, other_adray: 3 } } ] },
        // PA46
        { paId: "PA46", location: "Aquaelie, Cliff's Room", availability: "After boarding, before bed", requirements: "None", action: "Speak to Cliff.", choices: [ { text: "Spoke to Cliff", effects: { other_sophia: 0, other_cliff: 0, other_maria: 1, other_nel: 0, other_roger: 0, other_albel: 1, other_peppita: -1, other_mirage: 0, other_adray: 0, fayt_cliff: 2 } } ] },
        // PA47
        { paId: "PA47", location: "Aquaelie, Sophia's Room", availability: "After boarding, before bed", requirements: "None", action: "Speak to Sophia.", choices: [ { text: "Choice 1: She must have known...", effects: { other_sophia: 0, other_cliff: 0, other_maria: 1, other_nel: 0, other_roger: 0, other_albel: 1, other_peppita: -1, other_mirage: 0, other_adray: 0, fayt_sophia: 2 } }, { text: "Choice 2: She must not have known...", effects: { other_sophia: 5, other_cliff: 3, other_maria: 4, other_nel: 3, other_roger: 3, other_albel: 4, other_peppita: 4, other_mirage: 3, other_adray: 2, fayt_sophia: 1 } } ] },
        // PA48
        { paId: "PA48", location: "Aquaelie, Sgt. Gilm's Room", availability: "After bed, before Bridge", requirements: "None", action: "Talk to the man.", choices: [ { text: "Choice 1: Yes.", effects: { other_sophia: -1, other_cliff: 3, other_maria: -1, other_nel: 2, other_roger: 3, other_albel: 5, other_peppita: 2, other_mirage: 1, other_adray: 5 } }, { text: "Choice 2: No.", effects: { other_sophia: 2, other_cliff: -2, other_maria: 2, other_nel: -1, other_roger: -1, other_albel: -3, other_peppita: -1, other_mirage: -1, other_adray: -3 } } ] },
        // PA49
        { paId: "PA49", location: "Moonbase, Bar", availability: "After Proclaimer, before Lab", requirements: "Peppita", action: "Enter bar.", choices: [ { text: "Entered Bar", effects: { fayt_peppita: 1 } } ] },
        // PA50
        { paId: "PA50", location: "Aquaelie, Sophia's Guest Room", availability: "After return to Aquaelie, before bed", requirements: "None", action: "Speak to Sophia.", choices: [ { text: "Spoke to Sophia", effects: { other_sophia: 6, other_cliff: 2, other_maria: 6, other_nel: 4, other_roger: 2, other_albel: 4, other_peppita: 4, other_mirage: 2, other_adray: 3, fayt_sophia: 8 } } ] },
        // PA51
        { paId: "PA51", location: "Arkives, Off Main Square", availability: "After entering Arkives to end", requirements: "None", action: "Speak to Albel.", choices: [ { text: "Choice 1: As long as you understand.", effects: { other_sophia: -4, other_cliff: -1, other_maria: 2, other_nel: -2, other_roger: -1, other_albel: 3, other_peppita: -5, other_mirage: -2, other_adray: -2, fayt_albel: 1 } }, { text: "Choice 2: Just cut it out!", effects: { other_sophia: 3, other_cliff: 2, other_maria: 1, other_nel: 0, other_roger: 1, other_albel: -2, other_peppita: 3, other_mirage: 2, other_adray: 2, fayt_albel: -3 } } ] },
        // PA52
        { paId: "PA52", location: "Gemity, Fighting Arena", availability: "After entering Gemity to end", requirements: "None", action: "Register for Ranking Battle.", choices: [ { text: "Team: Knights Between Time", effects: { other_sophia: 1, other_cliff: 0, other_maria: 2, other_nel: 1, other_roger: -1, other_albel: -2, other_peppita: -1, other_mirage: 1, other_adray: -1 } }, { text: "Team: Steel Knights", effects: { other_sophia: -2, other_cliff: 2, other_maria: 1, other_nel: -1, other_roger: 1, other_albel: 1, other_peppita: -1, other_mirage: 0, other_adray: -1 } }, { text: "Team: Arthur & Knights", effects: { other_sophia: -1, other_cliff: -1, other_maria: -1, other_nel: -1, other_roger: 2, other_albel: -1, other_peppita: 1, other_mirage: 0, other_adray: 2 } }, { text: "Team: Rebels Without Existence", effects: { other_sophia: -1, other_cliff: 1, other_maria: 1, other_nel: 2, other_roger: -1, other_albel: 1, other_peppita: -2, other_mirage: 0, other_adray: -1 } }, { text: "Team: Arcane Warriors", effects: { other_sophia: 0, other_cliff: 1, other_maria: -2, other_nel: 0, other_roger: -1, other_albel: 2, other_peppita: 0, other_mirage: 1, other_adray: -1 } }, { text: "Team: Mystic Dragon Eyes", effects: { other_sophia: 1, other_cliff: 0, other_maria: 1, other_nel: -1, other_roger: 0, other_albel: -1, other_peppita: 0, other_mirage: 1, other_adray: -1 } }, { text: "Team: Defrosted Tuna", effects: { other_sophia: 0, other_cliff: -1, other_maria: -1, other_nel: -2, other_roger: 0, other_albel: -1, other_peppita: 2, other_mirage: -1, other_adray: 2 } }, { text: "Team: Fayt and Company", effects: { other_sophia: 2, other_cliff: -1, other_maria: 0, other_nel: 1, other_roger: -1, other_albel: 0, other_peppita: 1, other_mirage: 0, other_adray: 1 } } ] },
        // PA53
        { paId: "PA53", location: "Airyglyph, Castle Watchtower", availability: "After return to Elicoor II, before Sphere", requirements: "None", action: "Speak to Sophia.", choices: [ { text: "Choice 1: No need to worry...", effects: { other_sophia: -1, other_cliff: -1, other_maria: 2, other_nel: 1, other_roger: -1, other_albel: 3, other_peppita: -2, other_mirage: -1, other_adray: 3, fayt_sophia: 1 } }, { text: "Choice 2: Happens for a reason.", effects: { other_sophia: 4, other_cliff: 1, other_maria: -2, other_nel: 2, other_roger: 1, other_albel: -1, other_peppita: 2, other_mirage: 1, other_adray: 2, fayt_sophia: 1 } }, { text: "Choice 3: Be more serious.", effects: { other_sophia: -3, other_cliff: -1, other_maria: 2, other_nel: 3, other_roger: -1, other_albel: 3, other_peppita: -2, other_mirage: 2, other_adray: -3, fayt_sophia: -2 } } ] },
        // PA54
        { paId: "PA54", location: "Aquios, Castle Library", availability: "After return to Elicoor II, before Sphere", requirements: "None", action: "Speak to Runologist.", choices: [ { text: "Choice 1: Faster than light.", effects: { other_sophia: -3, other_cliff: -2, other_maria: -5, other_nel: 3, other_roger: 5, other_albel: 3, other_peppita: -3, other_mirage: -5, other_adray: -3 } }, { text: "Choice 2: Exploded from inside.", effects: { other_sophia: -1, other_cliff: -2, other_maria: -3, other_nel: -3, other_roger: -3, other_albel: -3, other_peppita: -1, other_mirage: -3, other_adray: 3 } }, { text: "Choice 3: Just like you said.", effects: { other_sophia: -1, other_cliff: -2, other_maria: -3, other_nel: -3, other_roger: -3, other_albel: -3, other_peppita: -1, other_mirage: -3, other_adray: 3 } } ] },
        // PA55
        { paId: "PA55", location: "Kirlsa, Armorer 2F", availability: "After return to Elicoor II, before Sphere", requirements: "Roger", action: "Speak to Roger.", choices: [ { text: "Spoke to Roger", effects: { other_sophia: -2, other_cliff: 0, other_maria: 0, other_nel: -1, other_roger: -3, other_albel: -3, other_peppita: -2, other_mirage: -1, other_adray: 2, fayt_roger: 2 } } ] },
        // PA56
        { paId: "PA56", location: "Urssa Lava Cave, Crosell's Lair", availability: "After return to Elicoor II to end", requirements: "Albel NOT party, Spoke Woltar", action: "Fight Albel (Fayt only).", choices: [ { text: "Choice 1: Let him come.", effects: { other_sophia: -1, other_cliff: 0, other_maria: 1, other_nel: -2, other_roger: 2, other_albel: 3, other_peppita: 2, other_mirage: 0, other_adray: 2, fayt_sophia: 1, fayt_cliff: -4, fayt_maria: -3, fayt_albel: -2 } }, { text: "Choice 2: Don't let him come.", effects: { other_sophia: 2, other_cliff: 2, other_maria: 0, other_nel: 2, other_roger: 4, other_albel: 4, other_peppita: -2, other_mirage: -2, other_adray: -3, fayt_sophia: 1, fayt_cliff: -4, fayt_maria: -3, fayt_albel: -1 } }, { text: "Defeat Albel (No Room)", effects: { other_sophia: 1, other_cliff: 1, other_maria: 2, other_nel: 1, other_roger: 1, other_albel: -2, other_peppita: 0, other_mirage: 1, other_adray: 0, fayt_sophia: 1, fayt_cliff: -4, fayt_maria: -3, fayt_albel: -4 } }, { text: "Defeated by Albel", effects: { other_sophia: -2, other_cliff: -2, other_maria: -2, other_nel: -3, other_roger: -5, other_albel: -5, other_peppita: -2, other_mirage: -2, other_adray: -3, fayt_sophia: 1, fayt_cliff: -4, fayt_maria: -3, fayt_albel: -4 } } ] },
        // PA57
        { paId: "PA57", location: "Diplo, Upper Deck", availability: "On Diplo (second time)", requirements: "None", action: "Speak to Marietta/Steeg.", choices: [ { text: "Spoke to Marietta/Steeg", effects: { other_sophia: 0, other_cliff: 0, other_maria: -1, other_nel: 0, other_roger: 0, other_albel: 0, other_peppita: 0, other_mirage: 0, other_adray: 0, fayt_maria: 0 } } ] },
        // PA58
        { paId: "PA58", location: "Airyglyph, Castle 2F", availability: "After return from Diplo to end", requirements: "Albel joined (Biwig)", action: "Approach king/Albel.", choices: [ { text: "Approached King/Albel", effects: { other_sophia: 0, other_cliff: 0, other_maria: 0, other_nel: -1, other_roger: 1, other_albel: -3, other_peppita: 1, other_mirage: 0, other_adray: 0, fayt_albel: 5 } } ] },
        // PA59
        { paId: "PA59", location: "Aquios, Castle Great Temple", availability: "After return from Diplo to end", requirements: "PA43 & related seen", action: "Speak old woman (Airy 2F), then Nel/friend (Aquios Temple).", choices: [ { text: "Choice 1: Congratulations.", effects: { other_sophia: 3, other_cliff: -3, other_maria: 5, other_nel: 5, other_roger: 5, other_albel: -5, other_peppita: 3, other_mirage: -1, other_adray: -2, fayt_nel: 5 } }, { text: "Choice 2: Political marriage?", effects: { other_sophia: -5, other_cliff: -1, other_maria: -3, other_nel: -10, other_roger: 0, other_albel: 3, other_peppita: -5, other_mirage: -3, other_adray: 4, fayt_nel: 0 } }, { text: "Choice 3: What about Elena?", effects: { other_sophia: 1, other_cliff: 0, other_maria: -1, other_nel: -3, other_roger: 1, other_albel: 3, other_peppita: 0, other_mirage: 1, other_adray: 2, fayt_nel: -3 } } ] },
        // PA60
        { paId: "PA60", location: "Aquios, Castle 2F Balcony", availability: "After Sacred Orb (re-enter Aquios) to end", requirements: "None", action: "Speak to Sophia.", choices: [ { text: "Choice 1: Unhappy princess? (Sophia >= 40)", effects: { other_sophia: 12, other_cliff: -5, other_maria: -5, other_nel: -5, other_roger: -5, other_albel: -2, other_peppita: -7, other_mirage: -7, other_adray: -8, fayt_sophia: 10 } }, { text: "Choice 1: Unhappy princess? (Sophia < 40)", effects: { other_sophia: -3, other_cliff: 2, other_maria: -5, other_nel: 3, other_roger: 3, other_albel: 1, other_peppita: 3, other_mirage: -1, other_adray: 0, fayt_sophia: -8 } }, { text: "Choice 2: Why say that?", effects: { other_sophia: -5, other_cliff: -3, other_maria: -3, other_nel: -5, other_roger: 5, other_albel: 0, other_peppita: 3, other_mirage: -5, other_adray: -3, fayt_sophia: -3 } }, { text: "Choice 3: You're an idiot.", effects: { other_sophia: -8, other_cliff: -2, other_maria: 2, other_nel: 0, other_roger: -3, other_albel: 2, other_peppita: -3, other_mirage: 2, other_adray: 2, fayt_sophia: -4 } } ] }
    ];
     // --- END OF paData ARRAY ---
 
 
     document.addEventListener('DOMContentLoaded', () => {
         // Find elements *after* DOM is loaded
         const scoresListOthersElement = document.getElementById('character-scores-others');
         const scoresListFaytElement = document.getElementById('character-scores-fayt');
         const resetButton = document.getElementById('reset-pa-scores');
         const calculatorSection = document.getElementById('pa-calculator-section');
 
         const modalElement = document.getElementById('pa-modal');
         const modalCloseButton = document.getElementById('modal-close-button');
         const modalTitle = document.getElementById('modal-pa-title');
         const modalMeta = document.getElementById('modal-pa-meta');
         const modalAction = document.getElementById('modal-pa-action');
         const modalChoicesContainer = document.getElementById('modal-pa-choices');
 
         const targetSelectElement = document.getElementById('pa-target-select');
 
         let tooltipElement = null;
 
         // State variables
         let characterScoresOthers = {};
         let characterScoresFayt = {};
         let selectedChoices = {}; // { paId: choiceIndex }
         let currentPaId = null;
         let targetCharacter = "";
         let isCalculatorPresent = !!calculatorSection; // Check only once
 
         // --- Initialization ---
         function initializeScores() {
             characterScoresOthers = { ...startingScoresOthers };
             characterScoresFayt = { ...startingScoresFayt };
             trackedCharacters.forEach(char => {
                 if (!(char in characterScoresOthers)) characterScoresOthers[char] = 0;
                 if (!(char in characterScoresFayt)) characterScoresFayt[char] = 0;
             });
             selectedChoices = {};
             document.querySelectorAll('.walkthrough-pa-checkbox').forEach(cb => {
                 cb.checked = false;
                 cb.closest('li')?.classList.remove('pa-selected');
             });
              if (targetSelectElement) targetSelectElement.value = "";
              targetCharacter = "";
             console.log("Scores Initialized");
             if (isCalculatorPresent) renderScores(); // Render only if calc exists
         }
 
          // --- Populate Target Selector ---
          function populateTargetSelector() {
              if (!targetSelectElement) return;
              targetSelectElement.innerHTML = '<option value="">-- Suggest for: None --</option>';
              trackedCharacters.forEach(char => {
                  const option = document.createElement('option');
                  option.value = char;
                  option.textContent = capitalize(char);
                  targetSelectElement.appendChild(option);
              });
              targetSelectElement.addEventListener('change', (e) => {
                  targetCharacter = e.target.value;
                  console.log("Target character selected:", targetCharacter);
                  // Re-populate open modal if needed
                  if (currentPaId && modalElement && modalElement.style.display === 'flex') {
                      const pa = paData.find(p => p.paId === currentPaId);
                       if (pa) {
                            if (currentPaId === "PA60") {
                                 const sophiaScore = characterScoresOthers['sophia'] ?? 0;
                                 const indicesToShow = sophiaScore >= 40 ? [0, 2, 3] : [1, 2, 3];
                                 populateModalConditional(currentPaId, indicesToShow);
                            } else {
                                populateModal(currentPaId);
                            }
                       }
                  }
              });
          }
 
         // --- Rendering ---
         function renderScores() {
             if (!isCalculatorPresent || !scoresListOthersElement || !scoresListFaytElement) return; // Extra safety check
             scoresListOthersElement.innerHTML = ''; scoresListFaytElement.innerHTML = '';
              trackedCharacters.forEach(char => {
                  const scoreOther = characterScoresOthers[char] ?? 0;
                  const liOther = document.createElement('li');
                  liOther.className = 'score-entry';
                  liOther.innerHTML = `<span class="char-name">${capitalize(char)}</span><span class="char-score">${scoreOther}</span>`;
                  scoresListOthersElement.appendChild(liOther);
                  const scoreFayt = characterScoresFayt[char] ?? 0;
                  const liFayt = document.createElement('li');
                  liFayt.className = 'score-entry';
                  liFayt.innerHTML = `<span class="char-name">${capitalize(char)}</span><span class="char-score">${scoreFayt}</span>`;
                  scoresListFaytElement.appendChild(liFayt);
              });
         }
 
         // --- Modal Functions ---
         function checkModalElements() {
             if (!modalElement || !modalCloseButton || !modalTitle || !modalMeta || !modalAction || !modalChoicesContainer) {
                  console.error("CRITICAL: One or more modal HTML elements are missing!");
                  return false;
              }
              return true;
         }
 
         function populateModal(paId) {
              if (!checkModalElements()) return; // Exit if elements missing
 
             const pa = paData.find(p => p.paId === paId);
             if (!pa) { console.error(`PA data not found for modal: ${paId}`); return; }
 
             currentPaId = paId; // Track which PA is open
 
             modalTitle.textContent = `${pa.paId}: ${pa.location}`;
             modalMeta.innerHTML = `<em>Avail:</em> ${pa.availability || 'N/A'}<br><em>Reqs:</em> ${pa.requirements || 'None'}`;
             modalAction.innerHTML = `<strong>Action:</strong> ${pa.action || 'N/A'}`;
             modalChoicesContainer.innerHTML = ''; // Clear old choices
 
             pa.choices.forEach((choice, choiceIndex) => {
                 const button = document.createElement('button');
                 button.className = 'pa-choice-button modal-choice-button';
                 button.textContent = choice.text;
                 button.title = choice.text;
                 button.dataset.choiceIndex = choiceIndex;
 
                 const suggestionClass = evaluateChoiceSuggestion(choice.effects, targetCharacter);
                 if (suggestionClass) button.classList.add(suggestionClass);
                 if (selectedChoices[paId] === choiceIndex) button.classList.add('selected');
 
                 button.addEventListener('click', handleModalChoiceSelection); // Add listener *here*
                 modalChoicesContainer.appendChild(button);
             });
 
             modalElement.style.display = 'flex'; // Show modal
             console.log(`Modal opened for PA: ${paId}`);
         }
 
         function populateModalConditional(paId, choiceIndicesToShow) {
              if (!checkModalElements()) return;
              const pa = paData.find(p => p.paId === paId);
              if (!pa) { console.error(`PA data for conditional modal: ${paId}`); return; }
 
              currentPaId = paId;
              modalTitle.textContent = `${pa.paId}: ${pa.location}`;
              modalMeta.innerHTML = `<em>Avail:</em> ${pa.availability || 'N/A'}<br><em>Reqs:</em> ${pa.requirements || 'None'}`;
              modalAction.innerHTML = `<strong>Action:</strong> ${pa.action || 'N/A'}`;
              modalChoicesContainer.innerHTML = '';
 
              choiceIndicesToShow.forEach(choiceIndex => {
                  const choice = pa.choices[choiceIndex];
                  if (!choice) return;
                  const button = document.createElement('button');
                  button.className = 'pa-choice-button modal-choice-button';
                  let buttonText = choice.text;
                  if (paId === "PA60" && (choiceIndex === 0 || choiceIndex === 1)) buttonText = "Choice 1: Unhappy princess?";
                  button.textContent = buttonText;
                  button.title = choice.text;
                  button.dataset.choiceIndex = choiceIndex; // Store ORIGINAL index
                  const suggestionClass = evaluateChoiceSuggestion(choice.effects, targetCharacter);
                  if (suggestionClass) button.classList.add(suggestionClass);
                  if (selectedChoices[paId] === choiceIndex) button.classList.add('selected');
                  button.addEventListener('click', handleModalChoiceSelection);
                  modalChoicesContainer.appendChild(button);
              });
              modalElement.style.display = 'flex';
              console.log(`Conditional Modal opened for PA: ${paId}`);
         }
 
         function closeModal() {
             if (modalElement) modalElement.style.display = 'none';
             currentPaId = null;
             if (modalChoicesContainer) modalChoicesContainer.innerHTML = '';
         }
 
         // --- Evaluate Suggestion ---
         function evaluateChoiceSuggestion(effects, target) {
              if (!target || !effects) return 'suggestion-neutral';
              const otherKey = `other_${target}`; const faytKey = `fayt_${target}`;
              const otherChange = parsePoints(effects[otherKey]); const faytChange = parsePoints(effects[faytKey]);
              if (otherChange < 0 || faytChange < 0) return 'suggestion-bad';
              if (otherChange > 0 || faytChange > 0) return 'suggestion-good';
              return 'suggestion-neutral';
          }
 
         // --- Event Handlers ---
         function handleWalkthroughCheckboxClick(event) {
             const checkbox = event.target;
             const listItem = checkbox.closest('li'); // Get the parent LI
             const paId = listItem?.dataset.paId; // Get paId from the LI
 
             console.log(`Checkbox clicked for li with paId: ${paId}`); // Debugging
 
             if (!listItem || !paId) {
                  console.warn("No PA ID found on clicked list item's parent.");
                  // Allow default checkbox behavior for non-PA items if necessary
                  // event.preventDefault() wasn't called, so it should just check/uncheck normally.
                  return;
             }
 
             event.preventDefault(); // *** Prevent default check/uncheck for PA items ***
 
             const pa = paData.find(p => p.paId === paId);
             if (!pa) {
                  console.error(`No PA data found for ID: ${paId}`);
                  return; // Exit if data is missing
             }
 
              // --- Special Conditional Logic (e.g., PA60) ---
             if (paId === "PA60" && pa.choices.length > 2) {
                 const sophiaScore = characterScoresOthers['sophia'] ?? 0;
                 const indicesToShow = sophiaScore >= 40 ? [0, 2, 3] : [1, 2, 3];
                 populateModalConditional(paId, indicesToShow);
                 return;
             }
 
             // --- Logic for Single-Choice PAs ---
             if (pa.choices.length === 1 && !pa.choices[0].text.toLowerCase().includes('choice')) {
                 const choiceIndex = 0;
                 const isCurrentlySelected = selectedChoices[paId] === choiceIndex;
                 const effects = pa.choices[choiceIndex]?.effects;
 
                 // Undo previous effects first if needed
                 if (selectedChoices[paId] !== undefined) {
                     const previousChoiceData = pa.choices[selectedChoices[paId]];
                     if (previousChoiceData?.effects) applyAffectionChange(previousChoiceData.effects, true);
                 }
 
                 // Now, either select or deselect
                 if (isCurrentlySelected) {
                     // DESELECT
                     delete selectedChoices[paId];
                     listItem.classList.remove('pa-selected');
                     checkbox.checked = false; // *** Explicitly set visual state ***
                     console.log(`Deselected single-choice PA ${paId}`);
                 } else {
                     // SELECT
                     if (effects) applyAffectionChange(effects, false);
                     selectedChoices[paId] = choiceIndex;
                     listItem.classList.add('pa-selected');
                     checkbox.checked = true; // *** Explicitly set visual state ***
                     console.log(`Applied single-choice PA ${paId}`);
                 }
 
                  // Update score display if calculator is present
                  if (isCalculatorPresent) renderScores();
 
             } else {
                 // --- Logic for Multi-Choice PAs (Open Modal) ---
                 console.log(`Opening modal for multi-choice PA: ${paId}`);
                 populateModal(paId); // This should open the modal
             }
         }
 
 
         function handleModalChoiceSelection(event) {
              const clickedButton = event.target;
              const choiceIndex = parseInt(clickedButton.dataset.choiceIndex, 10);
              const paId = currentPaId; // Use the stored ID from when modal was opened
              const listItem = document.querySelector(`li[data-pa-id="${paId}"]`);
              const checkbox = listItem?.querySelector('.walkthrough-pa-checkbox');
 
              if (isNaN(choiceIndex) || !paId || !listItem || !checkbox) {
                  console.error("Modal choice error - missing elements or data", { paId, choiceIndex, listItemExists: !!listItem, checkboxExists: !!checkbox });
                  closeModal();
                  return;
              }
 
              const pa = paData.find(p => p.paId === paId);
              if (!pa) { console.error(`PA Data error on modal selection: ${paId}`); closeModal(); return; }
 
              const previouslySelectedIndex = selectedChoices[paId];
              const currentChoiceData = pa.choices[choiceIndex];
              const isDeselecting = previouslySelectedIndex === choiceIndex;
 
              // Undo previous effects IF a different choice was selected before
              if (previouslySelectedIndex !== undefined && !isDeselecting) {
                  const previousChoiceData = pa.choices[previouslySelectedIndex];
                  if (previousChoiceData?.effects) {
                      applyAffectionChange(previousChoiceData.effects, true); // Undo previous
                  }
                  console.log(`Modal: Undid previous choice ${previouslySelectedIndex} for PA ${paId}`);
              }
 
              // Handle Deselect or Select/Change
              if (isDeselecting) {
                  if (currentChoiceData?.effects) {
                      applyAffectionChange(currentChoiceData.effects, true); // Undo the one being deselected
                  }
                  delete selectedChoices[paId];
                  listItem.classList.remove('pa-selected');
                  checkbox.checked = false; // Update checkbox visual state
                  console.log(`Modal: Deselected PA ${paId}, Choice ${choiceIndex}`);
              } else {
                  if (currentChoiceData?.effects) {
                      applyAffectionChange(currentChoiceData.effects, false); // Apply new choice
                  }
                  selectedChoices[paId] = choiceIndex;
                  listItem.classList.add('pa-selected');
                  checkbox.checked = true; // Update checkbox visual state
                  console.log(`Modal: Applied PA ${paId}, Choice ${choiceIndex}`);
              }
 
              if (isCalculatorPresent) renderScores(); // Update scores display
              closeModal(); // Close modal after selection/deselection
         }
 
 
         function applyAffectionChange(effects, isUndo = false) {
              // console.log(isUndo ? "Undoing effects:" : "Applying effects:", effects);
              for (const effectKey in effects) {
                  const change = parsePoints(effects[effectKey]);
                  if (change === 0) continue;
                   if (effectKey.startsWith('other_')) {
                       const character = effectKey.substring(6);
                       if (characterScoresOthers.hasOwnProperty(character)) characterScoresOthers[character] += isUndo ? -change : change;
                   } else if (effectKey.startsWith('fayt_')) {
                       const character = effectKey.substring(5);
                        if (characterScoresFayt.hasOwnProperty(character)) characterScoresFayt[character] += isUndo ? -change : change;
                   }
               }
          }
 
          function handleReset() {
              console.log("Resetting scores...");
              initializeScores();
          }
 
         // --- Tooltip Logic ---
         function createTooltip() {
              if (!tooltipElement && document.body) {
                  tooltipElement = document.createElement('div');
                  tooltipElement.id = 'pa-tooltip';
                  tooltipElement.style.display = 'none';
                  document.body.appendChild(tooltipElement);
                  // console.log("Tooltip element created."); // Less verbose log
              }
          }
          function showTooltip(event) {
              if (!isCalculatorPresent) return; // Don't show if no calculator
              if (!tooltipElement) createTooltip();
              if (!tooltipElement) return; // Failed to create
 
              // Generate content ONLY if scores are available
              if (!characterScoresOthers || !characterScoresFayt) {
                   console.warn("Scores not ready for tooltip.");
                   return; // Avoid errors if scores haven't been initialized
              }
 
              let tooltipText = "Affection Scores:\n";
              tooltipText += "--------------------\n";
              tooltipText += "Others → Fayt | Fayt → Others\n";
              tooltipText += "--------------------\n";
              trackedCharacters.forEach(char => {
                   const scoreOther = characterScoresOthers[char] ?? 0;
                   const scoreFayt = characterScoresFayt[char] ?? 0;
                   const namePadded = capitalize(char).padEnd(8);
                   tooltipText += `${namePadded}: ${String(scoreOther).padStart(3)} | ${String(scoreFayt).padStart(3)}\n`;
               });
 
              tooltipElement.textContent = tooltipText;
              tooltipElement.style.display = 'block';
              moveTooltip(event); // Position initial
              document.addEventListener('pointermove', moveTooltip); // Follow
              // console.log("Showing tooltip");
          }
          function hideTooltip() { if (tooltipElement) { tooltipElement.style.display = 'none'; document.removeEventListener('pointermove', moveTooltip); } }
          function moveTooltip(event) {
               if (!tooltipElement || tooltipElement.style.display === 'none') return;
               const xOffset = 15; const yOffset = 10; let x = event.clientX + xOffset; let y = event.clientY + yOffset;
               const tooltipRect = tooltipElement.getBoundingClientRect(); const winWidth = window.innerWidth; const winHeight = window.innerHeight;
               if (tooltipRect.width > 0 && tooltipRect.height > 0) { if (x + tooltipRect.width > winWidth - 5) x = event.clientX - tooltipRect.width - xOffset; if (y + tooltipRect.height > winHeight - 5) y = event.clientY - tooltipRect.height - yOffset; if (x < 5) x = 5; if (y < 5) y = 5; }
               tooltipElement.style.left = `${x}px`; tooltipElement.style.top = `${y}px`;
           }
          function capitalize(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }
 
         // --- Event Listener Setup ---
         if (isCalculatorPresent) {
             initializeScores();
             populateTargetSelector();
             if(resetButton) resetButton.addEventListener('click', handleReset);
             if(modalCloseButton) modalCloseButton.addEventListener('click', closeModal);
             if(modalElement) modalElement.addEventListener('click', (e) => { if (e.target === modalElement) closeModal(); });
              createTooltip(); // Create tooltip div structure
         } else {
             console.warn("PA Calculator section not found. Calculator features disabled.");
         }
 
         // Walkthrough Checkbox Listeners
         document.querySelectorAll('.walkthrough-pa-checkbox').forEach(checkbox => {
             checkbox.addEventListener('click', handleWalkthroughCheckboxClick);
             // Minor check for setup validity
             if (!checkbox.closest('li')?.dataset.paId) console.warn("Checkbox missing data-pa-id on parent li:", checkbox.id);
         });
 
          // PA Marker Tooltip Listeners
          document.querySelectorAll('.pa-marker').forEach(marker => {
              if (isCalculatorPresent) { // Tooltip only works with calculator
                  marker.addEventListener('pointerenter', showTooltip);
                  marker.addEventListener('pointerleave', hideTooltip);
                  marker.removeAttribute('title');
              } else {
                  marker.title = marker.title || "Private Action"; // Fallback title
              }
          });
 
          // Render initial scores if needed
          if (isCalculatorPresent) renderScores();
 
          // Item Search Setup (Remains the same)
         const searchInput = document.getElementById('item-search');
         const allItems = document.querySelectorAll('.item-entry');
         if (searchInput && allItems.length > 0) {
             searchInput.addEventListener('input', function() { /* ... search logic ... */ });
         }
 
     }); // End DOMContentLoaded  