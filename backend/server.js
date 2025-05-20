const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

function isValidMove(board, size, from, to) {
  const [fx, fy] = from;
  const [tx, ty] = to;
  const dx = Math.abs(fx - tx);
  const dy = Math.abs(fy - ty);
  if (tx < 0 || tx >= size || ty < 0 || ty >= size) return false;
  if (board[tx][ty] !== 0) return false;
  return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
}

function getPossibleMoves(board, size, current) {
  const moves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];
  const [x, y] = current;
  return moves
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) =>
      nx >= 0 && nx < size && ny >= 0 && ny < size && board[nx][ny] === 0
    );
}

app.post('/api/new-game', (req, res) => {
  const { size } = req.body;
  const board = Array.from({ length: size }, () => Array(size).fill(0));
  // Calul începe din colțul stânga sus
  board[0][0] = 1;
  res.json({
    board,
    position: [0, 0],
    moveCount: 1
  });
});

app.post('/api/move', (req, res) => {
  const { board, size, from, to, moveCount } = req.body;
  if (!isValidMove(board, size, from, to)) {
    return res.status(400).json({ error: "Mutare invalidă" });
  }
  const newBoard = board.map(row => row.slice());
  newBoard[to[0]][to[1]] = moveCount + 1;
  const possibleMoves = getPossibleMoves(newBoard, size, to);
  const finished = possibleMoves.length === 0 || moveCount + 1 === size * size;
  res.json({
    board: newBoard,
    position: to,
    moveCount: moveCount + 1,
    possibleMoves,
    finished,
    win: moveCount + 1 === size * size
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});