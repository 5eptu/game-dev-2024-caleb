// Define the organ DNA blueprint
const organDNA = {
    "heart": "ATGCGTAGCTA... (Heart DNA Sequence)",
    "liver": "CGTAGCTAGAC... (Liver DNA Sequence)",
    "lungs": "GTAGCTAGTCG... (Lungs DNA Sequence)",
    "kidney": "TAGCTAGTACG... (Kidney DNA Sequence)",
    "brain": "CGTATCGTACG... (Brain DNA Sequence)"
};

// Function to simulate cell growth and output DNA code
function growOrgan(event) {
    event.preventDefault();  // Prevent form from reloading the page

    // Get organ type from the form
    const organType = document.getElementById("organ").value;
    const dnaOutput = document.getElementById("dnaOutput");
    const growthVisualization = document.getElementById("growthVisualization");
    
    // Clear previous output
    dnaOutput.innerHTML = "";
    growthVisualization.innerHTML = "";

    // Check if a valid organ is selected
    if (organType in organDNA) {
        const organDNASequence = organDNA[organType];

        // Simulate DNA code generation and display it
        const dnaTitle = document.createElement("h4");
        dnaTitle.innerText = `Generated DNA Code for ${organType}:`;
        const dnaPre = document.createElement("pre");
        dnaPre.innerText = organDNASequence;
        
        dnaOutput.appendChild(dnaTitle);
        dnaOutput.appendChild(dnaPre);

        // Simulate growth visualization
        const growthParagraph = document.createElement("p");
        growthParagraph.innerText = `The cells are growing into a ${organType}... Please wait.`;
        growthVisualization.appendChild(growthParagraph);

        // Simulate some delay for the growth process (for a realistic feel)
        setTimeout(() => {
            growthParagraph.innerText = `${organType.charAt(0).toUpperCase() + organType.slice(1)} growth complete!`;
        }, 3000);  // 3-second delay to simulate growth
    } else {
        // Error handling: If no organ is selected
        const errorParagraph = document.createElement("p");
        errorParagraph.innerText = "Please select a valid organ to grow.";
        dnaOutput.appendChild(errorParagraph);
    }
}

// Attach event listener to the form submission
const organForm = document.getElementById("organForm");
organForm.addEventListener("submit", growOrgan);
