import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { GAME_CONFIG } from '../../constants/gestures';
import styles from './styles.module.css';

interface ResultModalProps {
  visible: boolean;
  playerScore: number;
  computerScore: number;
  onRestart: () => void;
}

/**
 * Modal component shown when the game ends
 * Displays final score and winner
 */
const ResultModal: FC<ResultModalProps> = ({
  visible,
  playerScore,
  computerScore,
  onRestart,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the replay button when modal becomes visible
  useEffect(() => {
    if (visible && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [visible]);

  // Determine if the player has won
  const playerWon = playerScore >= GAME_CONFIG.POINTS_TO_WIN;
  const resultClass = playerWon ? styles.win : styles.lose;

  return (
    <div 
      className={`${styles.modalOverlay} ${visible ? styles.visible : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-result-title"
      data-testid="result-modal"
    >
      <div className={`${styles.modalContent} ${resultClass}`}>
        <h2 id="game-result-title" className={styles.modalTitle}>
          {playerWon ? 'You Win!' : 'Computer Wins!'}
        </h2>
        
        <p className={styles.modalMessage}>
          {playerWon 
            ? 'Congratulations! You beat the computer.' 
            : 'Better luck next time!'}
        </p>
        
        <div className={styles.modalScore} aria-label="Final score">
          {playerScore} - {computerScore}
        </div>
        
        <button
          ref={buttonRef}
          className={styles.replayButton}
          onClick={onRestart}
          data-testid="replay-button"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
