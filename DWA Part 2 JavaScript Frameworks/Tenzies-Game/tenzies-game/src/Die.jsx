/**
 * Die component representing an individual die in the Tenzies game.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.value - The value of the die (1-6).
 * @param {boolean} props.isHeld - Whether the die is currently held.
 * @param {function} props.holdDice - Function to hold the die when clicked.
 * @returns {JSX.Element} A div element representing a die.
 */
export default function Die({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die-face" onClick={holdDice} style={styles}>
      <h2 className="die-num">{value}</h2>
    </div>
  );
}