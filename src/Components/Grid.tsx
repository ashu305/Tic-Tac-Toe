import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Separator from "./Separator";
import TicButtonBox from "./TicButtonBox";

interface props {
  points: { tic: number; tac: number; tie: number };
  setPoints: (points: { tic: number; tac: number; tie: number }) => void;
  restart: boolean;
  setRestart: (restart: boolean) => void;
  turnIndex: Number[][];
  setTurnIndex: (turnIndex: Number[][]) => void;
  turn: number;
  setTurn: (turn: number) => void;
  winner: number | null;
  setWinner: (winner: number | null) => void;
}

const Grid: React.FC<props> = ({
  points,
  setPoints,
  restart,
  setRestart,
  turn,
  turnIndex,
  setTurn,
  setTurnIndex,
  winner,
  setWinner,
}) => {
  const checkWinner = (): number => {
    let tie = true;
    // Check rows
    for (let row of turnIndex) {
      if (
        row.filter((value) => value === 0).length === 3 ||
        row.filter((value) => value === 1).length === 3
      ) {
        return turn;
      }
      if (row.includes(-1)) {
        tie = false;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        (turnIndex[0][col] === 0 && turnIndex[1][col] === 0 && turnIndex[2][col] === 0) ||
        (turnIndex[0][col] === 1 && turnIndex[1][col] === 1 && turnIndex[2][col] === 1)
      ) {
        return turn;
      }
      if (turnIndex[col].includes(-1)) {
        tie = false;
      }
    }

    // Check diagonals
    if (
      (turnIndex[0][0] === 0 && turnIndex[1][1] === 0 && turnIndex[2][2] === 0) ||
      (turnIndex[0][0] === 1 && turnIndex[1][1] === 1 && turnIndex[2][2] === 1)
    ) {
      return turn;
    }

    if (
      (turnIndex[0][2] === 0 && turnIndex[1][1] === 0 && turnIndex[2][0] === 0) ||
      (turnIndex[0][2] === 1 && turnIndex[1][1] === 1 && turnIndex[2][0] === 1)
    ) {
      return turn;
    }

    return tie ? -1 : -2;
  };

  const handelButtonClick = (row: number, col: number) => {
    console.log(turnIndex);
    if (turn === 0) {
      turnIndex[row][col] = 0;
    } else {
      turnIndex[row][col] = 1;
    }
    let winner = checkWinner();

    if (winner !== -2) {
      setWinner(turn);
      if (winner === -1) {
        setPoints({ ...points, tie: points.tie + 1 });
      } else if (winner === 0) {
        setPoints({ ...points, tic: points.tic + 1 });
      } else if (winner === 1) {
        setPoints({ ...points, tac: points.tac + 1 });
      }
    }
    setTurnIndex(turnIndex);
    setTurn(turn === 1 ? 0 : 1);
  };

  const GenerateGrid = () => {
    let grid = [];
    for (let i = 0; i < 3; i++) {
      grid.push(
        <GridRow key={i}>
          <TicButtonBox
            onClick={handelButtonClick}
            spacing={["0px"]}
            row={i}
            col={0}
            turn={turn}
            turnIndex={turnIndex}
            winner={winner}
          />
          <TicButtonBox
            onClick={handelButtonClick}
            row={i}
            col={1}
            spacing={["3rem"]}
            turn={turn}
            turnIndex={turnIndex}
            winner={winner}
          />
          <TicButtonBox
            onClick={handelButtonClick}
            row={i}
            col={2}
            spacing={["3rem"]}
            turn={turn}
            winner={winner}
            turnIndex={turnIndex}
          />
        </GridRow>
      );
    }
    return grid;
  };

  return (
    <GridRapper sx={{ width: ["40rem"], height: ["40rem"] }}>
      {GenerateGrid()}
      <Separator
        width={["0.3rem"]}
        height={["36rem"]}
        marginleft={["11.3rem"]}
        marginTop={["0px"]}
      />
      <Separator
        width={["36rem"]}
        height={["0.3rem"]}
        marginTop={["11.3rem"]}
        marginleft={["0px"]}
      />
      <Separator
        width={["0.3rem"]}
        height={["36rem"]}
        marginleft={["24.3rem"]}
        marginTop={["0px"]}
      />
      <Separator
        width={["36rem"]}
        height={["0.3rem"]}
        marginTop={["24.3rem"]}
        marginleft={["0px"]}
      />
    </GridRapper>
  );
};

export default Grid;

const GridRapper = styled(Box)({
  backgroundColor: "#FAFAFA",
  borderRadius: "1rem",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
});

const GridRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  marginBottom: "3rem",
});
