// Get references to DOM elements
const organForm = document.getElementById("organForm");
const organSelect = document.getElementById("organ");
const dnaOutput = document.getElementById("dnaOutput");
const insertButton = document.getElementById("insertButton");
const newNucleotideInput = document.getElementById("newNucleotide");
const deleteButton = document.getElementById("deleteButton");
const scenarioSelect = document.getElementById("scenarioSelect");
const simulateButton = document.getElementById("simulateButton");
const simulationResult = document.getElementById("simulationResult");
const growthChart = document.getElementById("growthChart");

// Variables for DNA sequence and chart data
let dnaSequence = "";
let growthData = {
    time: [],
    growthRate: [],
};

// Function to generate a random DNA sequence
function generateDNA(length) {
    const nucleotides = ["A", "T", "C", "G"];
    let sequence = "";
    for (let i = 0; i < length; i++) {
        sequence += nucleotides[Math.floor(Math.random() * nucleotides.length)];
    }
    return sequence;
}

// Function to update the DNA output
function updateDNAOutput() {
    dnaOutput.innerText = dnaSequence;
}

// Function to generate DNA sequence based on selected organ
organForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const organ = organSelect.value;
    const sequenceLength = 250; // Generate longer DNA sequence
    dnaSequence = generateDNA(sequenceLength);
    updateDNAOutput();
    resetGrowth(); // Reset growth data when generating a new organ
});

// Function to reset growth data
function resetGrowth() {
    growthData.time = [];
    growthData.growthRate = [];
    updateChart(); // Clear the chart
}

// Function to insert a nucleotide
insertButton.addEventListener("click", () => {
    const newNucleotide = newNucleotideInput.value.toUpperCase();
    if (["A", "T", "C", "G"].includes(newNucleotide)) {
        if (dnaSequence.length < 300) { // Limit length of the sequence
            dnaSequence += newNucleotide;
            updateDNAOutput();
        } else {
            alert("DNA sequence has reached its maximum length.");
        }
        newNucleotideInput.value = ""; // Clear input field
    } else {
        alert("Please enter a valid nucleotide (A, T, C, or G).");
    }
});

// Function to delete the last nucleotide
deleteButton.addEventListener("click", () => {
    dnaSequence = dnaSequence.slice(0, -1);
    updateDNAOutput();
});

// Function to simulate environmental changes
simulateButton.addEventListener("click", () => {
    const scenario = scenarioSelect.value;
    let result = "";
    let growthIncrement = 10; // Increment for normal growth
    let currentGrowthRate = growthData.growthRate.length > 0 ? growthData.growthRate[growthData.growthRate.length - 1] : 0;

    switch (scenario) {
        case "normal":
            result = "Normal growth conditions applied.";
            currentGrowthRate += growthIncrement;
            break;
        case "highTemperature":
            result = "High temperature conditions applied, which may increase growth rate.";
            currentGrowthRate += growthIncrement + 10; // Boost growth rate
            break;
        case "lowNutrients":
            result = "Low nutrient conditions applied, which may decrease growth rate.";
            currentGrowthRate = Math.max(currentGrowthRate - 20, 0); // Decrease growth rate
            break;
    }
    
    // Update growth data
    growthData.time.push(growthData.time.length + 1); // Increment time (days)
    growthData.growthRate.push(Math.min(currentGrowthRate, 100)); // Cap growth at 100%
    updateChart();
    simulationResult.innerText = result;
});

// Function to update the growth chart
function updateChart() {
    const ctx = growthChart.getContext("2d");
    const chartData = {
        labels: growthData.time.map(day => `${day} day${day > 1 ? 's' : ''}`), // Label as days
        datasets: [{
            label: 'Growth Rate (%)',
            data: growthData.growthRate,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    // Destroy existing chart if it exists
    if (growthChart.chart) {
        growthChart.chart.destroy();
    }

    // Create a new chart
    growthChart.chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100, // Set maximum to 100% for growth rate
                    title: {
                        display: true,
                        text: 'Growth Rate (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Days'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            }
        }
    });
}
