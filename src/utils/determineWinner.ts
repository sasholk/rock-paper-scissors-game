import { GameOutcome, GestureType, GESTURE_RULES } from '../constants/gestures';

/**
 * Determines the outcome of a round based on player and computer gestures
 * 
 * @param playerGesture - The gesture chosen by the player
 * @param computerGesture - The gesture chosen by the computer
 * @returns The outcome of the round from the player's perspective
 */
export const determineWinner = (
  playerGesture: GestureType,
  computerGesture: GestureType
): GameOutcome => {
  // If both choose the same gesture, it's a draw
  if (playerGesture === computerGesture) {
    return GameOutcome.DRAW;
  }
  
  // Check if player's gesture beats computer's gesture based on rules
  if (GESTURE_RULES[playerGesture] === computerGesture) {
    return GameOutcome.WIN;
  }
  
  // Otherwise, player loses
  return GameOutcome.LOSE;
};
