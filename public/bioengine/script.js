document.addEventListener('DOMContentLoaded', () => {
    const organDNA = {
        heart: 'ATCGTACGGTAGCTAGTAGCTAGTCGTACGTACGTAGCTAGTCGATCGATCGTAGCTAGCTAGCTAGTCGTACGTACG',
        liver: 'GCTAGCTAGCAGCTAGCATGGATCAGTAGCTAGCATCGTAGCTAGCTAGGCTAGCTAGCTAGCTAGCATCGTACGTAGCTAG',
        lungs: 'ATCGATCGTACGATGCTAGCGTAGTCGATGCTAGCTAGCTAGCTAGTAGCTAGTCGTAGCTAGCTAGTACGTACGATCGTAGC',
        kidney: 'CTAGCTAGCTGATCGTAGCATCGTAGCTAGTACGTCGTAGCTAGTACGAGCTAGTACGAGCTAGTACGATCGTAGCTAGTCG',
        brain: 'GATCGATCGATCGTAGCTAGTCGTACGTACGTACGTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGTACG'
    };

    const dnaOutput = document.getElementById('dnaOutput');
    const currentDNA = document.getElementById('currentDNA');
    const scenarioSelect = document.getElementById('scenarioSelect');
    const simulationResult = document.getElementById('simulationResult');
    const growthChartCtx = document.getElementById('growthChart').getContext('2d');
    let currentDNASequence = ''; // To store modified DNA sequence
    let growthData = [0, 10, 30, 50, 80, 100]; // Default growth data

    // Function to type out the DNA sequence gradually
    function typeOutDNASequence(sequence) {
        let index = 0;
        const typingSpeed = 50; // Typing speed in milliseconds

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
    function updateGrowthChart() {
        growthChartCtx.clearRect(0, 0, growthChartCtx.canvas.width, growthChartCtx.canvas.height);
        const labels = Array.from({ length: growthData.length }, (_, i) => i * 2); // Simulating days
        const growthChart = new Chart(growthChartCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Organ Growth Over Time',
                    data: growthData,
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

    // Handle organ selection and DNA sequence generation
    document.getElementById('organForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission
        const organ = document.getElementById('organ').value;
        currentDNASequence = organDNA[organ];
        dnaOutput.innerHTML = ''; // Clear previous output
        typeOutDNASequence(currentDNASequence); // Type out new sequence
        updateDNADisplay();
        updateGrowthChart(); // Update chart when new organ is selected
    });

    // Insert nucleotide into the current DNA sequence
    document.getElementById('insertButton').addEventListener('click', () => {
        const newNucleotide = document.getElementById('newNucleotide').value.toUpperCase();
        if ('ATCG'.includes(newNucleotide) && currentDNASequence) {
            currentDNASequence += newNucleotide; // Append new nucleotide
            updateDNADisplay(); // Update displayed DNA sequence
            growthData.push(growthData[growthData.length - 1] + 10); // Simulate growth increase
            updateGrowthChart(); // Update growth chart
            document.getElementById('newNucleotide').value = ''; // Clear input field
        } else {
            alert('Please enter a valid nucleotide (A, T, C, G).');
        }
    });

    // Delete the last nucleotide from the current DNA sequence
    document.getElementById('deleteButton').addEventListener('click', () => {
        if (currentDNASequence) {
            currentDNASequence = currentDNASequence.slice(0, -1); // Remove last nucleotide
            updateDNADisplay(); // Update displayed DNA sequence
            growthData.push(growthData[growthData.length - 1] - 10); // Simulate growth decrease
            updateGrowthChart(); // Update growth chart
        }
    });

    // Simulate environmental changes
    document.getElementById('simulateButton').addEventListener('click', () => {
        const scenario = scenarioSelect.value;
        let resultText = '';

        switch (scenario) {
            case 'normal':
                resultText = 'The organ is growing optimally.';
                growthData = [0, 10, 30, 50, 80, 100]; // Normal growth
                break;
            case 'highTemperature':
                resultText = 'High temperatures are causing stress to the organ growth.';
                growthData = [0, 5, 15, 30, 40, 60]; // Reduced growth
                break;
            case 'lowNutrients':
                resultText = 'Low nutrient availability is hindering organ growth.';
                growthData = [0, 5, 10, 20, 30, 40]; // Very slow growth
                break;
            default:
                resultText = 'Select a scenario to simulate.';
        }

        simulationResult.innerHTML = resultText; // Display simulation result
        updateGrowthChart(); // Update chart based on the scenario
    });
    
    // Initial chart setup
    updateGrowthChart();
});
