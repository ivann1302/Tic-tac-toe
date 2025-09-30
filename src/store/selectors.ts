import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { calculateWinner } from '../utils/Game-utils';

export const selectGame = (s: RootState) => s.game;
export const selectHistory = (s: RootState) => s.game.history;
export const selectCurrentMove = (s: RootState) => s.game.currentMove;
export const selectLastMove = (s: RootState) => s.game.lastMove;

export const selectCurrentSquares = createSelector(
  [selectHistory, selectCurrentMove],
  (history, currentMove) => history[currentMove].squares
);

export const selectXIsNext = createSelector(
  [selectCurrentMove],
  currentMove => currentMove % 2 === 0
);

export const selectWinnerAndLine = createSelector([selectCurrentSquares], currentSquares =>
  calculateWinner(currentSquares)
);
