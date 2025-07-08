export const GestureType = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
} as const;

export const GameOutcome = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
} as const;

export type GestureType = typeof GestureType[keyof typeof GestureType];
export type GameOutcome = typeof GameOutcome[keyof typeof GameOutcome];

export const GAME_CONFIG = {
  POINTS_TO_WIN: 5,
  ANIMATION_DURATION: 500,
};

export const GESTURE_RULES: Record<GestureType, GestureType> = {
  [GestureType.ROCK]: GestureType.SCISSORS,
  [GestureType.PAPER]: GestureType.ROCK,
  [GestureType.SCISSORS]: GestureType.PAPER,
};

export const ALL_GESTURES = Object.values(GestureType);
