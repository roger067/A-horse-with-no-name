import React from "react";

import styled from "styled-components";

import { Typography } from ".";
import Card from "./Card";

const Tolltip = ({ developers, background, color }) => (
  <TooltipTag
    flexDirection="column"
    className="tooltip"
    background={background || "#fff"}
  >
    {developers.map((dev) => (
      <Typography key={dev.id} mb="4px" weight="600" color={color || "#222"}>
        {dev.name}
      </Typography>
    ))}
  </TooltipTag>
);

const TooltipTag = styled(Card)`
  position: absolute;
  min-width: 100px;
  top: 0;
  left: 20px;
  padding: 8px 8px 4px;
  border-radius: 0.25rem;
`;

export default Tolltip;
