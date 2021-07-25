import styled from "styled-components";

import Flex from "./Flex";

const Card = styled(Flex)`
  background-color: ${(props) => props.background || "#fff"};
  border-radius: ${(props) => props.br || "0.5rem"};
  border: ${(props) => props.border || "none"};
  padding: ${(props) => props.padding || "1rem"};
  margin: ${(props) => props.margin || "0"};
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  margin-left: ${(props) => props.ml || "0"};
  margin-right: ${(props) => props.mr || "0"};
  box-shadow: ${(props) =>
    props.boxShadow ||
    "rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px"};
  transition: 0.2s;
`;

export default Card;
