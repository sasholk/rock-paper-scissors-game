import { describe, it, expect } from 'vitest';
import { determineWinner } from '../utils/determineWinner';
import { GestureType, GameOutcome } from '../constants/gestures';

describe('determineWinner', () => {
  it('should return DRAW when both players choose the same gesture', () => {
    expect(determineWinner(GestureType.ROCK, GestureType.ROCK)).toBe(GameOutcome.DRAW);
    expect(determineWinner(GestureType.PAPER, GestureType.PAPER)).toBe(GameOutcome.DRAW);
    expect(determineWinner(GestureType.SCISSORS, GestureType.SCISSORS)).toBe(GameOutcome.DRAW);
  });

  it('should return WIN when player beats computer', () => {
    expect(determineWinner(GestureType.ROCK, GestureType.SCISSORS)).toBe(GameOutcome.WIN);
    expect(determineWinner(GestureType.PAPER, GestureType.ROCK)).toBe(GameOutcome.WIN);
    expect(determineWinner(GestureType.SCISSORS, GestureType.PAPER)).toBe(GameOutcome.WIN);
  });

  it('should return LOSE when computer beats player', () => {
    expect(determineWinner(GestureType.ROCK, GestureType.PAPER)).toBe(GameOutcome.LOSE);
    expect(determineWinner(GestureType.PAPER, GestureType.SCISSORS)).toBe(GameOutcome.LOSE);
    expect(determineWinner(GestureType.SCISSORS, GestureType.ROCK)).toBe(GameOutcome.LOSE);
  });
});
