import React from "react";

import Navbar from "./Navbar";
import Flex from "./Flex";

const Page = ({ children }) => (
  <Flex>
    <Navbar />
    <Flex width="100%" padding="80px" flexDirection="column">
      {children}
    </Flex>
  </Flex>
);

export default Page;
