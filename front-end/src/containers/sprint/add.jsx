import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import api from "../../utils/api";
import { SprintForm, Flex, Typography } from "../../components";

const AddSprint = () => {
  const [freelaId, setFreelaId] = useState("");
  const [freelas, setFreelas] = useState([]);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await api.get("/freelance");
        setFreelas(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, []);

  const options = freelas.map((freela) => ({
    label: freela.name,
    value: freela.id,
  }));

  options.unshift({ label: "Selecione uma opção", value: "" });

  const obj = {
    freelanceId: freelaId,
    description,
    start: startDate,
    deadline: limitDate,
  };

  const onSubmit = async () => {
    try {
      await api.post("/sprint", obj);
      toast.success("Sprint adicionada com sucesso!");
      history.push("/sprint");
    } catch (error) {
      console.error(error);
      toast.error("Error ao adicionar Sprint");
    }
  };

  return (
    <>
      <Flex flexDirection="column" mb="64px">
        <Typography size="14px" mb="4px">
          Dashboard
        </Typography>
        <Typography size="32px" weight="600">
          Adicionar Sprint
        </Typography>
      </Flex>
      {isLoading ? (
        <Flex>Carregando...</Flex>
      ) : (
        <SprintForm
          {...{
            freelaId,
            setFreelaId,
            freelas: options,
            description,
            setDescription,
            startDate,
            setStartDate,
            limitDate,
            setLimitDate,
            onSubmit,
          }}
        />
      )}
    </>
  );
};

export default AddSprint;
