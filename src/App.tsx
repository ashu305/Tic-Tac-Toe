import { styled, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "./Components/Grid";
import Fotter from "./Components/Fotter";

const App = () => {
  const [points, setPoints] = useState({ tic: 0, tac: 0, tie: 0 });
  const [restart, setRestart] = useState(false);
  const [turnIndex, setTurnIndex] = useState<Number[][]>(
    Array(3)
      .fill(0)
      .map((row) => new Array(3).fill(-1))
  );
  const [turn, setTurn] = useState(0); // 0 -> tic, 1 -> tac
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (restart) {
      resetGame();
    }
    setRestart(false);
  }, [restart]);

  const resetGame = () => {
    setTurnIndex(
      Array(3)
        .fill(0)
        .map((row) => new Array(3).fill(-1))
    );
    setTurn(0);
    setWinner(null);
  };

  return (
    <Wrapper>
      <div style={{ marginTop: "2rem" }}>
        <Grid
          points={points}
          setPoints={setPoints}
          restart={restart}
          setRestart={setRestart}
          turn={turn}
          setTurn={setTurn}
          turnIndex={turnIndex}
          setTurnIndex={setTurnIndex}
          winner={winner}
          setWinner={setWinner}
        />
      </div>
      <Fotter points={points} setRestart={setRestart} />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100vh",
  backgroundColor: "#474657",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
