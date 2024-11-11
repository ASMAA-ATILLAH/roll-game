import React from "react";
import './Jeux.css';

export default class Jeux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      face: null,
      compteurJoueur1: 0,
      compteurJoueur2: 0,
      fin: false,
      currentPlayer: 1, // Ensure the game always starts with Player 1
      hiddenFace: this.generateHiddenFace(), // Generate hidden face at start
    };
  }

  // Function to generate a random hidden face
  generateHiddenFace() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Method to roll the dice
  jouer() {
    // If the game is finished, prevent further rolls
    if (this.state.fin) return;

    const valeur = Math.floor(Math.random() * 6) + 1; // Generate a random value between 1 and 6
    const player = this.state.currentPlayer;
    const isWin = valeur === this.state.hiddenFace; // Check if the roll matches the hidden face

    if (isWin) {
      // If the current player wins, update state to reflect the win and end the game
      this.setState({
        face: valeur,
        fin: true, // Mark game as finished
        [player === 1 ? 'compteurJoueur1' : 'compteurJoueur2']: this.state[player === 1 ? 'compteurJoueur1' : 'compteurJoueur2'] + 1,
      });
      return; // Stop any further updates since the game is won
    }

    // If the roll doesn't match, increment the attempt count and switch players
    this.setState((prevState) => ({
      face: valeur,
      [player === 1 ? 'compteurJoueur1' : 'compteurJoueur2']: prevState[player === 1 ? 'compteurJoueur1' : 'compteurJoueur2'] + 1,
      currentPlayer: player === 1 ? 2 : 1, // Switch to the other player
    }));
  }

  getImage() {
    return this.state.face ? `images/face${this.state.face}.png` : "images/Dé.PNG";
  }

  initialiser() {
    // Reset game and generate a new hidden face
    this.setState({
      face: null,
      compteurJoueur1: 0,
      compteurJoueur2: 0,
      fin: false,
      currentPlayer: 1, // Reset to start with Player 1
      hiddenFace: this.generateHiddenFace(), // Re-generate hidden face
    });
  }

  render() {
    return (
      <div className="game-container">
        {/* Introduction Section */}
        <div className="introduction">
          <h2>Welcome to Dice Duel! 🎲</h2>
          <p>
            In this 1v1 showdown, each player takes turns rolling a dice to find
            the <strong>hidden face</strong>! The hidden face is a secret number, known only to the game.
            Your mission is to uncover it. The player who rolls the hidden face first wins the game!
          </p>
          <h3>How to Play:</h3>
          <ul>
            <li><strong>Roll the Dice:</strong> Each player takes turns clicking the <em>Roll Dice</em> button to roll a virtual dice, generating a random number between 1 and 6.</li>
            <li><strong>Keep Track of Attempts:</strong> Your total attempts are counted, so aim to find the hidden face in as few tries as possible.</li>
            <li><strong>Victory:</strong> If the dice lands on the hidden face during your turn, you win! A victory message will announce your success.</li>
          </ul>
          <p><em>Are you ready to out-roll your opponent and uncover the hidden face? Let the Dice Duel begin!</em> 🎉</p>
        </div>

        {/* Game Layout */}
        <div className="combat-container">
          <div className={`player-card ${this.state.currentPlayer === 1 ? "active" : ""} ${this.state.fin && this.state.currentPlayer === 1 ? "winner" : ""}`}>
            <h2>Player 1</h2>
            <p>Attempts: {this.state.compteurJoueur1}</p>
            <p>Face: {this.state.face && this.state.currentPlayer === 1 ? this.state.face : "?"}</p>
          </div>

          {/* Dice Image */}
          <div className="dice-container">
            <img src={this.getImage()} className="dice" alt="Dice face" />
          </div>

          <div className={`player-card ${this.state.currentPlayer === 2 ? "active" : ""} ${this.state.fin && this.state.currentPlayer === 2 ? "winner" : ""}`}>
            <h2>Player 2</h2>
            <p>Attempts: {this.state.compteurJoueur2}</p>
            <p>Face: {this.state.face && this.state.currentPlayer === 2 ? this.state.face : "?"}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <p>{!this.state.fin && `Current Turn: Player ${this.state.currentPlayer}`}</p>
          <button onClick={() => this.jouer()} disabled={this.state.fin} className="play-button">
            Roll Dice
          </button>
          {this.state.fin && (
            <p className="win-message">
              Congratulations, Player {this.state.currentPlayer} found the hidden face ({this.state.hiddenFace}) in {this.state.currentPlayer === 1 ? this.state.compteurJoueur1 : this.state.compteurJoueur2} attempts!
            </p>
          )}
          <button onClick={() => this.initialiser()} className="reset-button">
            Reset Game
          </button>
        </div>
      </div>
    );
  }
}
