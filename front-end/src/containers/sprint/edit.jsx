import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

import api from "../../utils/api";
import { SprintForm, Flex, Typography } from "../../components";

const EditSprint = () => {
  const [isSprintLoading, setIsSprintLoading] = useState(false);
  const [freelaId, setFreelaId] = useState("");
  const [freelas, setFreelas] = useState([]);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await api.get(`sprint/${id}`);
        setFreelaId(response.data.freelance_id);
        setDescription(response.data.description);
        setStartDate(response.data.start);
        setLimitDate(response.data.deadline);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSprintLoading(false);
      }
    };

    fetchById();
  }, [id]);

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
      await api.put(`/sprint/${id}`, obj);
      toast.success("Sprint editada com sucesso!");
      history.push("/sprint");
    } catch (error) {
      console.error(error);
      toast.error("Error ao editar Sprint");
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
      {isLoading || isSprintLoading ? (
        <Flex>Carregando...</Flex>
      ) : (
        <SprintForm
          {...{
            freelaId,
            setFreelaId,
            freelas: options,
            description,
            setDescription,
            startDate: startDate
              ? new Date(startDate).toISOString().split("T")[0]
              : "",
            setStartDate,
            limitDate: limitDate
              ? new Date(limitDate).toISOString().split("T")[0]
              : "",
            setLimitDate,
            onSubmit,
            sprintId: id,
          }}
        />
      )}
    </>
  );
};

export default EditSprint;
