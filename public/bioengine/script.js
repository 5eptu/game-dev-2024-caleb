// Wait until the DOM is fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {
    const organForm = document.getElementById('organForm');
    const organSelect = document.getElementById('organ');
    const dnaOutput = document.getElementById('dnaOutput');
    const growthVisualization = document.getElementById('growthVisualization');

    // DNA code sequences for each organ
    const organDNA = {
        heart: 'ATGCCGTACTAGCGTACGTAGCCGTAGTAGCGTACTGATCGTA',
        liver: 'ATGCGTACGTAGCTAGCGCGTACGTAGCCGTAGTAGCTAGCGT',
        lungs: 'ATGCTAGCGTAGCTACGATCGTACGTAGCCGTAGTACTAGCGT',
        kidney: 'ATGCGTAGCGTACTAGCGTACGCGTAGCTAGCTACGTACGTCG',
        brain: 'ATGCGTACTAGTAGCGTACGTACGTAGCTAGCTACGATCGTAC'
    };

    // Handle form submission
    organForm.addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent form from reloading the page

        // Get the selected organ from the dropdown
        const selectedOrgan = organSelect.value;

        // Check if an organ was selected
        if (selectedOrgan) {
            // Generate the corresponding DNA code for the selected organ
            const dnaSequence = organDNA[selectedOrgan];

            // Display the DNA sequence in the DNA output section
            dnaOutput.innerHTML = `
                <h4>DNA Sequence for ${capitalizeFirstLetter(selectedOrgan)}:</h4>
                <pre>${dnaSequence}</pre>
            `;

            // Display the growth visualization message
            growthVisualization.innerHTML = `
                <p>Simulating the growth of a ${capitalizeFirstLetter(selectedOrgan)}...</p>
            `;

            // Add a simple animation or additional feedback to enhance the experience
            animateGrowthVisualization();
        } else {
            // If no organ is selected, show a message asking the user to select one
            dnaOutput.innerHTML = `<p>Please select an organ to grow.</p>`;
        }
    });

    // Function to capitalize the first letter of the organ name
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Animation for growth visualization (simple pulse effect)
    function animateGrowthVisualization() {
        growthVisualization.style.transition = 'transform 0.5s ease';
        growthVisualization.style.transform = 'scale(1.1)';

        setTimeout(() => {
            growthVisualization.style.transform = 'scale(1)';
        }, 500);
    }
});
