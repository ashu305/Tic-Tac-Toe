import { Box, styled } from "@mui/material";
import React from "react";

const TacButton = () => {
  return (
    <>
      <TacButtonBox />
    </>
  );
};

export default TacButton;

const TacButtonBox = styled(Box)({
  border: "0.8rem solid #3475f9",
  width: ["7rem"],
  height: ["7rem"],
  borderRadius: "50%",
  position: "absolute",
  boxShadow: "0px 3px 10px 3px #08618d9f",
  transition: "all 0.3s ease-in-out",
});
