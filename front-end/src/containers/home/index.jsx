import React, { useEffect, useState } from "react";

import { Home } from "../../components";
import api from "../../utils/api";

const HomeContainer = () => {
  const [graph, setGraph] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await api.get("/graph");
        setGraph(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGraph();
  }, []);

  if (isLoading) return <div>Carregando...</div>;

  const options = {
    title: {
      text: "",
    },
    chart: {
      type: "column",
      width: "700",
      style: {
        fontFamily: '"Montserrat", sans-serif',
      },
    },
    xAxis: {
      categories: ["2021"],
    },
    yAxis: [
      {
        title: {
          text: "Valor arrecadado",
        },
      },
    ],
    series: [
      {
        name: "Maior valor pago",
        data: [graph.highestValue],
        color: "#daa33e",
      },
      {
        name: "Menor valor pago",
        data: [graph.lowestValue],
        color: "#8119c2",
      },
      {
        name: "Média valor",
        data: [graph.mediaValue],
        color: "#2259c0",
      },
    ],
  };

  return (
    <Home
      totalDone={graph.completed}
      totalPending={graph.doing}
      totalLate={graph.paused}
      graphOptions={options}
    />
  );
};

export default HomeContainer;
