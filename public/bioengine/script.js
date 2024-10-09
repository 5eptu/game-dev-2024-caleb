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
    simulateGrowth(organ); // Simulate growth based on organ
});

// Function to insert a nucleotide
insertButton.addEventListener("click", () => {
    const newNucleotide = newNucleotideInput.value.toUpperCase();
    if (["A", "T", "C", "G"].includes(newNucleotide)) {
        dnaSequence += newNucleotide;
        updateDNAOutput();
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

    switch (scenario) {
        case "normal":
            result = "Normal growth conditions applied.";
            growthData.growthRate.push(1.0);
            break;
        case "highTemperature":
            result = "High temperature conditions applied, which may increase growth rate.";
            growthData.growthRate.push(1.5); // Higher growth rate
            break;
        case "lowNutrients":
            result = "Low nutrient conditions applied, which may decrease growth rate.";
            growthData.growthRate.push(0.5); // Lower growth rate
            break;
    }
    growthData.time.push(growthData.time.length + 1); // Increment time
    updateChart();
    simulationResult.innerText = result;
});

// Function to update the growth chart
function updateChart() {
    const ctx = growthChart.getContext("2d");
    const chartData = {
        labels: growthData.time,
        datasets: [{
            label: 'Growth Rate',
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
                    title: {
                        display: true,
                        text: 'Growth Rate'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
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
