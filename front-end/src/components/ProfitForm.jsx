import React from "react";
import styled from "styled-components";

import { Flex, Select, Input, Button } from "./";

const ProfitForm = ({
  freelas,
  addCharge,
  clearCharge,
  charges,
  onChangeCharges,
  setFreelaId,
  freelaId,
}) => (
  <Flex flexDirection="column" maxWidth="800px">
    <Select
      selected={freelaId ? freelaId : ""}
      onChange={(e) => setFreelaId(e)}
      options={freelas}
      shadow="0 3px 6px rgba(0, 0, 0, 0.23)"
      label="Selecione o freela para adicionar a cobrança:"
    />
    {charges.map((charge, index) => (
      <Flex key={index} flexDirection="column">
        <Separator />
        <Input
          placeholder="Digite o valor..."
          type="number"
          border="none"
          shadow="0 3px 6px rgba(0, 0, 0, 0.23)"
          value={charge.value}
          onChange={(e) => onChangeCharges(e.target.value, "value", index)}
        />
        <Input
          mt="16px"
          placeholder="Digite a descrição..."
          border="none"
          shadow="0 3px 6px rgba(0, 0, 0, 0.23)"
          value={charge.description}
          onChange={(e) =>
            onChangeCharges(e.target.value, "description", index)
          }
        />
      </Flex>
    ))}
    <Flex mt="16px">
      <Button
        onClick={clearCharge}
        width="100%"
        background="#fff"
        color="#113d8f"
        border="1px solid #113d8f"
        mr="8px"
      >
        Limpar campos
      </Button>
      <Button width="100%" background="#113d8f" ml="8px" onClick={addCharge}>
        Adicionar campo
      </Button>
    </Flex>
  </Flex>
);

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #a7a9b4;
  margin: 32px 0;
`;

export default ProfitForm;
