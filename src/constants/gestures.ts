// Define the gesture types as const object
export const GestureType = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
} as const;

// Define the outcome of a round
export const GameOutcome = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
} as const;

// Create types from the object values
export type GestureType = typeof GestureType[keyof typeof GestureType];
export type GameOutcome = typeof GameOutcome[keyof typeof GameOutcome];

// Define game configuration constants
export const GAME_CONFIG = {
  POINTS_TO_WIN: 5,
  ANIMATION_DURATION: 500, // milliseconds
};

// Define gesture relationships (what beats what)
export const GESTURE_RULES: Record<GestureType, GestureType> = {
  [GestureType.ROCK]: GestureType.SCISSORS, // Rock beats scissors
  [GestureType.PAPER]: GestureType.ROCK, // Paper beats rock
  [GestureType.SCISSORS]: GestureType.PAPER, // Scissors beats paper
};

// Define all available gestures
export const ALL_GESTURES = Object.values(GestureType);
