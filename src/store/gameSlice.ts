import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateWinner } from '../utils/Game-utils';
import { ISavedGameState, IHistoryItem, TSquareValue } from '../types/types';
import { GAME_STATE_KEY } from '../utils/constants';
import { GAME_TIMER_KEY } from '../utils/constants';
import { getSmartMove } from '../utils/AI-utils';

const loadInitialState = (): ISavedGameState => {
  try {
    const raw = localStorage.getItem(GAME_STATE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ISavedGameState;
      return {
        history: parsed.history,
        currentMove: parsed.currentMove,
        lastMove: parsed.lastMove,
        isViewingHistory: false,
        isAIThinking: false,
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
    isViewingHistory: false,
    isAIThinking: false,
  };
};

const initialState: ISavedGameState = loadInitialState();

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Редьюсер для хода
    playMove(state, action: PayloadAction<number>) {
      const position: number = action.payload;
      const currentSquares = state.history[state.currentMove].squares;

      // проверка занятости/победителя/ИИ думает (защита инварианта)
      const { winner } = calculateWinner(currentSquares);
      if (currentSquares[position] || winner || state.isAIThinking) return;

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
      state.isViewingHistory = false; // Выходим из режима просмотра истории при новом ходе
    },
    // Редьюсер для перехода к определенной позиции в истории
    jumpTo(state, action: PayloadAction<number>) {
      const nextMove = action.payload;
      state.currentMove = nextMove;
      state.lastMove = state.history[nextMove].lastPosition;
      state.isViewingHistory = true; // Входим в режим просмотра истории
      state.isAIThinking = false; // Сбрасываем состояние ИИ при просмотре истории
    },
    // Редьюсер для сброса игры
    resetGame(state) {
      state.history = [{ squares: Array(9).fill(null) as TSquareValue[], lastPosition: null }];
      state.currentMove = 0;
      state.lastMove = null;
      state.isViewingHistory = false;
      state.isAIThinking = false;
      sessionStorage.removeItem(GAME_TIMER_KEY);
    },

    // Редьюсер для хода ИИ
    playAIMove(state) {
      const currentSquares = state.history[state.currentMove].squares;
      const { winner } = calculateWinner(currentSquares);

      if (winner) return;

      // ИИ всегда играет за "O"
      const aiMove = getSmartMove(currentSquares, 'O');

      if (aiMove !== -1 && typeof aiMove === 'number') {
        const nextSquares = currentSquares.slice();
        nextSquares[aiMove] = 'O';

        const nextHistory: IHistoryItem[] = [
          ...state.history.slice(0, state.currentMove + 1),
          { squares: nextSquares, lastPosition: aiMove ?? null },
        ];

        state.history = nextHistory;
        state.currentMove = nextHistory.length - 1;
        state.lastMove = aiMove;
      }
    },

    // Редьюсер для установки состояния "ИИ думает"
    setAIThinking(state, action: PayloadAction<boolean>) {
      state.isAIThinking = action.payload;
    },
  },
});

export const { playMove, jumpTo, resetGame, playAIMove, setAIThinking } = gameSlice.actions;
export default gameSlice.reducer;
