import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { Flex, Card, Typography, Button, SearchInput } from "../";

const ListFreela = ({
  freelas,
  onRemove,
  setSearchFreela,
  searchFreela,
  isAdmin,
}) => (
  <>
    <Flex mb="64px" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        <Typography size="14px" mb="4px">
          Dashboard
        </Typography>
        <Typography size="32px" weight="600">
          Meus Freelances
        </Typography>
      </Flex>
      {isAdmin && (
        <Link to="freela/add">
          <Button
            background="transparent"
            border="1px solid #222831"
            color="#222831"
          >
            Adicionar Freelance
          </Button>
        </Link>
      )}
    </Flex>
    <SearchInput
      placeholder="Buscar freelance..."
      onChange={(e) => setSearchFreela(e.target.value)}
      value={searchFreela}
    />
    <Flex padding="1rem 2rem">
      <Flex flex="2">
        <Typography weight="bold">Nome</Typography>
      </Flex>
      <Flex flex="1">
        <Typography weight="bold">Stacks</Typography>
      </Flex>
      <Flex flex="1">
        <Typography weight="bold">Contratante</Typography>
      </Flex>
      <Flex flex="1">
        <Typography weight="bold">Preço</Typography>
      </Flex>
      <Flex flex="1">
        <Typography weight="bold">Descrição</Typography>
      </Flex>
      <Flex flex="1" />
    </Flex>
    {freelas.length ? (
      freelas.map((freela) => (
        <Link
          key={freela.id}
          to={`summary/${freela.id}`}
          style={{ textDecoration: "none" }}
        >
          <Card
            alignItems="center"
            justifyContent="space-between"
            padding="2rem"
            mb="16px"
            width="100%"
            border="1px solid #fff"
            br="8px"
          >
            <Flex flex="2">
              <Typography>{freela.name || "Sem nome"}</Typography>
            </Flex>
            <Flex flex="1">
              <Typography>
                {freela.stack ? freela.stack.join(", ") : "Sem stack"}
              </Typography>
            </Flex>
            <Flex flex="1">
              <Typography>
                {freela.customer.email || "Sem contratante"}
              </Typography>
            </Flex>
            <Flex flex="1">
              <Typography>{getTotal(freela.charges) || "Sem preço"}</Typography>
            </Flex>
            <Flex flex="1">
              <Typography mr="1rem">
                {freela.description || "Sem Descrição"}
              </Typography>
            </Flex>
            <Flex flex="1">
              <Link to={`/freela/edit/${freela.id}`}>
                <Button padding=".5rem" mr="1rem">
                  Editar
                </Button>
              </Link>
              <Button
                background="#e64732"
                padding=".5rem"
                onClick={() => onRemove(freela.id)}
              >
                Excluir
              </Button>
            </Flex>
          </Card>
        </Link>
      ))
    ) : (
      <Flex
        flexDirection="column"
        mt="32px"
        style={{ color: "#ffc04a" }}
        alignItems="center"
      >
        <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
        <Typography mt="8px">Não há freelances cadastrados...</Typography>
      </Flex>
    )}
  </>
);

function getTotal(charges) {
  return charges.reduce((total, charge) => total + Number(charge.value), 0);
}

export default ListFreela;
