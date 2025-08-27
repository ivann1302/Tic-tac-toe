import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Game from './components/app/App';
import { GameProvider } from './context/Game-context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
      <h1 className={'title'}>Tic-tac-toe</h1>
      <Game />
    </GameProvider>
  </StrictMode>
);