import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GameProvider } from './context/Game-context';
import { ThemeProvider } from './context/Theme-context.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <GameProvider>
          <h1 className={'title'}>Tic-tac-toe</h1>
          <App />
        </GameProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
