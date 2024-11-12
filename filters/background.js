const educationInput = document.getElementById('educationInput');
const educationDropdownOptions = document.getElementById('educationDropdownOptions');
const selectedEducationItemsContainer = document.getElementById('selectedEducationItems');
const educationClearBtn = document.getElementById('educationClearBtn');
const selectedEducation = new Set();
let educationHighlightedIndex = -1;

const educationOptions = ["Btech", "Mtech", "MBA", "BBA", "PhD"];

function generateEducationDropdownOptions() {
    educationDropdownOptions.innerHTML = '';
    educationOptions.forEach(education => {
        const option = document.createElement('div');
        option.textContent = education;
        option.onclick = () => selectEducationOption(option);
        educationDropdownOptions.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', generateEducationDropdownOptions);

function showEducationDropdown() {
    educationDropdownOptions.style.display = 'block';
}

function filterEducationOptions() {
    const filterText = educationInput.value.toLowerCase();
    educationDropdownOptions.style.display = filterText ? 'block' : 'none';
    const optionsList = Array.from(educationDropdownOptions.querySelectorAll('div'));

    optionsList.forEach(option => {
        const educationText = option.textContent.toLowerCase();
        option.style.display = educationText.includes(filterText) ? 'block' : 'none';
    });

    educationHighlightedIndex = -1;
}

function selectEducationOption(option) {
    const education = option.textContent;
    if (!selectedEducation.has(education)) {
        addEducationTag(education);
    }
    educationInput.value = '';
    educationDropdownOptions.style.display = 'none';
}

function addEducationTag(education) {
    selectedEducation.add(education);

    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = education;

    const removeBtn = document.createElement('span');
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => removeEducationTag(education, tag);

    tag.appendChild(removeBtn);
    selectedEducationItemsContainer.insertBefore(tag, educationInput);

    updateEducationClearButtonVisibility();
}

function removeEducationTag(education, tagElement) {
    selectedEducation.delete(education);
    selectedEducationItemsContainer.removeChild(tagElement);
    updateEducationClearButtonVisibility();
}

function handleEducationKeyNavigation(event) {
    const optionsList = Array.from(educationDropdownOptions.querySelectorAll('div')).filter(option => option.style.display !== 'none');
    
    if (event.key === 'ArrowDown') {
        if (educationHighlightedIndex < optionsList.length - 1) educationHighlightedIndex++;
        highlightOption(optionsList, educationHighlightedIndex);
    } else if (event.key === 'ArrowUp') {
        if (educationHighlightedIndex > 0) educationHighlightedIndex--;
        highlightOption(optionsList, educationHighlightedIndex);
    } else if (event.key === 'Enter') {
        if (educationHighlightedIndex >= 0 && educationHighlightedIndex < optionsList.length) {
            selectEducationOption(optionsList[educationHighlightedIndex]);
        } else if (educationInput.value.trim()) {
            addEducationTag(educationInput.value.trim());
            educationInput.value = '';
        }
        educationDropdownOptions.style.display = 'none';
    }
}

function highlightOption(optionsList, index) {
    optionsList.forEach(option => option.classList.remove('highlighted'));
    if (index >= 0 && index < optionsList.length) {
        optionsList[index].classList.add('highlighted');
    }
}

function updateEducationClearButtonVisibility() {
    educationClearBtn.style.display = selectedEducation.size > 0 ? 'inline-block' : 'none';
}

function clearSelectedEducationItems() {
    selectedEducation.clear();
    selectedEducationItemsContainer.querySelectorAll('.tag').forEach(tag => {
        selectedEducationItemsContainer.removeChild(tag);
    });
    educationInput.value = '';
    updateEducationClearButtonVisibility();
}

document.addEventListener('click', function(event) {
    if (!event.target.closest('.input-container')) {
    educationDropdownOptions.style.display = 'none';
    }
  });