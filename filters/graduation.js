const yearInput = document.getElementById('yearInput');
const yearDropdownOptions = document.getElementById('yearDropdownOptions');
const selectedYearItemsContainer = document.getElementById('selectedYearItems');
const yearClearBtn = document.getElementById('yearClearBtn');
const selectedYears = new Set();
let yearHighlightedIndex = -1;

const graduationYears = ["2024", "2023", "2021", "Below 2020"];

function generateYearDropdownOptions() {
    yearDropdownOptions.innerHTML = '';
    graduationYears.forEach(year => {
        const option = document.createElement('div');
        option.textContent = year;
        option.onclick = () => selectYearOption(option);
        yearDropdownOptions.appendChild(option);
    });
}



document.addEventListener('DOMContentLoaded', generateYearDropdownOptions);

function showYearDropdown() {
    yearDropdownOptions.style.display = 'block';
}

function filterYearOptions() {
    const filterText = yearInput.value.toLowerCase();
    yearDropdownOptions.style.display = filterText ? 'block' : 'none';
    const optionsList = Array.from(yearDropdownOptions.querySelectorAll('div'));

    optionsList.forEach(option => {
        const yearText = option.textContent.toLowerCase();
        option.style.display = yearText.includes(filterText) ? 'block' : 'none';
    });

    yearHighlightedIndex = -1;
}

function selectYearOption(option) {
    const year = option.textContent;
    if (!selectedYears.has(year)) {
        addYearTag(year);
    }
    yearInput.value = '';
    yearDropdownOptions.style.display = 'none';
}

function addYearTag(year) {
    selectedYears.add(year);

    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = year;

    const removeBtn = document.createElement('span');
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => removeYearTag(year, tag);

    tag.appendChild(removeBtn);
    selectedYearItemsContainer.insertBefore(tag, yearInput);

    updateYearClearButtonVisibility();
}

function removeYearTag(year, tagElement) {
    selectedYears.delete(year);
    selectedYearItemsContainer.removeChild(tagElement);
    updateYearClearButtonVisibility();
}

function handleYearKeyNavigation(event) {
    const optionsList = Array.from(yearDropdownOptions.querySelectorAll('div')).filter(option => option.style.display !== 'none');
    
    if (event.key === 'ArrowDown') {
        if (yearHighlightedIndex < optionsList.length - 1) yearHighlightedIndex++;
        highlightYearOption(optionsList, yearHighlightedIndex);
    } else if (event.key === 'ArrowUp') {
        if (yearHighlightedIndex > 0) yearHighlightedIndex--;
        highlightYearOption(optionsList, yearHighlightedIndex);
    } else if (event.key === 'Enter') {
        if (yearHighlightedIndex >= 0 && yearHighlightedIndex < optionsList.length) {
            selectYearOption(optionsList[yearHighlightedIndex]);
        } else if (yearInput.value.trim()) {
            addYearTag(yearInput.value.trim());
            yearInput.value = '';
        }
        yearDropdownOptions.style.display = 'none';
    }
}

function highlightYearOption(optionsList, index) {
    optionsList.forEach(option => option.classList.remove('highlighted'));
    if (index >= 0 && index < optionsList.length) {
        optionsList[index].classList.add('highlighted');
    }
}

function updateYearClearButtonVisibility() {
    yearClearBtn.style.display = selectedYears.size > 0 ? 'inline-block' : 'none';
}

function clearSelectedYearItems() {
    selectedYears.clear();
    selectedYearItemsContainer.querySelectorAll('.tag').forEach(tag => {
        selectedYearItemsContainer.removeChild(tag);
    });
    yearInput.value = '';
    updateYearClearButtonVisibility();
}


document.addEventListener('click', function(event) {
    if (!event.target.closest('.input-container')) {
      yearDropdownOptions.style.display = 'none';
    }
  });