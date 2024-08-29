import React, { useEffect, useState } from "react";
import styles from "./game.module.css";
import rockImg from "../assets/rock.jpeg"; // Update with correct path
import paperImg from "../assets/paper.jpeg"; // Update with correct path
import scissorsImg from "../assets/scissors.jpeg"; // Update with correct path

const Game = () => {
  const [wins, setWins] = useState(() => {
    const savedWins = localStorage.getItem("wins");
    return savedWins !== null ? parseInt(savedWins, 10) : 0;
  });
  const [losses, setLosses] = useState(() => {
    const savedLosses = localStorage.getItem("losses");
    return savedLosses !== null ? parseInt(savedLosses, 10) : 0;
  });
  const [draws, setDraws] = useState(() => {
    const savedDraws = localStorage.getItem("draws");
    return savedDraws !== null ? parseInt(savedDraws, 10) : 0;
  });

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [explanation, setExplanation] = useState("");

  const choices = ["Rock", "Paper", "Scissors"];
  const choiceImages = {
    Rock: rockImg,
    Paper: paperImg,
    Scissors: scissorsImg,
  };
  useEffect(() => {
    console.log("Saving scores:", { wins, losses, draws });
    localStorage.setItem("wins", wins);
    localStorage.setItem("losses", losses);
    localStorage.setItem("draws", draws);
  }, [wins, losses, draws]);

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const computerSelection = generateComputerChoice();
    determineOutcome(choice, computerSelection);
  };

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    return randomChoice;
  };

  const determineOutcome = (player, computer) => {
    if (player === computer) {
      setResult("Draw");
      setExplanation(`${player} ties with ${computer}`);
      setDraws(draws + 1);
    } else if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      setResult("Win");
      setExplanation(`${player} beats ${computer}`);
      setWins(wins + 1);
    } else {
      setResult("Lose");
      setExplanation(`${computer} beats ${player}`);
      setLosses(losses + 1);
    }
  };

  const restartGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setExplanation("");
    setWins(0);
    setLosses(0);
    setDraws(0);
    localStorage.removeItem("wins");
    localStorage.removeItem("losses");
    localStorage.removeItem("draws");
  };

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.heading}>Rock paper Scissors</h2>
      <div className={styles.choiceContainer}>
        {choices.map((choice) => (
          <div key={choice} className={styles.choiceItem}>
            <h3 className={styles.choiceHeading}>{choice}</h3>
            <img
              src={choiceImages[choice]}
              alt={choice}
              className={styles.choiceImage}
              onClick={() => handlePlayerChoice(choice)}
            />
          </div>
        ))}
      </div>

      {playerChoice && (
        <div className={styles.choiceDisplay}>
          <img
            src={choiceImages[playerChoice]}
            alt={playerChoice}
            className={styles.choiceIcon}
          />
          <p>Your choice: {playerChoice}</p>
        </div>
      )}

      {computerChoice && (
        <div className={styles.choiceDisplay}>
          <img
            src={choiceImages[computerChoice]}
            alt={computerChoice}
            className={styles.choiceIcon}
          />
          <p>Computer's choice: {computerChoice}</p>
        </div>
      )}

      {result && (
        <div className={styles.result}>
          <p className={styles[`${result.toLowerCase()}Result`]}>{result}</p>
          <p className={styles.explanation}>{explanation}</p>
        </div>
      )}

      <div className={styles.scoreboard}>
        <h3 className={styles.scoreboardHeading}>Scoreboard</h3>
        <div className={styles.scoreboardItems}>
          <div className={styles.scoreboardItem}>
            <div>
              <p className={styles.scoreboardLabel}>Wins</p>
              <p className={styles.scoreboardValue}>{wins}</p>
            </div>
          </div>
          <div className={styles.scoreboardItem}>
            <p className={styles.scoreboardLabel}>Losses</p>
            <p className={styles.scoreboardValue}>{losses}</p>
          </div>
          <div className={styles.scoreboardItem}>
            <p className={styles.scoreboardLabel}>Draws</p>
            <p className={styles.scoreboardValue}>{draws}</p>
          </div>
        </div>
      </div>

      <button
        className={`${styles.button} ${styles.restartButton} ${styles.restartButtonHover}`}
        onClick={restartGame}
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game;
