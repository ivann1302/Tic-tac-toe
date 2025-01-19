// import { useState } from 'react'

import './App.css';
import { useState } from 'react';

// Функция, создающая клетку  для игры,принимает пропс значения
// обработчика клика на клетку
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
     {value}
    </button>
  )
}

// функция доски, принимающая пропсы следующего игрока
// площадей ходов и обработчика
 // eslint-disable-next-line react/prop-types
 function Board({xIsNext, squares, onPlay}) {
  
  // функция определяющая обработчик событий
  function handleClick(i) {
  // проверка занята ли клетка или уже есть победитель
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
  // создание копии массива, чтобы он не мутировался
    // eslint-disable-next-line react/prop-types
    const nextSquares = squares.slice();

  // определения игрока, который ходит
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

  // вызов функции, обновляющая состояние в родительском компоненте
    onPlay(nextSquares);

  }

  // вызов функции для определения победителя
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner " + winner;
  } else {
    status = "Next player " + (xIsNext ? 'X' : 'O');
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  }
  
// Разметка компонента
  return (
    <>
    <div className='status'>{status}</div>
    <div className='board-row'>
    {renderSquare(0)}
    {renderSquare(1)}
    {renderSquare(2)}
    </div>
    <div className='board-row'>
    {renderSquare(3)}
    {renderSquare(4)}
    {renderSquare(5)}
    </div>
    <div className='board-row'>
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
    </>
  )

    // Функция определенияnpm победителя (принимает массив клеток игрока)
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтальные линии
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикальные линии
        [0, 4, 8], [2, 4, 6],            // диагонали
      ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}

// Компонент управления состоянием с возможностью отслеживания истории
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // определение очередности хода
  const xIsNext = currentMove % 2 === 0;
  // текузее состояние игрового поля
  const currentSquares = history[currentMove];

  // обработчик события,отвечающий за обновление истории игры
  //  nextSquares - массив, представляющий игровое поле после хода
  function handlePlay(nextSquares) {
  // удаление ходов при перемотке игры назад
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  // обработчик события, отвечающий за перемотку к определенному ходу игры
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // обхявление кнопок с возможность перехода по истории ходов
  const moves = history.map((squares, move) => {
    let description;
    if (move === 0) {
      description = 'Go to game start';
    } else if (move === currentMove) {
      description = 'Current move';
    } else {
      description = 'Go to move #' + move;
    }
    return (
      <li key={move}>
      {description === 'Current move' ? ( <h3>Current move</h3> )
      : ( <button onClick ={()=> jumpTo(move)}>{description}</button>
      )}
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
    <div className='game-info'>
      <ol>{moves}</ol>
    </div>
    </div>
  );
}