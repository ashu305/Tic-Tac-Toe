import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

interface Props {
  width: string[];
  height: string[];
  marginleft: string[];
  marginTop: string[];
}
const Separator: React.FC<Props> = ({ width, height, marginleft, marginTop }) => {
  return (
    <MySeparator
      sx={{ width: width, height: height, marginLeft: marginleft, marginTop: marginTop }}
    />
  );
};

export default Separator;

const MySeparator = styled(Box)({
  backgroundColor: "#bbbbbb",
  borderRadius: "1rem",
  position: "absolute",
});
