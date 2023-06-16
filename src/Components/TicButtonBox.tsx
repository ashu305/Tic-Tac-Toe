import { Box, Button, styled } from "@mui/material";
import React from "react";
import TicButton from "./TicButton";
import TacButton from "./TacButton";

interface props {
  spacing: string[];
  onClick: (row: number, col: number) => void;
  row: number;
  col: number;
  turn: number;
  turnIndex: Number[][];
  winner: number | null;
}

const TicButtonBox: React.FC<props> = ({ spacing, onClick, row, col, turn, turnIndex, winner }) => {
  return (
    <Container sx={{ marginLeft: spacing }}>
      {turnIndex[row][col] === 0 || turnIndex == undefined ? (
        <TicButton />
      ) : turnIndex[row][col] === 1 ? (
        <TacButton />
      ) : (
        <Wrapper onClick={() => onClick(row, col)} disabled={winner != null} />
      )}
    </Container>
  );
};

export default TicButtonBox;

const Wrapper = styled(Button)({
  backgroundColor: "#8d8b8b",
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
  opacity: "0.25",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    opacity: "0.4",
    backgroundColor: "#8d8b8b",
  },
});

const Container = styled(Box)({
  width: ["10rem"],
  height: ["10rem"],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s ease-in-out",
});
