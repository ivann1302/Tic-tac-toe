import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Board from './components/app/App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <h1 className={'title'}>Tic-tac-toe</h1>
    <Board />
  </StrictMode>,
)
