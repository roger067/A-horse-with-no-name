import React from "react";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Flex, Card, Typography, Select, SprintRow, Modal } from "../";
import { STATUS_FREELANCE } from "../../constants";

const Summary = ({
  summary,
  onEditStatus,
  onAddCard,
  cards,
  selectedCard,
  onOpenModal,
  onCloseModal,
  isModalOpen,
  onUpdateCard,
  description,
  setDescription,
  status,
  setStatus,
  selectedDevs,
  setSelectedDevs,
  onRemoveCard,
  onDragEnd,
  devs,
}) => {
  const options = Object.values(STATUS_FREELANCE).map((option, index) => ({
    value: index,
    label: option,
  }));

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb="64px">
        <Flex flexDirection="column">
          <Typography size="14px" mb="4px">
            Dashboard > Relatório
          </Typography>
          <Typography size="32px" weight="600">
            {summary.name}
          </Typography>
        </Flex>
        <Select
          options={options}
          bg="#ffc04a"
          color="#f5f5f5"
          width="200px"
          selected={summary.status}
          onChange={onEditStatus}
        />
      </Flex>
      <Flex>
        <Card flex="1" mr="1rem" flexDirection="column">
          <Typography size="14px" weight="700" mb="16px">
            Andamento
          </Typography>
          <Flex>
            <Typography weight="600" color="#595959">
              Status:
            </Typography>
            <Typography
              color={summary.status === 2 ? "#22c057" : "#e64732"}
              ml="4px"
            >
              {STATUS_FREELANCE[summary.status]}
            </Typography>
          </Flex>
        </Card>
        <Card flex="1" mr="1rem" flexDirection="column">
          <Typography size="14px" weight="700" mb="16px">
            Tecnologias
          </Typography>
          {summary.stack.map((language, index) => (
            <Typography key={index}>{language}</Typography>
          ))}
        </Card>
        <Card flex="1" mr="1rem" flexDirection="column">
          <Typography size="14px" weight="700" mb="16px">
            Cobranças
          </Typography>
          {summary.charges.map((charge, index) => (
            <Flex key={index}>
              <Typography weight="600" color="#595959">
                {charge.description}:{" "}
              </Typography>
              <Typography color="#22c057" ml="4px">
                R${Number(charge.value).toFixed(2)}
              </Typography>
            </Flex>
          ))}
        </Card>
        <Card flex="1" mr="1rem" flexDirection="column">
          <Typography size="14px" weight="700" mb="16px">
            Dados do contratante
          </Typography>
          <Typography>{summary.customer.name}</Typography>
          <Typography>{summary.customer.email}</Typography>
        </Card>
      </Flex>
      <Typography size="24px" mt="40px" mb="24px" weight="bold">
        Sprints
      </Typography>
      {!!summary.sprints.length ? (
        summary.sprints
          .sort((a, b) => new Date(b.start) - new Date(a.start))
          .map((sprint) => (
            <SprintRow
              onDragEnd={onDragEnd}
              cards={cards.filter((card) => card.sprint_id === sprint.id)}
              onOpenModal={onOpenModal}
              key={sprint.id}
              description={sprint.description}
              startDate={new Date(sprint.start).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
              limitDate={new Date(sprint.deadline).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
              onAddCard={(name, status) => onAddCard(sprint.id, name, status)}
            />
          ))
      ) : (
        <Flex
          flexDirection="column"
          mt="32px"
          style={{ color: "#ffc04a" }}
          alignItems="center"
        >
          <FontAwesomeIcon icon={faExclamationTriangle} size="4x" />
          <Typography mt="8px" size="14px" weight="600">
            Não há sprint iniciada
          </Typography>
        </Flex>
      )}
      {isModalOpen && (
        <Modal
          selectedCard={selectedCard}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          onRemoveCard={onRemoveCard}
          onSubmit={onUpdateCard}
          {...{
            description,
            setDescription,
            status,
            setStatus,
            selectedDevs,
            setSelectedDevs,
            onDragEnd,
            devs,
          }}
        />
      )}
    </>
  );
};

export default Summary;
