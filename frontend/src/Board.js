import React from "react";
import "./Board.css";

function Board({ size, board, current, onMove, finished }) {
  const isCurrent = (x, y) => current[0] === x && current[1] === y;

  const knightMoves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];

  const possible = (x, y) => {
    for (const [dx, dy] of knightMoves) {
      if (current[0] + dx === x && current[1] + dy === y && board[x][y] === 0)
        return true;
    }
    return false;
  };

  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}>
      {board.map((row, x) =>
        row.map((cell, y) => (
          <div
            key={`${x}-${y}`}
            className={`cell ${isCurrent(x, y) ? "current" : ""} ${possible(x, y) ? "possible" : ""}`}
            onClick={() => !finished && possible(x, y) && onMove([x, y])}
          >
            {cell !== 0 ? cell : isCurrent(x, y) ? "♞" : ""}
          </div>
        ))
      )}
    </div>
  );
}

export default Board;