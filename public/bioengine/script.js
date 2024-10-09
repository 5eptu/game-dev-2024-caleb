document.addEventListener('DOMContentLoaded', () => {
    const dnaOutput = document.getElementById('dnaOutput');
    const simulationResult = document.getElementById('simulationResult');
    const scenarioSelect = document.getElementById('scenarioSelect');
    const growthChart = document.getElementById('growthChart').getContext('2d');

    let currentDNASequence = '';
    let growthData = [0];

    const organDNA = {
        heart: generateRandomDNA(250),
        liver: generateRandomDNA(250),
        kidney: generateRandomDNA(250),
    };

    function generateRandomDNA(length) {
        const nucleotides = 'ATCG';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += nucleotides.charAt(Math.floor(Math.random() * nucleotides.length));
        }
        return result;
    }

    function typeOutDNASequence(sequence) {
        const typingSpeed = 50; // Speed of typing effect in milliseconds
        let index = 0;
        dnaOutput.innerHTML = ''; // Clear previous output

        const type = () => {
            if (index < sequence.length) {
                dnaOutput.innerHTML += sequence.charAt(index++);
                setTimeout(type, typingSpeed);
            } else {
                updateDNADisplay(); // Update the display after typing
            }
        };

        type();
    }

    function updateDNADisplay() {
        const sequenceLength = currentDNASequence.length;
        dnaOutput.innerHTML = currentDNASequence;
    }

    function updateGrowthChart() {
        if (typeof window.growthChartInstance !== 'undefined') {
            window.growthChartInstance.destroy(); // Destroy previous instance to redraw
        }

        window.growthChartInstance = new Chart(growthChart, {
            type: 'line',
            data: {
                labels: Array.from({ length: growthData.length }, (_, i) => i + 1),
                datasets: [{
                    label: 'Organ Growth Over Time',
                    data: growthData,
                    borderColor: 'rgba(0, 77, 0, 1)',
                    backgroundColor: 'rgba(0, 77, 0, 0.2)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Growth Measurement',
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time (arbitrary units)',
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
            alert('Please enter a valid nucleotide (A, T, C, or G).');
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
