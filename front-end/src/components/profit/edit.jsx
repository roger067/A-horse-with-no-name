import React from "react";

import { Flex, Input, Button, Typography } from "../";

const EditProfit = ({
  setDescription,
  setValue,
  onSubmit,
  description,
  value,
  chargeName,
}) => (
  <Flex flexDirection="column" maxWidth="600px">
    <Typography size="14px" mb="16px" weight="600">
      {chargeName}
    </Typography>
    <Input
      mb="16px"
      placeholder="Digite a descrição..."
      border="none"
      shadow="0 3px 6px rgba(0, 0, 0, 0.23)"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <Input
      mb="16px"
      placeholder="Digite o valor..."
      type="number"
      border="none"
      shadow="0 3px 6px rgba(0, 0, 0, 0.23)"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    <Button background="#daa33e" onClick={onSubmit}>
      Editar cobrança
    </Button>
  </Flex>
);

export default EditProfit;
