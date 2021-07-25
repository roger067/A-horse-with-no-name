import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Flex, Card, Input, Button, Typography } from "../";

const Login = ({
  email,
  password,
  hasError,
  setEmail,
  setPassword,
  handleLogin,
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
        color="#222831"
      >
        CEO dos Freela
      </Typography>
      <Card
        flexDirection="column"
        padding="2rem 2rem 1rem"
        width="100%"
        border="1px solid #fff"
        br="8px"
      >
        <Typography weight="300" size="16px" mb="1rem">
          Acesse sua conta
        </Typography>
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
          <Flex justifyContent="space-between">
            <Typography weight="700" mb="1rem">
              Senha
            </Typography>
            <CustomLink to="/register">Esqueceu a senha?</CustomLink>
          </Flex>
          <Input
            value={password}
            type="password"
            mb="4px"
            onChange={(e) => setPassword(e.target.value)}
          />
          {hasError && <MessageError>Senha inválida</MessageError>}
        </Flex>
        <Button onClick={handleLogin} mb="2rem">
          Continuar
        </Button>
        <Flex justifyContent="center">
          <Typography weight="700" mr="2px">
            Não tem uma conta?
          </Typography>
          <CustomLink to="/register">Registre-se.</CustomLink>
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

export default Login;
