import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => props.width || "auto"};
  max-width: ${(props) => props.maxWidth || "auto"};
  background: ${(props) => props.background || "#222831"};
  font-family: "Montserrat", sans-serif;
  border: ${(props) => props.border || "none"};
  border-radius: 4px;
  color: ${(props) => props.color || "#fff"};
  font-weight: 600;
  cursor: pointer;
  padding: ${(props) => props.padding || "1rem"};
  margin: ${(props) => props.margin || "0"};
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  margin-left: ${(props) => props.ml || "0"};
  margin-right: ${(props) => props.mr || "0"};
  transition: 0.2s;

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

export default Button;
