import { styled, Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "./Components/Grid";
import Fotter from "./Components/Fotter";

const Difficulties = [
  {
    value: 1,
    label: "Very Easy",
  },
  {
    value: 2,
    label: "Easy",
  },
  {
    value: 3,
    label: "Medium",
  },
  {
    value: 4,
    label: "Hard",
  },
];

const App = () => {
  const [points, setPoints] = useState({ tic: 0, tac: 0, tie: 0 });
  const [restart, setRestart] = useState(false);
  const [turnIndex, setTurnIndex] = useState<Number[][]>(
    Array(3)
      .fill(0)
      .map((row) => new Array(3).fill(-1))
  );
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState<number | null>(null);
  const [mode, setMode] = useState(1);
  const [difficulty, setDifficulty] = useState(3);

  useEffect(() => {
    console.log(difficulty);
  }, [difficulty]);

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
  const preventHorizontalKeyboardNavigation = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  };

  const valueLabelFormat = (value: number) => {
    return Difficulties.findIndex((mark) => mark.value === value) + 1;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#474657",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Wrapper
        sx={{
          marginLeft: ["27rem"],
        }}
      >
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
            mode={mode}
            setMode={setMode}
          />
        </div>
        <Fotter
          points={points}
          setRestart={setRestart}
          mode={mode}
          setMode={setMode}
          setPoints={setPoints}
        />
      </Wrapper>
      {mode === 1 && (
        <Box
          sx={{
            width: "100%",
            height: ["30rem"],
            marginLeft: ["3rem"],
          }}
        >
          <MySlider
            orientation="vertical"
            defaultValue={2}
            aria-label="Difficulty"
            step={1}
            min={1}
            max={4}
            marks={Difficulties}
            valueLabelFormat={valueLabelFormat}
            valueLabelDisplay={"auto"}
            onKeyDown={preventHorizontalKeyboardNavigation}
            onChange={(e, value) => {
              setDifficulty(value as number);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default App;

const Wrapper = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100%",
  marginLeft: "20rem",
  flexDirection: "column",
});

const MySlider = styled(Slider)({
  '& input[type="range"]': {
    WebkitAppearance: "slider-vertical",
  },
  color: "#fff",
  textEmphasisColor: "#fff",
  "& .MuiSlider-thumb": {
    width: "1rem",
    height: "1rem",
    backgroundColor: "#fff",
    border: "none",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-valueLabel": {
    color: "#000",
    textEmphasisColor: "#000",
    "& span": {
      backgroundColor: "transparent",
      color: "#000",
      textEmphasisColor: "#000",
    },
  },

  "& .MuiSlider-markLabel": {
    color: "#fff",
    textEmphasisColor: "#fff",
  },
});
