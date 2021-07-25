import React from "react";

import Select from "react-select";

import { Flex, Card, Input, Button, Typography } from "./";

const FreelaForm = ({
  onSubmit,
  customerEmail,
  description,
  stacks,
  setCustomerEmail,
  setDescription,
  setStacks,
  name,
  setName,
  price,
  selectedDevs,
  setPrice,
  isDevsLoading,
  devOptions,
  setSelectedDevs,
  id,
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 49,
    }),
  };

  const value = selectedDevs.map((dev) =>
    "label" in dev ? dev : { label: dev.name, value: dev.id }
  );

  return (
    <Card
      flexDirection="column"
      padding="2rem 2rem 1rem"
      width="100%"
      border="1px solid #fff"
      br="8px"
    >
      <Flex mb="1rem" wrap="wrap">
        <Flex flexDirection="column" flex="1" mr="8px">
          <Typography weight="700" mb="1rem">
            Nome
          </Typography>
          <Input
            value={name}
            mb="4px"
            onChange={(e) => setName(e.target.value)}
          />
        </Flex>
        <Flex flexDirection="column" flex="1" ml="8px">
          <Typography weight="700" mb="1rem">
            E-mail do contratante
          </Typography>
          <Input
            value={customerEmail}
            mb="4px"
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </Flex>
      </Flex>
      <Flex mb="1rem" wrap="wrap">
        <Flex flexDirection="column" flex="1" mr="1rem">
          <Typography weight="700" mb="1rem">
            Stacks
          </Typography>
          <Input
            value={stacks}
            mb="4px"
            onChange={(e) => setStacks(e.target.value)}
          />
        </Flex>
        <Flex flexDirection="column" flex="1">
          <Typography weight="700" mb="1rem">
            Preço
          </Typography>
          <Input
            value={price}
            type="number"
            mb="4px"
            disabled={!!id}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Flex>
      </Flex>
      <Flex flexDirection="column" mb="1rem" width="100%">
        <Typography weight="700" mb="1rem">
          Desenvolvedores
        </Typography>
        <Select
          style={{ width: "100%" }}
          styles={customStyles}
          isLoading={isDevsLoading}
          isMulti
          options={devOptions}
          placeholder="Desenvolvedores"
          value={value}
          onChange={(e) => setSelectedDevs(e)}
        />
      </Flex>
      <Flex flexDirection="column" mb="2rem">
        <Typography weight="700" mb="1rem">
          Descrição
        </Typography>
        <Input
          as="textarea"
          height="150px"
          value={description}
          mb="4px"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Flex>
      <Button onClick={onSubmit} background="#daa33e" mb="2rem">
        {id ? "Editar" : "Adicionar"}
      </Button>
    </Card>
  );
};

export default FreelaForm;
