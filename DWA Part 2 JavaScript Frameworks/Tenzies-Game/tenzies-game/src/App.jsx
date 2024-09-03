import React from 'react'
import Die from './Die';
import Confetti from 'react-confetti';
import './App.css'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  /**
   * Generates an array of 10 new dice objects with random values between 1 and 6.
   * Each die has a unique id and is initially not held.
   * @returns {Array} Array of dice objects.
   */
  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: i,
      });
    }
    return newArray;
  }

  /**
   * Toggles the `isHeld` property of a die given its ID.
   * @param {number} id - The ID of the die to hold.
   */
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }  
  
  /**
   * Rolls the dice that are not held. If the game is won (`tenzies` is true), it resets the game.
   */
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }
  
  /**
   * useEffect hook that checks if all dice are held and have the same value. 
   * If so, sets the `tenzies` state to true.
   */
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);  

  return (
    <div className="main-app">
      {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "Reset Game" : "Roll"}
      </button>
    </div>
  );  
}

export default App