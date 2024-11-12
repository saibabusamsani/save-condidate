
const locationInput = document.getElementById('locationInput');
const dropdownOptions = document.getElementById('dropdownOptions');
const selectedItemsContainer = document.getElementById('selectedItems');
const clearBtn = document.getElementById('clearBtn');
const selectedLocations = new Set();

let highlightedIndex = -1;








// List of location options
const locations = [
  "New York", "Los Angeles", "Chicago", "Hyderabad","Mumbai"
];

// Generate dropdown options from the locations array
function generateDropdownOptions() {
  dropdownOptions.innerHTML = ''; // Clear existing options
  
  locations.forEach(location => {
    const option = document.createElement('div');
    option.textContent = location;
    option.onclick = () => selectOption(option);
    dropdownOptions.appendChild(option);
  });
}

// Call this function on page load to populate options
document.addEventListener('DOMContentLoaded', generateDropdownOptions);

function showDropdown() {
  dropdownOptions.style.display = 'block';
}

function filterOptions() {
  const filterText = locationInput.value.toLowerCase();
  dropdownOptions.style.display = filterText ? 'block' : 'none';
  const optionsList = Array.from(dropdownOptions.querySelectorAll('div'));

  optionsList.forEach(option => {
    const locationText = option.textContent.toLowerCase();
    option.style.display = locationText.includes(filterText) ? 'block' : 'none';
  });

  highlightedIndex = -1; // Reset highlight on new filter
}

function selectOption(option) {
  const location = option.textContent;
  if (!selectedLocations.has(location)) {
    addTag(location);
  }
  locationInput.value = '';
  dropdownOptions.style.display = 'none';
}

function addTag(location) {
  selectedLocations.add(location);

  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.textContent = location;

  const removeBtn = document.createElement('span');
  removeBtn.textContent = 'x';
  removeBtn.onclick = () => removeTag(location, tag);

  tag.appendChild(removeBtn);
  selectedItemsContainer.insertBefore(tag, locationInput);

  updateClearButtonVisibility();
}

function removeTag(location, tagElement) {
  selectedLocations.delete(location);
  selectedItemsContainer.removeChild(tagElement);
  updateClearButtonVisibility();
}

function handleKeyNavigation(event) {
  const optionsList = Array.from(dropdownOptions.querySelectorAll('div')).filter(option => option.style.display !== 'none');
  
  if (event.key === 'ArrowDown') {
    if (highlightedIndex < optionsList.length - 1) highlightedIndex++;
    highlightOption(optionsList);
  } else if (event.key === 'ArrowUp') {
    if (highlightedIndex > 0) highlightedIndex--;
    highlightOption(optionsList);
  } else if (event.key === 'Enter') {
    if (highlightedIndex >= 0 && highlightedIndex < optionsList.length) {
      selectOption(optionsList[highlightedIndex]);
    } else if (locationInput.value.trim()) {
      addTag(locationInput.value.trim());
      locationInput.value = '';
    }
    dropdownOptions.style.display = 'none';
  }
}

function highlightOption(optionsList) {
  optionsList.forEach(option => option.classList.remove('highlighted'));
  if (highlightedIndex >= 0 && highlightedIndex < optionsList.length) {
    optionsList[highlightedIndex].classList.add('highlighted');
  }
}

// Close dropdown if clicked outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.input-container')) {
    dropdownOptions.style.display = 'none';
  }
});

locationInput.addEventListener('focus', function() {
  if (locationInput.value) {
    dropdownOptions.style.display = 'block';
  }
});

// Function to clear all selected items
function clearSelectedItems() {
  selectedLocations.clear();
  selectedItemsContainer.querySelectorAll('.tag').forEach(tag => {
    selectedItemsContainer.removeChild(tag);
  });
  locationInput.value = '';
  updateClearButtonVisibility();
}

// Function to update the visibility of the clear button
function updateClearButtonVisibility() {
  if (selectedLocations.size >= 1) {
   
    clearBtn.style.display = 'inline-block';
  } else {
    clearBtn.style.display = 'none';
  }
}