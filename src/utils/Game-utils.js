export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical lines
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }; // Return winner and winning line
    }
  }

  if (squares.every(Boolean)) {
    return { winner: 'Draw', line: null };
  }

  return { winner: null, line: null }; // No winner found
}
