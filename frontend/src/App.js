import React, { useState } from "react";
import Board from "./Board";
import SizeSelector from "./SizeSelector";

function App() {
  const [size, setSize] = useState(null);
  const [game, setGame] = useState(null);

  const startGame = (selectedSize) => {
    fetch("http://localhost:4000/api/new-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ size: selectedSize }),
    })
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
        setSize(selectedSize);
      });
  };

  const handleMove = (to) => {
    fetch("http://localhost:4000/api/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        board: game.board,
        size: size,
        from: game.position,
        to,
        moveCount: game.moveCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => setGame({ ...game, ...data }))
      .catch(() => alert("Mutare invalidă!"));
  };

  const restart = () => {
    setGame(null);
    setSize(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Knight's Tour Game</h1>
      {!game && <SizeSelector onSelect={startGame} />}
      {game && (
        <>
          <Board
            size={size}
            board={game.board}
            current={game.position}
            onMove={handleMove}
            finished={game.finished}
          />
          <div style={{ margin: 20 }}>
            {game.finished &&
              (game.win ? (
                <span style={{ color: "green" }}>Felicitări! Ai terminat jocul!</span>
              ) : (
                <span style={{ color: "red" }}>Nu mai poți muta! Joc terminat.</span>
              ))}
          </div>
          <button onClick={restart}>Restart</button>
        </>
      )}
    </div>
  );
}

export default App;