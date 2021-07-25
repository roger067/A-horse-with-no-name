import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import api from "../../utils/api";
import { SprintList, Flex, Typography, Button } from "../../components";

const SprintListContainer = () => {
  const [sprints, setSprints] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const role = localStorage.getItem("user:role");
  const isAdmin = role === "0";

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await api.get("/sprints");
        setSprints(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, []);

  const onRemove = async (id) => {
    try {
      await api.delete(`/sprint/${id}`);
      toast.success("Deletado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao deletar");
    }
  };

  return (
    <>
      <Flex mb="64px" justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <Typography size="14px" mb="4px">
            Dashboard
          </Typography>
          <Typography size="32px" weight="600">
            Sprints
          </Typography>
        </Flex>
        {isAdmin && (
          <Link to="sprint/add">
            <Button
              background="transparent"
              border="1px solid #222831"
              color="#222831"
            >
              Adicionar Sprint
            </Button>
          </Link>
        )}
      </Flex>
      {isLoading ? (
        <Flex>Carregando...</Flex>
      ) : (
        <SprintList {...{ sprints, onRemove }} />
      )}
    </>
  );
};

export default SprintListContainer;
