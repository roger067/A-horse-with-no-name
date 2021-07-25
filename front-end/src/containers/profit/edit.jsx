import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Flex, Typography, EditProfit } from "../../components";
import api from "../../utils/api";

const EditProfitContainer = () => {
  const [charge, setCharge] = useState();
  const [value, setValue] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await api.get(`charge/${id}`);
        setCharge(response.data);
        setValue(response.data.value);
        setDescription(response.data.description);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchById();
  }, [id]);

  const onSubmit = async () => {
    const obj = {
      value,
      description,
    };

    try {
      await api.put(`charge/${id}`, obj);
      toast.success("Cobrança alterada com sucesso");
      history.push("/profit");
    } catch {
      toast.error("Erro ao alterar cobrança");
    }
  };

  return (
    <>
      <Flex flexDirection="column" mb="64px">
        <Typography size="14px" mb="4px">
          Dashboard
        </Typography>
        <Typography size="32px" weight="600">
          Editar Cobrança
        </Typography>
      </Flex>
      {!isLoading ? (
        <EditProfit
          {...{
            value,
            setValue,
            description,
            setDescription,
            onSubmit,
            chargeName: charge.freelance.name,
          }}
        />
      ) : (
        <Flex>Carregando...</Flex>
      )}
    </>
  );
};

export default EditProfitContainer;
