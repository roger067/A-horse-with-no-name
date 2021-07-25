import React from "react";

import { Summary } from "../containers";

const SummaryPage = (props) => {
  const summaryId = props.match.params.id;

  return <Summary summaryId={summaryId} />;
};

export default SummaryPage;
