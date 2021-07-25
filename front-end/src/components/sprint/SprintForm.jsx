import React from "react";

import { Flex, Input, Select, Button, Typography } from "../";

const SprintForm = ({
  onSubmit,
  description,
  setDescription,
  startDate,
  setStartDate,
  limitDate,
  setLimitDate,
  sprintId,
  freelas,
  setFreelaId,
  freelaId,
}) => (
  <Flex flexDirection="column" maxWidth="800px">
    <Select
      selected={freelaId ? freelaId : ""}
      onChange={(e) => setFreelaId(e)}
      options={freelas}
      disabled={!!sprintId}
      shadow="0 3px 6px rgba(0, 0, 0, 0.23)"
      label="Selecione o freela da sprint:"
    />
    <Flex mt="1rem">
      <Flex flexDirection="column" mr="8px" flex="1">
        <Typography weight="700" mb="1rem">
          Início da sprint
        </Typography>
        <Input
          type="date"
          value={startDate}
          mb="4px"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Flex>
      <Flex flexDirection="column" ml="8px" flex="1">
        <Typography weight="700" mb="1rem">
          Final da sprint
        </Typography>
        <Input
          type="date"
          value={limitDate}
          mb="4px"
          onChange={(e) => setLimitDate(e.target.value)}
        />
      </Flex>
    </Flex>
    <Flex flexDirection="column" mb="1rem" mt="1rem">
      <Typography weight="700" mb="1rem">
        Descrição
      </Typography>
      <Input
        as="textarea"
        value={description}
        mb="4px"
        onChange={(e) => setDescription(e.target.value)}
      />
    </Flex>

    <Button onClick={onSubmit} background="#daa33e" mb="2rem">
      {sprintId ? "Editar" : "Adicionar"}
    </Button>
  </Flex>
);

export default SprintForm;
