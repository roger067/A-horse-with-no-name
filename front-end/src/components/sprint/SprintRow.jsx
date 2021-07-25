import React from "react";

import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

import SprintCard from "../SprintCard";
import { Flex, Typography } from "../";

const SprintRow = ({
  startDate,
  limitDate,
  onAddCard,
  cards,
  onOpenModal,
  onDragEnd,
  description,
}) => (
  <Flex flexDirection="column" width="100%" mb="2rem">
    <Flex mb="16px" flexDirection="column">
      {description && <Typography color="#888888">- {description}</Typography>}
      <Flex>
        <Flex alignItems="center">
          <Typography weight="600">Data de Início: </Typography>
          <Tag>{startDate}</Tag>
        </Flex>
        <Flex ml="8px" mr="8px">
          /
        </Flex>
        <Flex alignItems="center">
          <Typography weight="600">Data de Término: </Typography>
          <Tag>{limitDate}</Tag>
        </Flex>
      </Flex>
    </Flex>
    <Flex width="100%">
      <DragDropContext onDragEnd={onDragEnd}>
        <SprintCard
          id="0"
          onOpenModal={onOpenModal}
          cards={cards.filter((card) => card.status === 0)}
          background="#cba1e6"
          borderTopColor="#8119c2"
          title="To do"
          onAddCard={(name) => onAddCard(name, 0)}
        />
        <SprintCard
          id="1"
          onOpenModal={onOpenModal}
          cards={cards.filter((card) => card.status === 1)}
          background="#a5e5f2"
          borderTopColor="#31acc4"
          title="In Progress"
          onAddCard={(name) => onAddCard(name, 1)}
        />
        <SprintCard
          id="2"
          onOpenModal={onOpenModal}
          cards={cards.filter((card) => card.status === 2)}
          background="#f0c575"
          borderTopColor="#daa33e"
          title="QA"
          onAddCard={(name) => onAddCard(name, 2)}
        />
        <SprintCard
          id="3"
          onOpenModal={onOpenModal}
          cards={cards.filter((card) => card.status === 3)}
          background="#99deb7"
          borderTopColor="#1bb55d"
          title="Done"
          onAddCard={(name) => onAddCard(name, 3)}
        />
      </DragDropContext>
    </Flex>
  </Flex>
);

const Tag = styled.div`
  background: #222831;
  margin-left: 8px;
  color: #fff;
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 6px;
  font-weight: 600;
`;

export default SprintRow;
