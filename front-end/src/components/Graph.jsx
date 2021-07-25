import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";

const Graph = ({ options }) => {
  return <GraphTag highcharts={Highcharts} options={options} />;
};

const GraphTag = styled(HighchartsReact)``;

export default Graph;
