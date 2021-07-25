import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { ROLES } from "../../constants";
import { Card, Flex, Typography, Button } from "../";

const ListUser = ({ users, onRemove, setUserId }) => (
  <Flex flexDirection="column" flex="2" ml="2rem" mt="-1rem">
    <Flex padding="1rem">
      <Flex flex="1">
        <Typography weight="bold">Nome</Typography>
      </Flex>
      <Flex flex="1">
        <Typography weight="bold">Email</Typography>
      </Flex>
      <Flex flex="1">
        <Typography weight="bold">Cargo</Typography>
      </Flex>
      <Flex flex=".5" />
    </Flex>
    {users.length ? (
      users.map((user, index) => (
        <Card
          key={user.id}
          alignItems="center"
          padding="1rem"
          mb="16px"
          width="100%"
          border="1px solid #fff"
          br="8px"
        >
          <Flex flex="1">
            <Typography>{user.name}</Typography>
          </Flex>
          <Flex flex="1">
            <Typography>{user.email}</Typography>
          </Flex>
          <Flex flex="1">
            <Typography>{ROLES[user.role]}</Typography>
          </Flex>
          <Flex flex=".5">
            <Button
              padding=".5rem 1rem"
              mr="1rem"
              onClick={() => setUserId(user.id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              background="#e64732"
              padding=".5rem 1rem"
              onClick={() => onRemove(user.id, index)}
            >
              <FontAwesomeIcon icon={faTrash} />
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
        <Typography mt="8px">Não há usuários cadastrados...</Typography>
      </Flex>
    )}
  </Flex>
);

export default ListUser;
