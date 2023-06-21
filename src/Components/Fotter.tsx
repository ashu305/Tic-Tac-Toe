import { Box, IconButton, Tooltip, styled } from "@mui/material";
import React from "react";
import Separator from "./Separator";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface Props {
  points: { tic: number; tac: number; tie: number };
  setRestart: (restart: boolean) => void;
  mode: number;
  setMode: (mode: number) => void;
  setPoints: (points: { tic: number; tac: number; tie: number }) => void;
}

const Fotter: React.FC<Props> = ({ points, setRestart, mode, setMode, setPoints }) => {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text>Tic:{points.tic}</Text>
        <Separator
          marginleft={["5.5rem"]}
          width={["0.3rem"]}
          height={["2.5rem"]}
          marginTop={["-0.4rem"]}
        />
        <Text sx={{ marginLeft: "2rem" }}>Tac:{points.tac}</Text>
        <Separator
          marginleft={["13rem"]}
          width={["0.3rem"]}
          height={["2.5rem"]}
          marginTop={["-0.4rem"]}
        />
        <Text sx={{ marginLeft: "2rem" }}>Tie:{points.tie}</Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title={mode === 1 ? "vs AI" : "vs Friend"} placement="top">
          <Mode
            sx={{ marginRight: "0.3rem" }}
            onClick={() => {
              mode === 1 ? setMode(2) : setMode(1);
              setPoints({ tic: 0, tac: 0, tie: 0 });
              setRestart(true);
            }}
          >
            {mode === 1 ? "1v" : "2v"}
          </Mode>
        </Tooltip>
        <Restart onClick={() => setRestart(true)}>
          <Tooltip title="New Game" placement="top">
            <RestartAltIcon sx={{ color: "#fff", fontSize: "1.7rem" }} />
          </Tooltip>
        </Restart>
      </div>
    </Wrapper>
  );
};

export default Fotter;

const Wrapper = styled(Box)({
  width: "40rem",
  height: "10vh",
  backgroundColor: "#474657",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});

const Text = styled(Box)({
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
  letterSpacing: "0.2rem",
  textTransform: "uppercase",
  transition: "all 0.3s ease-in-out",
});

const Restart = styled(IconButton)({
  backgroundColor: "#474657",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#8888888b",
  },
});

const Mode = styled(Box)({
  backgroundColor: "#474657",
  transition: "all 0.3s ease-in-out",
  fontcolor: "#fff",
  fontSize: "1.5rem",
  color: "#fff",
  cursor: "pointer",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  "&:hover": {
    backgroundColor: "#8888888b",
  },
});
