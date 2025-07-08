import { useEffect, useState } from 'react';
import type { FC } from 'react';
import styles from './styles.module.scss';

interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
  showAnimation?: boolean;
}

const ScoreBoard: FC<ScoreBoardProps> = ({
  playerScore,
  computerScore,
  showAnimation = true,
}) => {
  const [lastPlayerScore, setLastPlayerScore] = useState(playerScore);
  const [lastComputerScore, setLastComputerScore] = useState(computerScore);
  const [playerScoreChanged, setPlayerScoreChanged] = useState(false);
  const [computerScoreChanged, setComputerScoreChanged] = useState(false);

  useEffect(() => {
    if (playerScore !== lastPlayerScore) {
      setLastPlayerScore(playerScore);
      if (showAnimation) {
        setPlayerScoreChanged(true);
        setTimeout(() => setPlayerScoreChanged(false), 1000);
      }
    }
  }, [playerScore, lastPlayerScore, showAnimation]);

  useEffect(() => {
    if (computerScore !== lastComputerScore) {
      setLastComputerScore(computerScore);
      if (showAnimation) {
        setComputerScoreChanged(true);
        setTimeout(() => setComputerScoreChanged(false), 1000);
      }
    }
  }, [computerScore, lastComputerScore, showAnimation]);

  return (
    <div className={styles.scoreBoard} data-testid="scoreboard">
      <div className={styles.scoreItem}>
        <div className={styles.scoreLabel}>You</div>
        <div 
          className={`${styles.scoreValue} ${playerScoreChanged ? styles.highlight : ''}`}
          data-testid="player-score"
        >
          {playerScore}
        </div>
      </div>
      
      <div className={styles.scoreDivider}>:</div>
      
      <div className={styles.scoreItem}>
        <div className={styles.scoreLabel}>Computer</div>
        <div 
          className={`${styles.scoreValue} ${computerScoreChanged ? styles.highlight : ''}`}
          data-testid="computer-score"
        >
          {computerScore}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
