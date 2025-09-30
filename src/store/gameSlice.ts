import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateWinner } from '../utils/Game-utils';
import { ISavedGameState, IHistoryItem, TSquareValue } from '../types/types';
import { GAME_STATE_KEY } from '../utils/constants';

const loadInitialState = (): ISavedGameState => {
  try {
    const raw = localStorage.getItem(GAME_STATE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ISavedGameState;
      return {
        history: parsed.history,
        currentMove: parsed.currentMove,
        lastMove: parsed.lastMove,
      };
    }
  } catch (e) {
    console.error('Error parsing saved game state', e);
  }
  return {
    history: [
      {
        squares: Array(9).fill(null) as TSquareValue[],
        lastPosition: null,
      },
    ],
    currentMove: 0,
    lastMove: null,
  };
};

const initialState: ISavedGameState = loadInitialState();

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    playMove(state, action: PayloadAction<number>) {
      const position: number = action.payload;
      const currentSquares = state.history[state.currentMove].squares;

      // проверка занятости/победителя (защита инварианта)
      const { winner } = calculateWinner(currentSquares);
      if (currentSquares[position] || winner) return;

      const xIsNext = state.currentMove % 2 === 0;
      const nextSquares = currentSquares.slice();
      nextSquares[position] = xIsNext ? 'X' : 'O';

      const nextHistory: IHistoryItem[] = [
        ...state.history.slice(0, state.currentMove + 1),
        { squares: nextSquares, lastPosition: position },
      ];

      state.history = nextHistory;
      state.currentMove = nextHistory.length - 1;
      state.lastMove = position;
    },
    jumpTo(state, action: PayloadAction<number>) {
      const nextMove = action.payload;
      state.currentMove = nextMove;
      state.lastMove = state.history[nextMove].lastPosition;
    },
    resetGame(state) {
      state.history = [{ squares: Array(9).fill(null) as TSquareValue[], lastPosition: null }];
      state.currentMove = 0;
      state.lastMove = null;
    },
  },
});

export const { playMove, jumpTo, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
