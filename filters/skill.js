const skillInput = document.getElementById('skillInput');
    const skillDropdownOptions = document.getElementById('skilldropdownOptions');
    const selectedSkillItemsContainer = document.getElementById('selectedSkillItems');
    const skillClearBtn = document.getElementById('skillClearBtn');
    const selectedSkills = new Set();
    let skillHighlightedIndex = -1;

    // List of skill options
    const skills = ["Java", "Python", "JavaScript", "React", "Angular", "Node.js", "SQL", "CSS", "HTML", "Vue.js"];

    // Generate dropdown options from the skills array
    function generateSkillDropdownOptions() {
        skillDropdownOptions.innerHTML = ''; // Clear existing options

        skills.forEach(skill => {
            const option = document.createElement('div');
            option.textContent = skill;
            option.onclick = () => selectSkillOption(option);
            skillDropdownOptions.appendChild(option);
        });
    }

    // Call this function on page load to populate skill options
    document.addEventListener('DOMContentLoaded', generateSkillDropdownOptions);

    function showSkillDropdown() {
        skillDropdownOptions.style.display = 'block';
    }

    function filterSkillOptions() {
        const filterText = skillInput.value.toLowerCase();
        skillDropdownOptions.style.display = filterText ? 'block' : 'none';
        const optionsList = Array.from(skillDropdownOptions.querySelectorAll('div'));

        optionsList.forEach(option => {
            const skillText = option.textContent.toLowerCase();
            option.style.display = skillText.includes(filterText) ? 'block' : 'none';
        });

        skillHighlightedIndex = -1; // Reset highlight on new filter
    }

    function selectSkillOption(option) {
        const skill = option.textContent;
        if (!selectedSkills.has(skill)) {
            addSkillTag(skill);
        }
        skillInput.value = '';
        skillDropdownOptions.style.display = 'none';
    }

    function addSkillTag(skill) {
        selectedSkills.add(skill);

        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = skill;

        const removeBtn = document.createElement('span');
        removeBtn.textContent = 'x';
        removeBtn.onclick = () => removeSkillTag(skill, tag);

        tag.appendChild(removeBtn);
        selectedSkillItemsContainer.insertBefore(tag, skillInput);

        updateSkillClearButtonVisibility();
    }

    function removeSkillTag(skill, tagElement) {
        selectedSkills.delete(skill);
        selectedSkillItemsContainer.removeChild(tagElement);
        updateSkillClearButtonVisibility();
    }

    function handleSkillKeyNavigation(event) {
        const optionsList = Array.from(skillDropdownOptions.querySelectorAll('div')).filter(option => option.style.display !== 'none');
        
        if (event.key === 'ArrowDown') {
            if (skillHighlightedIndex < optionsList.length - 1) skillHighlightedIndex++;
            highlightSkillOption(optionsList);
        } else if (event.key === 'ArrowUp') {
            if (skillHighlightedIndex > 0) skillHighlightedIndex--;
            highlightSkillOption(optionsList);
        } else if (event.key === 'Enter') {
            if (skillHighlightedIndex >= 0 && skillHighlightedIndex < optionsList.length) {
                selectSkillOption(optionsList[skillHighlightedIndex]);
            } else if (skillInput.value.trim()) {
                addSkillTag(skillInput.value.trim());
                skillInput.value = '';
            }
            skillDropdownOptions.style.display = 'none';
        }
    }

    function highlightSkillOption(optionsList) {
        optionsList.forEach(option => option.classList.remove('highlighted'));
        if (skillHighlightedIndex >= 0 && skillHighlightedIndex < optionsList.length) {
            optionsList[skillHighlightedIndex].classList.add('highlighted');
        }
    }

    // Close dropdown if clicked outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.input-container')) {
            skillDropdownOptions.style.display = 'none';
        }
    });

    skillInput.addEventListener('focus', function() {
        if (skillInput.value) {
            skillDropdownOptions.style.display = 'block';
        }
    });

    // Function to clear all selected skill items
    function clearSelectedSkillItems() {
        selectedSkills.clear();
        selectedSkillItemsContainer.querySelectorAll('.tag').forEach(tag => {
            selectedSkillItemsContainer.removeChild(tag);
        });
        skillInput.value = '';
        updateSkillClearButtonVisibility();
    }

    // Function to update the visibility of the clear button for skills
    function updateSkillClearButtonVisibility() {
        skillClearBtn.style.display = selectedSkills.size > 0 ? 'inline-block' : 'none';
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.input-container')) {
          dropdownOptions.style.display = 'none';
        }
      });