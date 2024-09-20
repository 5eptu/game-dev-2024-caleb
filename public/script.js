document.addEventListener("DOMContentLoaded", function () {
  const logos = document.querySelectorAll(".logo-container");

  logos.forEach((logo) => {
    const explanation = logo.querySelector(".explanation");

    // Mouse enter event to show explanation
    logo.addEventListener("mouseenter", function () {
      explanation.style.display = "block";
      explanation.style.opacity = "1";

      // Start typing effect
      startTypingEffect(explanation);
    });

    // Mouse leave event to hide explanation
    logo.addEventListener("mouseleave", function () {
      explanation.style.opacity = "0";
      explanation.style.display = "none";
    });
  });

  // Typing effect function
  function startTypingEffect(explanation) {
    const explanationText = explanation.getAttribute("data-explanation");
    let index = 0;
    const speed = 50; // Speed of typing

    explanation.innerHTML = ""; // Clear previous text

    function typeWriter() {
      if (index < explanationText.length) {
        explanation.innerHTML += explanationText.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter(); // Start typing
  }
});

