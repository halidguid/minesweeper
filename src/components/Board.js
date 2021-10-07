import React, { useState, useEffect } from "react";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";
import Modal from "./Modal";


const Board = () => {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
const [counter, setCounter] = useState(10);
  const [showWin, setShowWin] = useState(false);
  const [winCounter, setWinCounter] = useState(54);
  
  useEffect(() => {
    freshBoard();
  }, []);

  const freshBoard = () => {
    const newBoard = createBoard(8, 8, 10);
    setNonMineCount(54);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
  };

  // resetuje poziva fresh
  const restartGame = () => {
    freshBoard();
    setCounter(10)
    setGameOver(false);
    setShowWin(false)
  };

  // na desni klik ovo stavlja zastavicu
  const updateFlag = (e, x, y) => {
    //if (mineCount===0) return
    e.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(grid));
    console.log(newGrid[x][y]);
    newGrid[x][y].flagged = !newGrid[x][y].flagged;
    if (newGrid[x][y].flagged  &&  counter >= 1) {

      setCounter(counter-1)
      
    
     } else if (!newGrid[x][y].flagged  &&  counter <= 9) {
    
      setCounter(counter+1)
     }else {
       return;
     }
    setGrid(newGrid);
}
  

  

  // na lijevi klik ovo otkriva polje
  const revealCell = (x, y) => {
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));

    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }

      setGrid(newGrid);

      setGameOver(true);
      revealAll()
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      checkWin(newRevealedBoard.newNonMinesCount)
      //if (newRevealedBoard.newNonMinesCount === 0) {
      //  setGameOver(true);
      //  revealAll()

        
    //  }
    }
    
  };

  const checkWin=(count) => {
    console.log(count)
    if (count === 0) {
      setShowWin(true)
    }
  }

const revealAll=() => { 
  let newGrid = JSON.parse(JSON.stringify(grid));
  for (var i=0; i<grid.length;i++) {
    for (var j=0; j<grid[i].length;j++) {

      newGrid[i][j].revealed=true;
    }
  }
  setGrid(newGrid)
}
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {counter}
        
        {gameOver && <Modal restartGame={restartGame} title="game over" />}
        {showWin && <Modal restartGame={restartGame} title="pobjeda" />}
    
        {grid.map((singleRow, index1) => {
          return (
            
            
            <div style={{ display: "flex" }} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
