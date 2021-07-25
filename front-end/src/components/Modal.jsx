import React from "react";

import Select from "react-select";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";
import Flex from "./Flex";
import Button from "./Button";
import Input from "./Input";
import { STATUS_CARD } from "../constants";

const Modal = ({
  onCloseModal,
  selectedCard,
  onSubmit,
  description,
  setDescription,
  setStatus,
  devs,
  isDevsLoading,
  setSelectedDevs,
  onRemoveCard,
  selectedDevs,
}) => {
  const { id, sprint_id, developers, status: defaultStatus } = selectedCard;

  const statusOptions = Object.values(STATUS_CARD).map((status, index) => ({
    label: status,
    value: index,
  }));

  const devOptions = devs.map((dev) => ({
    label: dev.name,
    value: dev.id,
  }));

  const value = selectedDevs
    ? selectedDevs.map((dev) =>
        "label" in dev ? dev : { label: dev.name, value: dev.id }
      )
    : [];

  const devIds = developers ? developers.map((dev) => dev.id) : [];

  const defaultValue = devOptions.filter((option) =>
    devIds.includes(option.value)
  );

  return (
    <Wrapper>
      <Flex justifyContent="center" alignItems="center" height="100%">
        <ModalTag width="35%" maxWidth="500px" flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center" flex="1">
            <Flex>
              <Tag>CARD-{id}</Tag>
              <Flex mr="8px" ml="8px">
                /
              </Flex>
              <Tag>SPRINT-{sprint_id}</Tag>
            </Flex>
            <IconWrapper>
              <FontAwesomeIcon icon={faTrashAlt} onClick={onRemoveCard} />
              <FontAwesomeIcon icon={faTimes} onClick={onCloseModal} />
            </IconWrapper>
          </Flex>
          <CustomInput
            mt="24px"
            mb="24px"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Select
            options={statusOptions}
            placeholder="Status"
            defaultValue={statusOptions.find(
              (option) => option.value === defaultStatus
            )}
            onChange={(e) => setStatus(e.value)}
          />
          <Flex padding="8px" />
          <Select
            isLoading={isDevsLoading}
            isMulti
            options={devOptions}
            placeholder="Desenvolvedores"
            onChange={(e) => setSelectedDevs(e)}
            value={selectedDevs ? value : defaultValue}
          />
          <Button mt="16px" mb="16px" background="#ffc04a" onClick={onSubmit}>
            Confirmar
          </Button>
        </ModalTag>
      </Flex>
      <Overlay onClick={onCloseModal} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
`;

const IconWrapper = styled(Flex)`
  font-size: 22px;
  color: #6b6b6b;
  svg {
    margin-left: 16px;
    cursor: pointer;
  }
`;

const ModalTag = styled(Card)`
  z-index: 5;
  padding: 24px;
`;

const CustomInput = styled(Input)`
  color: #283952;
  font-size: 24px;
  padding: 16px 4px;
  font-weight: 500;
  border: none;
  max-height: 54px;
  box-sizing: border-box;
  transition: 0.4s;

  &:focus,
  &:active {
    background: #ececec;
  }
`;

const Tag = styled.div`
  display: flex;
  background-color: #222831;
  border-radius: 4px;
  padding: 4px 8px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

const Overlay = styled(Wrapper)`
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
`;

export default Modal;
