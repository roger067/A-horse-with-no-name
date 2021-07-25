import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

import { Flex, Card, Typography, Button } from "../";

const Profit = ({ profit, onRemove }) => (
  <>
    <Flex flexDirection="column" mb="64px">
      <Typography size="14px" mb="4px">
        Dashboard
      </Typography>
      <Typography size="32px" weight="600">
        Receita e finanças
      </Typography>
    </Flex>
    <Flex>
      <Flex flexDirection="column" mr="24px">
        <Card br="8px" flexDirection="column" minWidth="240px" mb="16px">
          <Typography size="14px" weight="600" mb="16px">
            Lucro total
          </Typography>
          <Typography color="#113d8f" size="24px" weight="700">
            R$ {profit ? Number(profit.total).toFixed(2) : "0"}
          </Typography>
        </Card>
        <Link to="/profit/add">
          <Button background="#daa33e" width="100%">
            + Adicionar Cobrança
          </Button>
        </Link>
      </Flex>
      <Flex flexDirection="column" width="100%" maxWidth="600px">
        {profit ? (
          profit.freelances.map((freelance, freelaIndex) => (
            <Flex key={freelance.id} flexDirection="column">
              <Flex justifyContent="space-between" mb="8px" alignItems="center">
                <Typography weight="700">
                  {freelance.name} (R$ {freelance.total.toFixed(2)})
                </Typography>
              </Flex>
              {freelance.charges.map((charge, index) => (
                <Card
                  key={index}
                  br="8px"
                  width="100%"
                  maxWidth="600px"
                  mb="16px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>{charge.description}</Typography>
                  <Typography>R$ {Number(charge.value).toFixed(2)}</Typography>
                  <Flex>
                    <Link to={`profit/edit/${charge.id}`}>
                      <Button padding="8px">Editar</Button>
                    </Link>
                    <Button
                      padding="8px"
                      ml="8px"
                      background="#e64732"
                      onClick={() => onRemove(charge.id, freelaIndex, index)}
                    >
                      Excluir
                    </Button>
                  </Flex>
                </Card>
              ))}
              {profit.freelances.length !== freelaIndex + 1 && <Separator />}
            </Flex>
          ))
        ) : (
          <Typography>Sem dados cadastrados...</Typography>
        )}
      </Flex>
    </Flex>
  </>
);

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #a7a9b4;
  margin: 16px 0 32px;
`;

export default Profit;
