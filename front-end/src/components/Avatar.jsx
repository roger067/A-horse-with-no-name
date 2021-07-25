import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTag } from "@fortawesome/free-solid-svg-icons";

import Flex from "./Flex";
import Typography from "./Typography";

const Avatar = ({ name, role }) => (
  <Flex alignItems="center" ml="32px">
    <span style={{ color: "#3f3f3f" }}>
      <FontAwesomeIcon icon={faUserCircle} size="3x" />
    </span>
    <Flex flexDirection="column" ml="8px">
      <Typography size="14px" weight="600">
        {name}
      </Typography>
      <Flex alignItems="center">
        <span style={{ color: "#daa33e", fontSize: "10px" }}>
          <FontAwesomeIcon icon={faTag} />
        </span>
        <Typography ml="8px">{role}</Typography>
      </Flex>
    </Flex>
  </Flex>
);

export default Avatar;
