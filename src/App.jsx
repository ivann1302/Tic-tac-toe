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
// Разметка компонента
  return (
    <>
    <div className='status'>{status}</div>
    <div className='board-row'>
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className='board-row'>
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className='board-row'>
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </>
  )

    // Функция определения победителя (принимает массив клеток игрока)
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], // Верхняя горизонтальная линия
      [3, 4, 5], // Средняя горизонтальная линия
      [6, 7, 8], // Нижняя горизонтальная линия
      [0, 3, 6], // Левый вертикальный столбец
      [1, 4, 7], // Центральный вертикальный столбец
      [2, 5, 8], // Правый вертикальный столбец
      [0, 4, 8], // Левая диагональ
      [2, 4, 6]  // Правая диагональ
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