import { ButtonManager } from './buttonManager.js';

document.addEventListener("DOMContentLoaded", () => {

  const buttonManager = new ButtonManager();

  const buttons = document.querySelectorAll('button');
  // Loop through each button
    buttons.forEach(button => {
      // Check if button id is not "toggleButton" and not "scrollButton"
      if (button.id !== "toggleButton" && button.id !== "scrollButton") {
        // Add event listener
        button.addEventListener('click', () => {
          buttonManager.handleButtonClick(button);
        });
      } else if (button.id === "scrollButton") {
        // Add specific event listener for "scrollButton"
        button.addEventListener('click', function() {
          window.scrollBy({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
          });
        });
      }
    });
});
