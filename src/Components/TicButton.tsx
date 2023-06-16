import { Box, styled } from "@mui/material";
import React from "react";

const TicButton = () => {
  return (
    <>
      <TicButtonBox
        sx={{
          transform: "rotate(45deg)",
        }}
      />
      <TicButtonBox
        sx={{
          transform: "rotate(-45deg)",
        }}
      />
    </>
  );
};

export default TicButton;
const TicButtonBox = styled(Box)({
  backgroundColor: "#f85528",
  width: ["1.5rem"],
  height: ["8rem"],
  borderRadius: "1rem",
  transform: "rotate(45deg)",
  position: "absolute",
  boxShadow: "0px 3px 10px 3px #8d6e08a0",
  transition: "all 0.3s ease-in-out",
});
