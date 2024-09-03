# Tenzies Game

Welcome to the **Tenzies Game**! This is a simple, fun dice game built with React. The goal is to roll the dice until all of them show the same number. You can hold the dice you want to keep while rolling the others until you win. Enjoy the game and see how quickly you can achieve victory!

## Table of Contents
- [Tenzies Game](#tenzies-game)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [How to Play](#how-to-play)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Features
- Roll 10 dice and hold the ones you want to keep.
- Continue rolling until all dice show the same number.
- Confetti animation when you win.
- Responsive design that works on different screen sizes.

## Getting Started

### Prerequisites
To run this project locally, you will need to have Node.js and npm (Node Package Manager) installed on your machine.

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: npm is installed automatically with Node.js.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jenique-Oosthuizen/tenzies-game.git
   cd tenzies-game
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000` to view the game.

## How to Play
1. When you start the game, you'll see 10 dice with random numbers.
2. Click on a dice to hold its value. Held dice will not change when you roll.
3. Click the "Roll" button to roll the unheld dice.
4. Continue rolling and holding until all 10 dice show the same number.
5. When all dice match, you'll win the game, and a confetti animation will celebrate your victory!
6. Click "Reset Game" to start over.

## Project Structure
```
tenzies-game/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Die.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **react-confetti**: A React library for adding confetti animations.
- **CSS**: Styling the application.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by various Tenzies games available online.
- Thanks to the React community for their amazing resources and support.