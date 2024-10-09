document.addEventListener('DOMContentLoaded', () => {
    const organDNA = {
        heart: 'ATCGTAGGCCATAGGCTAGC',
        liver: 'GCTAGCTAGCAGCTAGCATG',
        lungs: 'ATCGATCGTACGATGCTAGC',
        kidney: 'CTAGCTAGCTGATCGTAGC',
        brain: 'GATCGATCGATCGTAGCTA'
    };

    const dnaOutput = document.getElementById('dnaOutput');
    const currentDNA = document.getElementById('currentDNA');
    const scenarioSelect = document.getElementById('scenarioSelect');
    const simulationResult = document.getElementById('simulationResult');
    const growthChartCtx = document.getElementById('growthChart').getContext('2d');
    let currentDNASequence = ''; // To store modified DNA sequence

    // Function to type out the DNA sequence gradually
    function typeOutDNASequence(sequence) {
        let index = 0;
        const typingSpeed = 100; // Typing speed in milliseconds

        const typingInterval = setInterval(() => {
            if (index < sequence.length) {
                dnaOutput.innerHTML += sequence[index];
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);
    }

    // Update the displayed current DNA sequence
    function updateDNADisplay() {
        currentDNA.innerHTML = currentDNASequence || 'No DNA sequence selected.';
    }

    // Function to update the growth chart
    function updateGrowthChart(labels, data) {
        const growthChart = new Chart(growthChartCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Organ Growth Over Time',
                    data: data,
                    borderColor: '#007bff',
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Growth Percentage (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time (Days)'
                        }
                    }
                }
            }
        });
    }

    // Organ selection and growth simulation
    document.getElementById('organForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting
        const selectedOrgan = document.getElementById('organ').value;
        currentDNASequence = organDNA[selectedOrgan];
        dnaOutput.innerHTML = ''; // Clear previous output
        typeOutDNASequence(currentDNASequence); // Type out the DNA sequence
        updateGrowthChart([0, 1, 2, 3, 4, 5], [0, 10, 30, 50, 80, 100]); // Update growth chart
    });

    // Insert nucleotide functionality
    document.getElementById('insertButton').addEventListener('click', () => {
        const newNucleotide = document.getElementById('newNucleotide').value.toUpperCase();
        if (['A', 'T', 'C', 'G'].includes(newNucleotide) && newNucleotide.length === 1) {
            currentDNASequence += newNucleotide;
            updateDNADisplay();
        } else {
            alert('Please enter a valid nucleotide (A, T, C, or G).');
        }
    });

    // Delete nucleotide functionality
    document.getElementById('deleteButton').addEventListener('click', () => {
        currentDNASequence = currentDNASequence.slice(0, -1); // Remove the last character
        updateDNADisplay();
    });

    // Environmental change simulation
    document.getElementById('simulateButton').addEventListener('click', () => {
        const scenario = scenarioSelect.value;
        let message = '';

        switch (scenario) {
            case 'highTemperature':
                message = 'The organ is growing rapidly but may face heat stress!';
                break;
            case 'lowNutrients':
                message = 'The organ is struggling due to nutrient deficiency.';
                break;
            default:
                message = 'The organ is growing normally.';
                break;
        }

        simulationResult.innerText = message;
    });

    // Initial display update
    updateDNADisplay();
});
