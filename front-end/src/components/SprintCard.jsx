import React, { useState } from "react";

import styled from "styled-components";
import { faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "./Card";
import Input from "./Input";
import { Typography, Flex, Tooltip } from "./";

const SprintCard = ({
  background,
  borderTopColor,
  title,
  onAddCard,
  cards,
  onOpenModal,
  id,
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [name, setName] = useState("");

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setIsAddingCard(false);
      onAddCard(name);
    }
  };

  return (
    <Droppable droppableId={`droppable-${id}`}>
      {(provided) => (
        <SprintCardTag
          {...provided.droppableProps}
          ref={provided.innerRef}
          mr="16px"
          background={background}
          borderTopColor={borderTopColor}
          flexDirection="column"
        >
          <Typography color="#fff" weight="700" size="16px" mb="16px">
            {title}
          </Typography>
          {cards.map((card, index) => (
            <Draggable
              key={card.id}
              draggableId={card.id.toString()}
              index={index}
            >
              {(provided, snapshot) => (
                <Card
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  isDragging={snapshot.isDragging}
                  key={card.id}
                  onClick={() => onOpenModal(card)}
                  flexDirection="column"
                  mb="8px"
                  br="4px"
                  boxShadow="rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px"
                >
                  <Typography mb="16px" size="14px">
                    {card.description}
                  </Typography>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Tag>
                      <Typography color="#fff" weight="600">
                        ID: {card.id}
                      </Typography>
                    </Tag>
                    <DevWrapper>
                      <FontAwesomeIcon icon={faUserCircle} />
                      {card.developers && (
                        <Tooltip
                          developers={card.developers}
                          background={borderTopColor}
                          color="#fff"
                        />
                      )}
                    </DevWrapper>
                  </Flex>
                </Card>
              )}
            </Draggable>
          ))}
          <Flex height="100%">
            {isAddingCard ? (
              <AddInput
                placeholder="Descreva sua tarefa..."
                onBlur={() => setIsAddingCard(false)}
                onKeyPress={(e) => handleKeyPress(e)}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            ) : (
              <AddButton onClick={() => setIsAddingCard(true)}>
                <FontAwesomeIcon icon={faPlus} /> <span>Adicionar Task</span>
              </AddButton>
            )}
          </Flex>
          {provided.placeholder}
        </SprintCardTag>
      )}
    </Droppable>
  );
};

const SprintCardTag = styled(Card)`
  width: 100%;
  border-radius: 4px;
  min-height: 360px;
  border-top: 4px solid ${(props) => props.borderTopColor || "#fff"};
  box-shadow: none;
`;

const DevWrapper = styled.div`
  position: relative;

  .tooltip {
    opacity: 0;
    transition: 0.2s;
  }

  &:hover {
    .tooltip {
      opacity: 1;
    }
  }

  svg {
    font-size: 20px;
  }
`;

const AddInput = styled(Input)`
  display: flex;
  align-self: flex-end;
  width: 100%;
  margin-top: 16px;
  border: none;
`;

const Tag = styled.div`
  display: flex;
  background-color: #222831;
  border-radius: 12px;
  padding: 2px 8px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  align-self: flex-end;
  width: fit-content;
  margin-top: 16px;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-weight: 400;

  span {
    margin-left: 16px;
  }
`;

export default SprintCard;
