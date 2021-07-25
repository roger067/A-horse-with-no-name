import styled from "styled-components";

const Input = styled.input`
  background: ${(props) => props.bg || "#fff"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  border: ${(props) => props.border || "1px solid #3f3f3f"};
  border-radius: ${(props) => props.br || "4px"};
  padding: ${(props) => props.padding || "1rem"};
  margin: ${(props) => props.margin || "0"};
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  margin-left: ${(props) => props.ml || "0"};
  margin-right: ${(props) => props.mr || "0"};
  box-shadow: ${(props) => props.shadow || "none"};
  transition: 0.2s;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export default Input;
