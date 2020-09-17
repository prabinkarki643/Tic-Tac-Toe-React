import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square({ number,value, onClick }) {
  return (
    <button className="square" id={`square-${number}`} onClick={onClick}>
      {value}
    </button>
  );
}

function Restart({ onClick }) {

  return (
    <button className="restart" onClick={onClick}>
      PLAY AGAIN
    </button>
  );
}

function Game() {
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ isXNext, setIsXNext ] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWinner(squares);
  useEffect(() => {
    const timer = setInterval(() => {
      if(winner){
        var colorsText = document.querySelectorAll("#colorsText");
        for (let index = 0; index < colorsText.length; index++) {
          const element = colorsText[index];
          element.style.color =getRandomColor();
          element.style.fontSize='40px'
        }
      }
  
    }, 500);
    // Specify how to clean up after this effect:
    return function cleanup() {
      clearInterval(timer);
    };
  });
  function getStatus() {
    if (winner) {
      const [a, b, c] = winner.line;
      const aEle =  document.querySelector(`#square-${a}`)
      const bEle =  document.querySelector(`#square-${b}`)
      const cEle =  document.querySelector(`#square-${c}`)
      aEle.style.backgroundColor ='#00802b';
      bEle.style.backgroundColor ='#00802b';
      cEle.style.backgroundColor ='#00802b';
      return "Winner: " + winner.name;
    } else if (isBoardFull(squares)) {
      return "Draw!";
    } else {
      return "Next player: " + nextSymbol;
    }
  }

  function renderSquare(i) {
    return (
      <Square
        number={i}
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);

          setIsXNext(!isXNext); // toggle turns
        }}
      />
    );
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          var colorsText = document.querySelectorAll("#colorsText");
          for (let index = 0; index < colorsText.length; index++) {
            const element = colorsText[index];
            element.style.color ='black'
          }
          const [a, b, c] = winner.line;
          const aEle =  document.querySelector(`#square-${a}`)
          const bEle =  document.querySelector(`#square-${b}`)
          const cEle =  document.querySelector(`#square-${c}`)
          aEle.style.backgroundColor ='#7299a8';
          bEle.style.backgroundColor ='#7299a8';
          cEle.style.backgroundColor ='#7299a8';
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="game-info" id="colorsText">{getStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
 
      return {name:squares[a],line:possibleLines[i]}
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}