import React from "react";

import styled from "styled-components";

import Flex from "./Flex";

const Select = ({ label, options, onChange, selected, disabled, ...props }) => (
  <Flex flexDirection="column">
    {label && <Label>{label}</Label>}
    <SelectTag
      {...{ style: props }}
      value={selected}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectTag>
  </Flex>
);

const SelectTag = styled.select`
  background: ${(props) => props.style.bg || "#fff"};
  color: ${(props) => props.style.color || "#595959"};
  width: ${(props) => props.style.width || "auto"};
  height: ${(props) => props.style.height || "auto"};
  border: ${(props) => props.style.border || "none"};
  border-radius: ${(props) => props.style.br || "4px"};
  padding: ${(props) => props.style.padding || "1rem"};
  margin: ${(props) => props.style.margin || "0"};
  margin-top: ${(props) => props.style.mt || "0"};
  margin-bottom: ${(props) => props.style.mb || "0"};
  margin-left: ${(props) => props.style.ml || "0"};
  margin-right: ${(props) => props.style.mr || "0"};
  box-shadow: ${(props) => props.style.shadow || "none"};
  font-size: 14px;
  font-weight: 700;

  &:focus {
    border: ${(props) => props.style.border || "none"};
    outline: 0px;
  }

  option {
    background: #fff;
    color: #595959;
    padding: 2rem;
  }

  :disabled {
    cursor: not-allowed;
  }
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #3f3f3f;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
`;

export default Select;
