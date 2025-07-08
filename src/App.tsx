import { useState, useEffect } from 'react';
import { GestureType, ALL_GESTURES, GameOutcome } from './constants/gestures';
import { useGameLogic } from './hooks/useGameLogic';
import ChoiceButton from './components/ChoiceButton';
import ScoreBoard from './components/ScoreBoard';
import ResultModal from './components/ResultModal';
import './App.css';

function App() {
  // Game state and logic from custom hook
  const {
    playerScore,
    computerScore,
    playerChoice,
    computerChoice,
    roundResult,
    gameOver,
    roundInProgress,
    makeChoice,
    resetGame,
  } = useGameLogic();

  // Track animations and display states
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // Update result message when round result changes
  useEffect(() => {
    if (roundResult) {
      let message = '';
      
      switch (roundResult) {
        case GameOutcome.WIN:
          message = 'You win this round!';
          break;
        case GameOutcome.LOSE:
          message = 'Computer wins this round!';
          break;
        case GameOutcome.DRAW:
          message = "It's a draw!";
          break;
      }
      
      setResultMessage(message);
      setShowResult(true);
      
      // Hide result message after a delay
      const timer = setTimeout(() => {
        setShowResult(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [roundResult]);

  return (
    <div className="app">
      <header className="header">
        <h1>Rock • Paper • Scissors</h1>
      </header>

      <main>
        <ScoreBoard 
          playerScore={playerScore} 
          computerScore={computerScore} 
        />
        
        <section className="game-area">
          {/* Player choices */}
          <div className="player-area">
            <h2>Your Choice</h2>
            <div className="choices-container">
              {ALL_GESTURES.map((gesture, index) => (
                <ChoiceButton
                  key={gesture}
                  gesture={gesture as GestureType}
                  selected={playerChoice === gesture}
                  disabled={roundInProgress || gameOver}
                  onClick={() => makeChoice(gesture as GestureType)}
                  aria-pressed={playerChoice === gesture}
                  animate={playerChoice === gesture}
                  animationDelay={index * 100}
                />
              ))}
            </div>
          </div>

          {/* Result display */}
          <div className={`result-display ${showResult ? 'visible' : ''}`} aria-live="polite">
            {resultMessage && (
              <p className="result-message">{resultMessage}</p>
            )}
          </div>

          {/* Computer choice */}
          <div className="computer-area">
            <h2>Computer's Choice</h2>
            <div className="choices-container">
              {computerChoice ? (
                <ChoiceButton
                  gesture={computerChoice}
                  selected
                  disabled
                  animate
                  shaking={roundResult === GameOutcome.LOSE}
                />
              ) : (
                <div className="computer-placeholder" aria-label="Computer has not chosen yet">
                  ?
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>First to 5 points wins the game</p>
      </footer>

      {/* Game over modal */}
      <ResultModal
        visible={gameOver}
        playerScore={playerScore}
        computerScore={computerScore}
        onRestart={resetGame}
      />
    </div>
  );
}

export default App;
