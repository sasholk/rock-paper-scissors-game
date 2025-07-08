import { useReducer, useCallback } from 'react';
import { GestureType, GameOutcome, GAME_CONFIG } from '../constants/gestures';
import { determineWinner } from '../utils/determineWinner';

// Define the game state type
export interface GameState {
  playerScore: number;
  computerScore: number;
  playerChoice: GestureType | null;
  computerChoice: GestureType | null;
  roundResult: GameOutcome | null;
  gameOver: boolean;
  roundInProgress: boolean;
}

// Define action types for the reducer
type GameAction =
  | { type: 'MAKE_CHOICE'; payload: { playerChoice: GestureType } }
  | { type: 'COMPLETE_ROUND' }
  | { type: 'RESET_GAME' };

// Initial state
const initialState: GameState = {
  playerScore: 0,
  computerScore: 0,
  playerChoice: null,
  computerChoice: null,
  roundResult: null,
  gameOver: false,
  roundInProgress: false,
};

/**
 * Computer choice generator - Injectable dependency for testability
 */
export interface ComputerChoiceGenerator {
  generate: () => GestureType;
}

/**
 * Default implementation that randomly selects a gesture
 */
export class RandomComputerChoiceGenerator implements ComputerChoiceGenerator {
  generate(): GestureType {
    const gestures = Object.values(GestureType);
    const randomIndex = Math.floor(Math.random() * gestures.length);
    return gestures[randomIndex];
  }
}

/**
 * Game reducer function to handle state transitions
 */
const gameReducer = (
  state: GameState,
  action: GameAction,
  computerChoiceGenerator: ComputerChoiceGenerator
): GameState => {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      // Player makes a choice, computer responds
      const playerChoice = action.payload.playerChoice;
      const computerChoice = computerChoiceGenerator.generate();
      const roundResult = determineWinner(playerChoice, computerChoice);
      
      // Update scores based on the result
      let playerScore = state.playerScore;
      let computerScore = state.computerScore;
      
      if (roundResult === GameOutcome.WIN) {
        playerScore += 1;
      } else if (roundResult === GameOutcome.LOSE) {
        computerScore += 1;
      }
      
      // Check if game is over (someone reached the winning score)
      const gameOver = 
        playerScore >= GAME_CONFIG.POINTS_TO_WIN || 
        computerScore >= GAME_CONFIG.POINTS_TO_WIN;
      
      return {
        ...state,
        playerChoice,
        computerChoice,
        roundResult,
        playerScore,
        computerScore,
        gameOver,
        roundInProgress: true,
      };
    }
    
    case 'COMPLETE_ROUND': {
      // Mark the round as completed while preserving the result
      return {
        ...state,
        roundInProgress: false,
      };
    }
    
    case 'RESET_GAME': {
      // Reset everything to initial state
      return initialState;
    }
    
    default:
      return state;
  }
};

/**
 * Custom hook that provides game logic functionality
 */
export const useGameLogic = (
  computerChoiceGenerator: ComputerChoiceGenerator = new RandomComputerChoiceGenerator()
) => {
  // Wrap the reducer to include our computerChoiceGenerator
  const wrappedReducer = (state: GameState, action: GameAction) => 
    gameReducer(state, action, computerChoiceGenerator);
  
  const [state, dispatch] = useReducer(wrappedReducer, initialState);
  
  // Handle player making a choice
  const makeChoice = useCallback((choice: GestureType) => {
    if (state.roundInProgress || state.gameOver) return;
    
    dispatch({ type: 'MAKE_CHOICE', payload: { playerChoice: choice } });
    
    // Complete the round after animation duration
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_ROUND' });
    }, GAME_CONFIG.ANIMATION_DURATION);
  }, [state.roundInProgress, state.gameOver]);
  
  // Reset the game
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);
  
  return {
    ...state,
    makeChoice,
    resetGame,
  };
};
