const countryInput = document.getElementById('countryInput');
const countryDropdownOptions = document.getElementById('countryDropdownOptions');
const selectedCountryItemsContainer = document.getElementById('selectedCountryItems');
const countryClearBtn = document.getElementById('countryClearBtn');
const selectedCountries = new Set();
let countryHighlightedIndex = -1;

// List of countries
const countries = [
    "United States", "India", "Australia", "Canada", "United Kingdom",
    "Germany", "France", "Brazil", "Japan", "South Korea", "Italy", "Spain",
    "Mexico", "Russia", "China", "South Africa", "Argentina", "Saudi Arabia",
    "Egypt", "Nigeria", "Thailand"
];

function generateCountryDropdownOptions() {
    countryDropdownOptions.innerHTML = '';
    countries.forEach(country => {
        const option = document.createElement('div');
        option.textContent = country;
        option.onclick = () => selectCountryOption(option);
        countryDropdownOptions.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', generateCountryDropdownOptions);

function showCountryDropdown() {
    countryDropdownOptions.style.display = 'block';
}

function filterCountryOptions() {
    const filterText = countryInput.value.toLowerCase();
    countryDropdownOptions.style.display = filterText ? 'block' : 'none';
    const optionsList = Array.from(countryDropdownOptions.querySelectorAll('div'));

    optionsList.forEach(option => {
        const countryText = option.textContent.toLowerCase();
        option.style.display = countryText.includes(filterText) ? 'block' : 'none';
    });

    countryHighlightedIndex = -1;
}

function selectCountryOption(option) {
    const country = option.textContent;
    if (!selectedCountries.has(country)) {
        addCountryTag(country);
    }
    countryInput.value = '';
    countryDropdownOptions.style.display = 'none';
}

function addCountryTag(country) {
    selectedCountries.add(country);

    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = country;

    const removeBtn = document.createElement('span');
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => removeCountryTag(country, tag);

    tag.appendChild(removeBtn);
    selectedCountryItemsContainer.insertBefore(tag, countryInput);

    updateCountryClearButtonVisibility();
}

function removeCountryTag(country, tagElement) {
    selectedCountries.delete(country);
    selectedCountryItemsContainer.removeChild(tagElement);
    updateCountryClearButtonVisibility();
}

function handleCountryKeyNavigation(event) {
    const optionsList = Array.from(countryDropdownOptions.querySelectorAll('div')).filter(option => option.style.display !== 'none');
    
    if (event.key === 'ArrowDown') {
        if (countryHighlightedIndex < optionsList.length - 1) countryHighlightedIndex++;
        highlightCountryOption(optionsList, countryHighlightedIndex);
    } else if (event.key === 'ArrowUp') {
        if (countryHighlightedIndex > 0) countryHighlightedIndex--;
        highlightCountryOption(optionsList, countryHighlightedIndex);
    } else if (event.key === 'Enter') {
        if (countryHighlightedIndex >= 0 && countryHighlightedIndex < optionsList.length) {
            selectCountryOption(optionsList[countryHighlightedIndex]);
        } else if (countryInput.value.trim()) {
            addCountryTag(countryInput.value.trim());
            countryInput.value = '';
        }
        countryDropdownOptions.style.display = 'none';
    }
}

function highlightCountryOption(optionsList, index) {
    optionsList.forEach(option => option.classList.remove('highlighted'));
    if (index >= 0 && index < optionsList.length) {
        optionsList[index].classList.add('highlighted');
    }
}

function updateCountryClearButtonVisibility() {
    countryClearBtn.style.display = selectedCountries.size > 0 ? 'inline-block' : 'none';
}

function clearSelectedCountryItems() {
    selectedCountries.clear();
    selectedCountryItemsContainer.querySelectorAll('.tag').forEach(tag => {
        selectedCountryItemsContainer.removeChild(tag);
    });
    countryInput.value = '';
    updateCountryClearButtonVisibility();
}

document.addEventListener('click', function(event) {
    if (!event.target.closest('.input-container')) {
      countryDropdownOptions.style.display = 'none';
    }
});