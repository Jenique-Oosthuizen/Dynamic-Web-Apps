//---------------------CONST VALUES------------------------//
let count = 0;

const decreaseButton = document.getElementById('decreaseButton');
const increaseButton = document.getElementById('increaseButton');
const resetButton = document.getElementById('resetButton');
const countLabel = document.getElementById('countlabel');
const resetAlert = document.querySelector('.alert-closable');

//---------------------FUNCTIONS------------------------//

/**
 * Updates the count label to display the current count value.
 */
const updateCountLabel = () => {
  countLabel.textContent = count;
};

/**
 * Updates the state of the buttons based on the current count value.
 * Disables the decrease button if the count is 0.
 */
const updateButtons = () => {
  decreaseButton.disabled = count === 0;
};

/**
 * Increases the count by 1, updates the count label, and updates the button states.
 */
const increase = () => {
  count += 1;
  updateCountLabel();
  updateButtons();
};

/**
 * Decreases the count by 1, updates the count label, and updates the button states.
 * Ensures the count does not go below 0.
 */
const decrease = () => {
  if (count > 0) {
    count -= 1;
    updateCountLabel();
    updateButtons();
  }
};

/**
 * Resets the count to 0, updates the count label, updates the button states,
 * and shows the reset alert.
 */
const reset = () => {
  count = 0;
  updateCountLabel();
  updateButtons();
  showResetAlert();
};

/**
 * Shows the reset alert and ensures it is visible for a specified duration.
 */
const showResetAlert = () => {
  resetAlert.style.display = 'block';
  resetAlert.open = true; // Show the alert
};

// Event listener for hiding the alert after it has been closed
resetAlert.addEventListener('sl-after-hide', () => {
  setTimeout(() => {
    resetAlert.style.display = 'none';
  }, 2000);
});

//---------------------EVENT LISTENERS------------------------//

// Attach event listeners to buttons
increaseButton.addEventListener('click', increase);
decreaseButton.addEventListener('click', decrease);
resetButton.addEventListener('click', reset);

// Initial state setup
updateButtons();
//---------------------...ooo000 END OF FILE 000ooo...------------------------//