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
  if (playerGesture === computerGesture) {
    return GameOutcome.DRAW;
  }

  if (GESTURE_RULES[playerGesture] === computerGesture) {
    return GameOutcome.WIN;
  }

  return GameOutcome.LOSE;
};
