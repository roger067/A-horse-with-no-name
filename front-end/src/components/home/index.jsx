import React from "react";

import { Flex, Typography, Card, Graph } from "../";

const Home = ({ totalDone, totalPending, totalLate, graphOptions }) => (
  <>
    <Typography size="32px" weight="600">
      Dashboard
    </Typography>
    <Flex mt="64px">
      <Card
        background="#ffc04a"
        br="8px"
        flexDirection="column"
        minWidth="240px"
        mr="16px"
      >
        <Typography color="#f5f5f5" size="14px" weight="600" mb="16px">
          Freelas completos
        </Typography>
        <Typography color="#2259c0" size="24px" weight="700">
          {Number(totalDone) || "0"}
        </Typography>
      </Card>
      <Card br="8px" flexDirection="column" minWidth="240px" mr="16px">
        <Typography size="14px" weight="600" mb="16px">
          Freelas em desenvolvimento
        </Typography>
        <Typography color="#2259c0" size="24px" weight="700">
          {Number(totalPending) || "0"}
        </Typography>
      </Card>
      <Card br="8px" flexDirection="column" minWidth="240px">
        <Typography size="14px" weight="600" mb="16px">
          Freelas em atraso
        </Typography>
        <Typography color="#e64732" size="24px" weight="700">
          {Number(totalLate) || "0"}
        </Typography>
      </Card>
    </Flex>
    <Flex flexDirection="column" mt="2.5rem">
      <Typography size="14px" weight="600" mb="16px">
        Consolidado de valores:
      </Typography>
      <Card maxWidth="750px" padding="2rem 1rem 1rem">
        <Graph options={graphOptions} />
      </Card>
    </Flex>
  </>
);

export default Home;
