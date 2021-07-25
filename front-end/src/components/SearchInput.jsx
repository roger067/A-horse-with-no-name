import React from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Input from "./Input";
import Flex from "./Flex";

const SearchInput = ({ placeholder, onChange, value }) => (
  <SearchWrapper mb="24px">
    <Input
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      padding="1rem 1rem 1rem 3rem"
    />
    <FontAwesomeIcon icon={faSearch} />
  </SearchWrapper>
);

const SearchWrapper = styled(Flex)`
  position: relative;

  svg {
    position: absolute;
    color: #ffc04a;
    font-size: 20px;
    top: calc(50% - 10px);
    left: 16px;
  }

  input::placeholder {
    color: #3f3f3f;
  }
`;

export default SearchInput;
