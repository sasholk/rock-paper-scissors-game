import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from '../hooks/useGameLogic';
import type { ComputerChoiceGenerator } from '../hooks/useGameLogic';
import { GameOutcome, GestureType } from '../constants/gestures';

class MockComputerChoiceGenerator implements ComputerChoiceGenerator {
  private choice: GestureType;

  constructor(choice: GestureType) {
    this.choice = choice;
  }

  generate(): GestureType {
    return this.choice;
  }
}

describe('useGameLogic', () => {
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useGameLogic());
    
    expect(result.current.playerScore).toBe(0);
    expect(result.current.computerScore).toBe(0);
    expect(result.current.playerChoice).toBeNull();
    expect(result.current.computerChoice).toBeNull();
    expect(result.current.roundResult).toBeNull();
    expect(result.current.gameOver).toBe(false);
    expect(result.current.roundInProgress).toBe(false);
  });

  it('should process player win correctly', () => {
    const mockGenerator = new MockComputerChoiceGenerator(GestureType.SCISSORS);
    const { result } = renderHook(() => useGameLogic(mockGenerator));
    
    act(() => {
      result.current.makeChoice(GestureType.ROCK);
    });
    
    expect(result.current.playerChoice).toBe(GestureType.ROCK);
    expect(result.current.computerChoice).toBe(GestureType.SCISSORS);
    expect(result.current.roundResult).toBe(GameOutcome.WIN);
    expect(result.current.playerScore).toBe(1);
    expect(result.current.computerScore).toBe(0);
    expect(result.current.roundInProgress).toBe(true);
  });

  it('should process player loss correctly', () => {
    const mockGenerator = new MockComputerChoiceGenerator(GestureType.PAPER);
    const { result } = renderHook(() => useGameLogic(mockGenerator));
    
    act(() => {
      result.current.makeChoice(GestureType.ROCK);
    });
    
    expect(result.current.playerChoice).toBe(GestureType.ROCK);
    expect(result.current.computerChoice).toBe(GestureType.PAPER);
    expect(result.current.roundResult).toBe(GameOutcome.LOSE);
    expect(result.current.playerScore).toBe(0);
    expect(result.current.computerScore).toBe(1);
    expect(result.current.roundInProgress).toBe(true);
  });

  it('should process draw correctly', () => {
    const mockGenerator = new MockComputerChoiceGenerator(GestureType.ROCK);
    const { result } = renderHook(() => useGameLogic(mockGenerator));
    
    act(() => {
      result.current.makeChoice(GestureType.ROCK);
    });
    
    expect(result.current.playerChoice).toBe(GestureType.ROCK);
    expect(result.current.computerChoice).toBe(GestureType.ROCK);
    expect(result.current.roundResult).toBe(GameOutcome.DRAW);
    expect(result.current.playerScore).toBe(0);
    expect(result.current.computerScore).toBe(0);
    expect(result.current.roundInProgress).toBe(true);
  });

  it('should complete round after animation duration', async () => {
    vi.useFakeTimers();
    
    const mockGenerator = new MockComputerChoiceGenerator(GestureType.SCISSORS);
    const { result } = renderHook(() => useGameLogic(mockGenerator));
    
    act(() => {
      result.current.makeChoice(GestureType.ROCK);
    });
    
    expect(result.current.roundInProgress).toBe(true);
    
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    expect(result.current.roundInProgress).toBe(false);
    
    vi.useRealTimers();
  });

  it('should reset game state when resetGame is called', () => {
    const mockGenerator = new MockComputerChoiceGenerator(GestureType.SCISSORS);
    const { result } = renderHook(() => useGameLogic(mockGenerator));
    
    act(() => {
      result.current.makeChoice(GestureType.ROCK);
    });
    
    expect(result.current.playerScore).toBe(1);
    
    act(() => {
      result.current.resetGame();
    });
    
    expect(result.current.playerScore).toBe(0);
    expect(result.current.computerScore).toBe(0);
    expect(result.current.playerChoice).toBeNull();
    expect(result.current.computerChoice).toBeNull();
    expect(result.current.roundResult).toBeNull();
    expect(result.current.gameOver).toBe(false);
    expect(result.current.roundInProgress).toBe(false);
  });
});
