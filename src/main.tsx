import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/Theme-context.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <Provider store={store}>
          <h1 className={'title'}>Tic-tac-toe</h1>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
