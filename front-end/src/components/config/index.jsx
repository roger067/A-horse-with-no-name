import React from "react";

import styled from "styled-components";

import { Flex, Input, Select, Typography, Button } from "../";

const Config = ({
  options = [],
  name,
  setName,
  role,
  setRole,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  setUserId,
}) => (
  <Flex flexDirection="column" flex="1" mr="2rem">
    <Typography size="18px" weight="400" mb="2rem">
      Adicione um usuário:
    </Typography>
    <Flex flexDirection="column" mb="1rem">
      <Label>Nome</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
    </Flex>
    <Select
      label="Cargo"
      options={options}
      selected={role}
      onChange={(e) => setRole(e)}
      border="1px solid #3f3f3f"
      mb="1rem"
    />
    <Flex flexDirection="column" mb="1rem">
      <Label>E-mail</Label>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
    </Flex>
    <Flex flexDirection="column" mb="2rem">
      <Label>Senha</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Flex>
    <Flex>
      <Button
        background="transparent"
        color="#daa33e"
        border="1px solid #daa33e"
        width="100%"
        mr="8px"
        onClick={() => {
          setName("");
          setRole("");
          setPassword("");
          setEmail("");
          setUserId("");
        }}
      >
        Limpar
      </Button>
      <Button background="#daa33e" width="100%" ml="8px" onClick={onSubmit}>
        Confirmar
      </Button>
    </Flex>
  </Flex>
);

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #3f3f3f;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
`;

export default Config;
