import styled from "styled-components";

const Typography = styled.span`
  color: ${(props) => props.color || "#3f3f3f"};
  font-family: "Montserrat", sans-serif;
  font-weight: ${(props) => props.weight || "400"};
  font-size: ${(props) => props.size || "12px"};
  text-align: ${(props) => props.align || "initial"};
  margin: ${(props) => props.margin || "0"};
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  margin-left: ${(props) => props.ml || "0"};
  margin-right: ${(props) => props.mr || "0"};
`;

export default Typography;
