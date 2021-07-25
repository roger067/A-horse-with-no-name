import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { Card, Flex, Typography, Button } from "../";

const SprintList = ({ sprints, onRemove }) => (
  <>
    <Flex padding="1rem 2rem">
      <Flex flex=".5">
        <Typography weight="bold">id</Typography>
      </Flex>
      <Flex flex="3">
        <Typography weight="bold">Freelance</Typography>
      </Flex>
      <Flex flex="2">
        <Typography weight="bold">Descrição</Typography>
      </Flex>
      <Flex flex="1">
        <Typography weight="bold">Início</Typography>
      </Flex>
      <Flex flex="1">
        <Typography weight="bold">Deadline</Typography>
      </Flex>
      <Flex flex="1" />
    </Flex>
    {sprints ? (
      sprints.map((sprint) => (
        <Card
          key={sprint.id}
          alignItems="center"
          justifyContent="space-between"
          padding="2rem"
          mb="16px"
          width="100%"
          border="1px solid #fff"
          br="8px"
        >
          <Flex flex=".5">
            <Typography>{sprint.id}</Typography>
          </Flex>
          <Flex flex="3">
            <Typography>{sprint.freelance.name}</Typography>
          </Flex>
          <Flex flex="2">
            <Typography>{sprint.description}</Typography>
          </Flex>
          <Flex flex="1">
            <Typography>
              {new Date(sprint.start).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
            </Typography>
          </Flex>
          <Flex flex="1">
            <Typography>
              {new Date(sprint.deadline).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
            </Typography>
          </Flex>
          <Flex flex="1">
            <Link to={`/sprint/edit/${sprint.id}`}>
              <Button padding=".5rem" mr="1rem">
                Editar
              </Button>
            </Link>
            <Button
              background="#e64732"
              padding=".5rem"
              onClick={() => onRemove(sprint.id)}
            >
              Excluir
            </Button>
          </Flex>
        </Card>
      ))
    ) : (
      <Flex
        flexDirection="column"
        mt="32px"
        style={{ color: "#ffc04a" }}
        alignItems="center"
      >
        <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
        <Typography mt="8px">Não há sprints cadastrados...</Typography>
      </Flex>
    )}
  </>
);

export default SprintList;
