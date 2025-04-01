document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const categorySelect = document.getElementById('category-select');
    const bonusItemSection = document.getElementById('bonus-item-section');
    const bonusItemCheckbox = document.getElementById('bonus-item-checkbox');
    const bonusItemLabel = document.getElementById('bonus-item-label');
    const inventorSection = document.getElementById('inventor-section');
    const inventorTableBody = document.getElementById('inventor-table-body');
    const inventorStatsDiv = document.getElementById('inventor-stats');
    const itemCreationSection = document.getElementById('item-creation-section');
    const itemSelect = document.getElementById('item-select');
    const itemStatsDiv = document.getElementById('item-stats');
    const creationResultsDiv = document.getElementById('creation-results');
    const resultList = document.getElementById('result-list');
    const creationImpossibleDiv = document.getElementById('creation-impossible');
    const referenceSection = document.getElementById('reference-section');
    const referenceTableBody = document.getElementById('reference-table-body');
    const creditsButton = document.getElementById('credits-button');
    const creditsContent = document.getElementById('credits-content');
    const toggleExperimentalButton = document.getElementById('toggle-experimental-button');
    const optimalFinderSection = document.getElementById('optimal-finder-section');
    const optimalCategorySelect = document.getElementById('optimal-category-select');
    const optimalItemSelect = document.getElementById('optimal-item-select');
    const optimalBonusCheckbox = document.getElementById('optimal-bonus-checkbox');
    const findOptimalButton = document.getElementById('find-optimal-button');
    const optimalResultsDisplay = document.getElementById('optimal-results-display');

    // --- Data (from data.js) ---
    const { craftingCategories, inventorData, inventionData, inventorGroups } = window.so3data;

    // --- Application State ---
    let currentCategoryIndex = -1;
    let selectedInventorIndices = [];
    let totalSkill = 0;
    let totalTimeMod = 0;
    let totalCostMod = 0;
    let availableItemsForSelection = [];
    let lastHighlightedRefRow = null;

    // --- Initialization ---
    function initialize() {
        populateCategoryDropdown();
        populateOptimalCategoryDropdown();
        setupEventListeners();
        inventorSection.classList.add('hidden');
        itemCreationSection.classList.add('hidden');
        referenceSection.classList.add('hidden');
        bonusItemSection.classList.add('hidden');
        creditsContent.classList.add('hidden');
        optimalFinderSection.classList.add('hidden');
    }

    // --- Populate UI ---
    function populateCategoryDropdown() {
        categorySelect.innerHTML = '<option value="">-- Select Category --</option>';
        craftingCategories.forEach((category, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = category[0];
            categorySelect.appendChild(option);
        });
    }

    function updateBonusItemSection() {
        if (currentCategoryIndex !== -1) {
            bonusItemLabel.textContent = `Has ${craftingCategories[currentCategoryIndex][1]}?`;
            bonusItemSection.classList.remove('hidden');
        } else {
            bonusItemSection.classList.add('hidden');
        }
    }

    function renderInventorTable() {
        inventorTableBody.innerHTML = '';
        inventorSection.classList.remove('hidden');
        const relevantInventors = inventorData
            .map((inv, index) => ({ ...inv, originalIndex: index }))
            .filter(inv => currentCategoryIndex >= 0 && (inv[currentCategoryIndex + 3] || 0) > 0);

        relevantInventors.forEach(inventor => {
            const inventorIndex = inventor.originalIndex;
            const skill = inventor[currentCategoryIndex + 3];
            const timeMod = inventor[1];
            const costMod = inventor[2];
            const name = inventor[0];
            const row = document.createElement('tr');
            row.dataset.inventorIndex = inventorIndex;
            row.innerHTML = `
                <td><input type="checkbox" value="${inventorIndex}" data-inventor-index="${inventorIndex}"></td>
                <td>${name}</td>
                <td class="skill-value">${skill}</td>
                <td>${timeMod}%</td>
                <td>${costMod}%</td>
            `;
            inventorTableBody.appendChild(row);
            const checkbox = row.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', handleInventorSelection);
        });
        updateInventorSelectionVisuals();
    }

    // Renders the bottom reference table listing all items for the category
    function renderReferenceTable() {
        referenceTableBody.innerHTML = '';
        referenceSection.classList.remove('hidden');
        lastHighlightedRefRow = null;

        inventionData.forEach((item, itemIndex) => {
            if (item[1] === currentCategoryIndex) { // Filter by selected category
                const row = document.createElement('tr');
                row.dataset.itemIndex = itemIndex;

                const inventorGroupIndex = item[4];
                const inventorGroup = inventorGroups && inventorGroups[inventorGroupIndex] ? inventorGroups[inventorGroupIndex] : [];
                const inventorNames = inventorGroup
                    .map(invIndex => inventorData[invIndex] ? inventorData[invIndex][0] : 'Unknown')
                    .join(', ') || 'None Listed';

                // *** CONFIRMED ORDER: Matches <thead> in index.html ***
                // Data: item[0]=Name, item[2]=BaseCost, item[3]=Difficulty
                row.innerHTML = `
                    <td>${item[0]}</td>        <!-- Item Name -->
                    <td>${item[2]}</td>        <!-- Base Cost -->
                    <td>${item[3]}</td>        <!-- Difficulty -->
                    <td>${inventorNames}</td>  <!-- Inventors -->
                `;
                // *** END CONFIRMED ORDER ***

                row.addEventListener('click', () => highlightReferenceRow(row));
                referenceTableBody.appendChild(row);
            }
        });
    }


    function updateInventorStatsDisplay() {
        if (selectedInventorIndices.length > 0) {
             if (bonusItemCheckbox.checked) {
                 inventorStatsDiv.innerHTML = `
                    <p><span>Total Skill:</span> ${totalSkill + 20} (Base: ${totalSkill} + 20 Bonus)</p>
                    <p><span>Time Adj:</span> ${totalTimeMod}%</p>
                    <p><span>Cost Adj:</span> ${totalCostMod}%</p>
                `;
             } else {
                 inventorStatsDiv.innerHTML = `
                    <p><span>Total Skill:</span> ${totalSkill}</p>
                    <p><span>Time Adj:</span> ${totalTimeMod}%</p>
                    <p><span>Cost Adj:</span> ${totalCostMod}%</p>
                `;
             }
        } else {
            inventorStatsDiv.innerHTML = '<p>Select up to 3 inventors.</p>';
        }
    }

    // Populates the item dropdown in the *original* calculator section (Section 3)
    function populateItemSelectionDropdown() {
        itemSelect.innerHTML = '<option value="">-- Select Item --</option>';
        availableItemsForSelection = []; // Reset list used for duplicate checks

        if (selectedInventorIndices.length === 0 || currentCategoryIndex === -1) {
            itemCreationSection.classList.add('hidden');
            resetItemDetails();
            return;
        }
        itemCreationSection.classList.remove('hidden'); // Show the section

        inventionData.forEach((item, itemIndex) => {
            if (item[1] !== currentCategoryIndex) return;

            const requiredGroupIndex = item[4];
            const requiredGroup = inventorGroups && inventorGroups[requiredGroupIndex] ? inventorGroups[requiredGroupIndex] : [];

            // *** CORE LOGIC: Check if AT LEAST ONE selected inventor is in the item's required group ***
            const canBeMadeBySomeoneSelected = selectedInventorIndices.some(
                selIndex => requiredGroup.includes(selIndex)
            );
            if (canBeMadeBySomeoneSelected) {
                availableItemsForSelection.push({ index: itemIndex, data: item });
                const option = document.createElement('option');
                option.value = itemIndex;
                option.textContent = item[0];
                itemSelect.appendChild(option);
            }
        });

        resetItemDetails();
        itemSelect.value = "";
    }


    // Displays results (probability, cost, duplicates) in original calculator (Section 3)
    function displayItemCreationDetails(selectedItemIndexStr) {
         resetItemDetails();

        if (selectedItemIndexStr === "" || selectedInventorIndices.length === 0 || currentCategoryIndex === -1) {
            return;
        }
        const selectedItemIndex = parseInt(selectedItemIndexStr);
        if (isNaN(selectedItemIndex) || !inventionData[selectedItemIndex]) return;

        const item = inventionData[selectedItemIndex];
        const itemName = item[0];
        const difficulty = item[3]; // Correct index
        const baseCost = item[2]; // Correct index
        const currentSkill = totalSkill + (bonusItemCheckbox.checked ? 20 : 0);
        const probability = currentSkill - difficulty;
        const modifiedBaseCost = calculateModifiedCost(baseCost, totalCostMod);

        let probabilityClass = '';
        let probabilityText = '';
         if (probability < 1) {
            probabilityClass = 'probability-slim'; probabilityText = `${probability}% (Impossible?)`;
         } else if (probability < 25) {
            probabilityClass = 'probability-slim'; probabilityText = `${probability}% (Slim Chance)`;
         } else if (probability < 75) {
            probabilityClass = 'probability-good'; probabilityText = `${probability}% (Good Chance)`;
         } else if (probability < 100) {
            probabilityClass = 'probability-great'; probabilityText = `${probability}% (Great Chance)`;
         } else {
            probabilityClass = 'probability-assured'; probabilityText = `${probability}% (Almost Assured)`;
         }

        itemStatsDiv.innerHTML = `
            <p><span>Est. Final Cost:</span> ${modifiedBaseCost} (Original: ${baseCost})</p>
            <p><span>Difficulty:</span> ${difficulty}</p>
            <p><span>Success Rate:</span> <span class="${probabilityClass}">${probabilityText}</span></p>
        `;

        if (probability <= 0) {
            creationImpossibleDiv.textContent = `It is impossible to create ${itemName} with the selected inventors and current skill (${currentSkill}). Needs > ${difficulty}.`;
            creationImpossibleDiv.classList.remove('hidden');
            resultList.innerHTML = '';
            creationResultsDiv.classList.add('hidden');
        } else {
            creationImpossibleDiv.classList.add('hidden');
            creationResultsDiv.classList.remove('hidden');
            calculateAndDisplayOutcomes(selectedItemIndex, baseCost);
        }
    }

    // Calculates and displays potential duplicate items based on cost overlap
     function calculateAndDisplayOutcomes(targetItemIndex, targetBaseCost) {
        resultList.innerHTML = '';
        const costRanges = {};

        for (let mod = -5; mod <= 5; mod++) {
            const cost = calculateModifiedCost(targetBaseCost, totalCostMod + mod);
             if (!costRanges[cost]) {
                costRanges[cost] = new Set();
             }
        }

        availableItemsForSelection.forEach(availableItemInfo => {
            const currentItemIndex = availableItemInfo.index;
            if (currentItemIndex === targetItemIndex) return;

            const currentItem = availableItemInfo.data;
            const currentBaseCost = currentItem[2];
            const currentItemName = currentItem[0];
            const isSameBaseCost = (currentBaseCost === targetBaseCost);

            for (let mod = -5; mod <= 5; mod++) {
                const cost = calculateModifiedCost(currentBaseCost, totalCostMod + mod);
                if (costRanges.hasOwnProperty(cost)) {
                    const duplicateText = `${currentItemName}${isSameBaseCost ? '<span class="duplicate-star">*</span>' : ''}`;
                    costRanges[cost].add(duplicateText);
                }
            }
        });

        const sortedCosts = Object.keys(costRanges).map(Number).sort((a, b) => a - b);

        if (sortedCosts.length === 0) {
             resultList.innerHTML = '<li>Error calculating cost ranges.</li>';
             return;
        }

        sortedCosts.forEach(cost => {
            const li = document.createElement('li');
            let duplicatesHtml = '';
            const duplicatesSet = costRanges[cost];
            if (duplicatesSet && duplicatesSet.size > 0) {
                duplicatesHtml = `<span class="duplicates"> - Potential duplicates at this value: ${[...duplicatesSet].join(', ')}</span>`;
            } else {
                 duplicatesHtml = `<span class="duplicates sl"> - No duplicates overlap at this specific value</span>`;
            }
            li.innerHTML = `<strong>${cost}</strong> ${duplicatesHtml}`;
            resultList.appendChild(li);
        });
    }

    function calculateModifiedCost(base, costModifier) {
        const numBase = Number(base);
        if (isNaN(numBase)) return 0;
        return Math.round(numBase * ((costModifier + 100) / 100));
    }

     function resetItemDetails() {
        itemStatsDiv.innerHTML = '';
        resultList.innerHTML = '';
        creationImpossibleDiv.classList.add('hidden');
        creationResultsDiv.classList.add('hidden');
     }

     function highlightReferenceRow(row) {
        if (lastHighlightedRefRow) {
            lastHighlightedRefRow.classList.remove('highlighted-row');
        }
        if (lastHighlightedRefRow !== row) {
             row.classList.add('highlighted-row');
             lastHighlightedRefRow = row;
        } else {
             lastHighlightedRefRow = null;
        }
     }

    // --- Optimal Finder UI Functions ---
    function populateOptimalCategoryDropdown() {
        optimalCategorySelect.innerHTML = '<option value="">-- Select Category --</option>';
        craftingCategories.forEach((category, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = category[0];
            optimalCategorySelect.appendChild(option);
        });
    }

    function populateOptimalItemDropdown(categoryIndexStr) {
        optimalItemSelect.innerHTML = '<option value="">-- Select Item --</option>';
        optimalItemSelect.disabled = true;
        findOptimalButton.disabled = true;
        if (categoryIndexStr === "" ) return;
         const categoryIndex = parseInt(categoryIndexStr);
         if(isNaN(categoryIndex) || categoryIndex < 0) return;

        let itemsFound = false;
        inventionData.forEach((item, itemIndex) => {
            if (item[1] === categoryIndex) {
                const option = document.createElement('option');
                option.value = itemIndex;
                option.textContent = item[0];
                optimalItemSelect.appendChild(option);
                itemsFound = true;
            }
        });
        if (itemsFound) {
            optimalItemSelect.disabled = false;
        }
    }

    function displayOptimalResults(results) {
        optimalResultsDisplay.innerHTML = '';
        if (!results || results.length === 0) {
            optimalResultsDisplay.innerHTML = '<p>No valid inventor combination found (probability might be too low).</p>';
            return;
        }

        results.sort((a, b) => {
            if (b.probability !== a.probability) return b.probability - a.probability;
            if (a.costMod !== b.costMod) return a.costMod - b.costMod;
            if (a.timeMod !== b.timeMod) return a.timeMod - b.timeMod;
            return a.inventors.length - b.inventors.length;
        });

        const resultListEl = document.createElement('ul');
        results.slice(0, 5).forEach((result, index) => {
            const li = document.createElement('li');
            if (index === 0) li.classList.add('best-result');
            const inventorNames = result.inventors
                .map(invIdx => inventorData[invIdx] ? inventorData[invIdx][0] : 'Unknown')
                .join(', ');

            let probClass = 'prob-slim';
            if (result.probability >= 100) probClass = 'prob-assured';
            else if (result.probability >= 75) probClass = 'prob-great';
            else if (result.probability >= 25) probClass = 'prob-good';

            li.innerHTML = `
                <strong>${inventorNames} (${result.inventors.length} Inventor${result.inventors.length > 1 ? 's' : ''})</strong>
                <span>Skill: ${result.totalSkill} ${result.bonusUsed ? `(Base: ${result.totalSkill-20} +20)` : ''}</span>
                <span><strong class="prob ${probClass}">Prob: ${result.probability}%</strong></span>
                <span>Cost Adj: ${result.costMod}%</span>
                <span>Time Adj: ${result.timeMod}%</span>
            `;
            resultListEl.appendChild(li);
        });
        optimalResultsDisplay.appendChild(resultListEl);

         if (results.length > 5) {
            const moreInfo = document.createElement('p');
            moreInfo.classList.add('help-text');
            moreInfo.textContent = `Showing top 5 results out of ${results.length} valid combinations found.`;
            optimalResultsDisplay.appendChild(moreInfo);
        }
    }

    // --- Event Handlers ---
    function handleCategoryChange() {
        currentCategoryIndex = categorySelect.value !== "" ? parseInt(categorySelect.value) : -1;
        selectedInventorIndices = [];
        bonusItemCheckbox.checked = false;
        resetCalculations();
        updateBonusItemSection();
        if (currentCategoryIndex !== -1) {
            renderInventorTable();
            renderReferenceTable();
            updateInventorStatsDisplay();
            populateItemSelectionDropdown();
        } else {
            inventorSection.classList.add('hidden');
            itemCreationSection.classList.add('hidden');
            referenceSection.classList.add('hidden');
            bonusItemSection.classList.add('hidden');
            inventorStatsDiv.innerHTML = '';
            resetItemDetails();
        }
    }

    function handleInventorSelection(event) {
        const checkbox = event.target;
        const inventorIndex = parseInt(checkbox.dataset.inventorIndex);
        if (isNaN(inventorIndex)) return;
        const beforeIndices = [...selectedInventorIndices];
        if (checkbox.checked) {
            if (selectedInventorIndices.length >= 3) {
                checkbox.checked = false;
                alert("You may only select a maximum of 3 inventors.");
                return;
            }
            if (!selectedInventorIndices.includes(inventorIndex)) {
                 selectedInventorIndices.push(inventorIndex);
            }
        } else {
            selectedInventorIndices = selectedInventorIndices.filter(index => index !== inventorIndex);
        }
        const selectionChanged = beforeIndices.length !== selectedInventorIndices.length ||
                               !beforeIndices.every((val, idx) => val === selectedInventorIndices[idx]);
        if (selectionChanged) {
            updateInventorSelectionVisuals();
            recalculateTotals();
            populateItemSelectionDropdown();
            displayItemCreationDetails(itemSelect.value);
        }
    }

    function updateInventorSelectionVisuals() {
         const rows = inventorTableBody.querySelectorAll('tr');
         rows.forEach(row => {
             const checkbox = row.querySelector('input[type="checkbox"]');
             if (!checkbox) return;
             const index = parseInt(checkbox.dataset.inventorIndex);
             if (selectedInventorIndices.includes(index)) {
                 row.classList.add('highlighted-row');
                 checkbox.checked = true;
             } else {
                 row.classList.remove('highlighted-row');
                 checkbox.checked = false;
             }
         });
     }

    function handleBonusItemChange() {
        recalculateTotals();
        displayItemCreationDetails(itemSelect.value);
    }

     function handleItemSelectionChange() {
         displayItemCreationDetails(itemSelect.value);
     }

     function toggleCredits() {
        creditsContent.classList.toggle('hidden');
     }

     // --- NEW Event Handlers for Optimal Finder ---
    function handleOptimalCategoryChange() {
        const selectedIndex = optimalCategorySelect.value;
        populateOptimalItemDropdown(selectedIndex);
        optimalResultsDisplay.innerHTML = '<p>Please select an item.</p>';
        findOptimalButton.disabled = true;
    }

    function handleOptimalItemChange() {
        if (optimalItemSelect.value !== "") {
            findOptimalButton.disabled = false;
            optimalResultsDisplay.innerHTML = '<p>Ready to find optimal crafters.</p>';
        } else {
            findOptimalButton.disabled = true;
            optimalResultsDisplay.innerHTML = '<p>Please select an item.</p>';
        }
    }

    function handleToggleExperimental() {
        const isHidden = optimalFinderSection.classList.toggle('hidden');
        toggleExperimentalButton.textContent = isHidden ?
            'Show Optimal Crafter Finder (Experimental)' :
            'Hide Optimal Crafter Finder';
    }

    function handleFindOptimal() {
        const categoryIndex = parseInt(optimalCategorySelect.value);
        const itemIndex = parseInt(optimalItemSelect.value);

        // *** FORCE RE-READING CHECKBOX STATE ***
        const bonusCheckboxElement = document.getElementById('optimal-bonus-checkbox'); // Get element directly
        if (!bonusCheckboxElement) {
             console.error("Cannot find the bonus checkbox element!");
             optimalResultsDisplay.innerHTML = '<p class="error-message">Internal Error: Cannot find bonus checkbox.</p>';
             return;
        }
        const useBonus = bonusCheckboxElement.checked; // Read its current checked state
        // *** END FORCE RE-READING ***

        console.log(`--- Finding Optimal ---`);
        console.log(`Category: ${categoryIndex}, Item: ${itemIndex}`);
        console.log(`'Use Bonus Item?' checkbox checked: ${useBonus}`); // Log the freshly read state

        if (isNaN(categoryIndex) || categoryIndex < 0 || isNaN(itemIndex) || itemIndex < 0) {
            optimalResultsDisplay.innerHTML = '<p class="error-message">Invalid category or item selected.</p>';
            return;
        }
        optimalResultsDisplay.innerHTML = '<p>Calculating...</p>';
        setTimeout(() => {
            try {
                const results = findOptimalCrafters(categoryIndex, itemIndex, useBonus); // Pass the freshly read state
                displayOptimalResults(results);
            } catch (error) {
                 console.error("Error during optimal calculation:", error);
                 optimalResultsDisplay.innerHTML = `<p class="error-message">An error occurred: ${error.message}. Check console.</p>`;
            }
        }, 10);
    }

    // --- Calculations ---
    function resetCalculations() {
        totalSkill = 0;
        totalTimeMod = 0;
        totalCostMod = 0;
    }

    function recalculateTotals() {
        resetCalculations();
        selectedInventorIndices.forEach(index => {
             if (inventorData[index]) {
                const inventor = inventorData[index];
                if (currentCategoryIndex >= 0 && currentCategoryIndex < craftingCategories.length) {
                    totalSkill += inventor[currentCategoryIndex + 3] || 0;
                }
                totalTimeMod += inventor[1] || 0;
                totalCostMod += inventor[2] || 0;
             }
        });
        updateInventorStatsDisplay();
    }

    // --- Optimal Finder Calculations ---
    function calculateGroupStats(inventorIndices, categoryIndex, useBonus) {
        // *** LOG RECEIVED BONUS FLAG ***
        console.log(`  calculateGroupStats called for inventors [${inventorIndices.join(', ')}] with useBonus = ${useBonus}`);

        if (!inventorIndices || inventorIndices.length === 0 || categoryIndex < 0) return null;
        let skill = 0, cost = 0, time = 0;
        inventorIndices.forEach(index => {
            const inventor = inventorData[index];
            if (inventor) {
                skill += inventor[categoryIndex + 3] || 0;
                time += inventor[1] || 0;
                cost += inventor[2] || 0;
            }
        });
        // *** LOG SKILL CALCULATION ***
        const baseSkill = skill;
        const finalSkill = baseSkill + (useBonus ? 20 : 0);
        console.log(`    Base Skill: ${baseSkill}, Bonus Applied: ${useBonus ? '+20' : '+0'}, Final Skill: ${finalSkill}`);

        return { totalSkill: finalSkill, baseSkill: baseSkill, costMod: cost, timeMod: time, bonusUsed: useBonus };
    }

    function generateCombinations(arr, k) {
        if (k < 1 || k > arr.length) return [];
        if (k === arr.length) return [arr];
        if (k === 1) return arr.map(item => [item]);
        const combs = [];
        for (let i = 0; i < arr.length - k + 1; i++) {
            const head = arr.slice(i, i + 1);
            const tailCombs = generateCombinations(arr.slice(i + 1), k - 1);
            tailCombs.forEach(tail => combs.push(head.concat(tail))); // More efficient way to concat
        }
        return combs;
    }

    function findOptimalCrafters(categoryIndex, itemIndex, useBonus) {
        const item = inventionData[itemIndex];
        // Validate item and category match
        if (!item || item[1] !== categoryIndex) {
             throw new Error("Invalid item or category index provided to findOptimalCrafters.");
        }

        const difficulty = item[3]; // Get item's difficulty
        const requiredGroupIndex = item[4]; // Get the index for the specific group check

        // --- Get the specific required group for the item ---
         if (requiredGroupIndex === undefined || !inventorGroups || !inventorGroups[requiredGroupIndex]) {
             console.warn(`No inventor group defined or found for item index ${itemIndex} (group index ${requiredGroupIndex}). Cannot perform optimal check.`);
             return []; // Cannot proceed without a defined group to check against
         }
        const requiredInventorsInGroup = inventorGroups[requiredGroupIndex]; // e.g., [2] for Orichalcum
        console.log(`Finding optimal for: '${item[0]}', Difficulty: ${difficulty}, Category: ${categoryIndex}`);
        console.log(`Requires AT LEAST ONE inventor from Group ${requiredGroupIndex}: [${requiredInventorsInGroup.join(', ')}]`);


        // --- Find ALL inventors with the required skill type ---
        const allSkilledInventors = inventorData
            .map((inv, index) => ({ skill: inv[categoryIndex + 3] || 0, originalIndex: index }))
            .filter(invInfo => invInfo.skill > 0)
            .map(invInfo => invInfo.originalIndex);

        if (!allSkilledInventors || allSkilledInventors.length === 0) {
            console.warn(`No inventors found with skill > 0 for category index ${categoryIndex}.`);
            return [];
        }
        console.log(`Found ${allSkilledInventors.length} inventors with skill in this category.`);


        // --- Generate ALL combinations from the skilled pool ---
        const allCombinations = [];
        for (let k = 1; k <= 3; k++) {
            if (k <= allSkilledInventors.length) {
                const combinationsOfK = generateCombinations(allSkilledInventors, k);
                allCombinations.push(...combinationsOfK);
            }
        }
        console.log(`Generated ${allCombinations.length} total combinations from skilled pool.`);


        // --- Filter combinations & Calculate Stats ---
        const validResults = [];
        let checkedCount = 0;
        let groupRequirementMetCount = 0;

        allCombinations.forEach(combo => { // combo is an array like [13] or [13, 2] or [13, 2, 20]
            checkedCount++;

            // *** NEW CHECK: Does this combo include at least one required inventor? ***
            const meetsGroupRequirement = combo.some(inventorIndex => requiredInventorsInGroup.includes(inventorIndex));

            if (!meetsGroupRequirement) {
                // Optional log: console.log(`  Skipping Combo [${combo.join(', ')}]: Does not include any from required group [${requiredInventorsInGroup.join(', ')}]`);
                return; // Skip this combination if it doesn't meet the requirement
            }

            // If it meets the requirement, proceed with calculation
            groupRequirementMetCount++;
            const stats = calculateGroupStats(combo, categoryIndex, useBonus);
            if (stats) {
                const probability = stats.totalSkill - difficulty;
                // Optional Log: console.log(`  Checking Combo [${combo.join(', ')}] (Meets Req): Skill=${stats.totalSkill}, Prob=${probability}`);

                if (probability > 0) { // Only include possible successes
                    validResults.push({
                        inventors: combo, // The array of inventor indices
                        probability: probability,
                        totalSkill: stats.totalSkill,
                        costMod: stats.costMod,
                        timeMod: stats.timeMod,
                        bonusUsed: stats.bonusUsed
                    });
                }
            }
        });
        console.log(`Finished checking ${checkedCount} combinations.`);
        console.log(`${groupRequirementMetCount} combinations met the group requirement.`);
        console.log(`Found ${validResults.length} valid combinations with Prob > 0.`);

        return validResults; // Return the array of valid combinations and their stats
    }

    // --- Setup Event Listeners ---
    function setupEventListeners() {
        categorySelect.addEventListener('change', handleCategoryChange);
        bonusItemCheckbox.addEventListener('change', handleBonusItemChange);
        itemSelect.addEventListener('change', handleItemSelectionChange);
        creditsButton.addEventListener('click', toggleCredits);
        toggleExperimentalButton.addEventListener('click', handleToggleExperimental);
        optimalCategorySelect.addEventListener('change', handleOptimalCategoryChange);
        optimalItemSelect.addEventListener('change', handleOptimalItemChange);
        findOptimalButton.addEventListener('click', handleFindOptimal);
    }

    // --- Start ---
    initialize();
});