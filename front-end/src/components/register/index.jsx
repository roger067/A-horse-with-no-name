import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Flex, Card, Input, Button, Typography } from "../";

const Register = ({
  name,
  email,
  password,
  hasError,
  setEmail,
  setPassword,
  setName,
  createAccount,
}) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    flexDirection="column"
  >
    <Flex width="80%" maxWidth="400px" flexDirection="column">
      <Typography
        mb="2rem"
        align="center"
        size="32px"
        weight="700"
        color="#daa33e"
      >
        CEO dos freela
      </Typography>
      <Card
        flexDirection="column"
        padding="2rem 2rem 1rem"
        width="100%"
        border="1px solid #fff"
        br="2px"
      >
        <Typography weight="300" size="16px" mb="1rem">
          Crie sua conta
        </Typography>
        <Flex flexDirection="column" mb="1rem">
          <Typography weight="700" mb="1rem">
            Nome completo
          </Typography>
          <Input
            value={name}
            mb="4px"
            onChange={(e) => setName(e.target.value)}
          />
          {hasError && <MessageError>Nome inválido</MessageError>}
        </Flex>
        <Flex flexDirection="column" mb="1rem">
          <Typography weight="700" mb="1rem">
            E-mail
          </Typography>
          <Input
            value={email}
            mb="4px"
            onChange={(e) => setEmail(e.target.value)}
          />
          {hasError && <MessageError>E-mail inválido</MessageError>}
        </Flex>
        <Flex flexDirection="column" mb="2rem">
          <Typography weight="700" mb="1rem">
            Senha
          </Typography>
          <Input
            value={password}
            type="password"
            mb="4px"
            onChange={(e) => setPassword(e.target.value)}
          />
          {hasError && <MessageError>Senha inválida</MessageError>}
        </Flex>
        <Button onClick={createAccount} mb="2rem">
          Cadastrar
        </Button>
        <Flex justifyContent="center">
          <Typography weight="700" mr="2px">
            Já possui uma conta?
          </Typography>
          <CustomLink to="/login">Entre agora.</CustomLink>
        </Flex>
      </Card>
    </Flex>
  </Flex>
);

const MessageError = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #d93a1e;
`;

const CustomLink = styled(Link)`
  color: #daa33e;
  font-weight: 700;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;

export default Register;
