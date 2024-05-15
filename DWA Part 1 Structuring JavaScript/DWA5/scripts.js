/**
 * A function that performs division operation on two numbers.
 * 
 * @param {Event} event - The submit event from the form.
 * 
 * @throws {Error} If both inputs are empty.
 * @throws {Error} If either of the numbers is less than or equal to 0.
 * @throws {Error} If either of the inputs is not a valid number.
 */
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (dividend === "" || divider === "") { 
    throw new Error("Division not performed. Both values are required in inputs. Try again");
  }
  if (divider <= 0) {
    throw new Error("Division not performed. Invalid number provided. Try again");
  }
  if (isNaN(dividend) || isNaN(divider)) {
    throw "Something critical went wrong. Please reload the page";
  }
  result.innerText = Math.floor(dividend / divider);
  }
  catch(error) {
        console.error(error);
        if (error instanceof Error) {
          result.innerText = error;
        } else {
          document.body.innerHTML = /* html */ `
          Something critical went wrong. Please reload the page
          `;
        }
  }
});