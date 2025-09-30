import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './gameSlice.ts';
import { GAME_STATE_KEY } from '../utils/constants.ts';
import { ISavedGameState } from '../types/types.ts';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

// Персистентность игры
store.subscribe(() => {
  const s: ISavedGameState = store.getState().game;
  try {
    localStorage.setItem(
      GAME_STATE_KEY,
      JSON.stringify({
        history: s.history,
        currentMove: s.currentMove,
        lastMove: s.lastMove,
      })
    );
  } catch {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
