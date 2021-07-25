import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import FreelaForm from "../../components/FreelaForm";
import { Flex, Typography } from "../../components";
import api from "../../utils/api";

const AddFreelaContainer = () => {
  const history = useHistory();
  const [customerEmail, setCustomerEmail] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stacks, setStacks] = useState([]);
  const [description, setDescription] = useState("");
  const [devs, setDevs] = useState([]);
  const [isDevsLoading, setIsDevsLoading] = useState(true);
  const [selectedDevs, setSelectedDevs] = useState([]);

  const obj = {
    customerEmail,
    stacks,
    description,
    name,
    price,
    developers: selectedDevs.map((dev) => dev.value),
  };

  const onSubmit = async () => {
    try {
      await api.post("/freelance", obj);
      toast.success("Freela cadastrado com sucesso!");
      history.push("/freela");
    } catch {
      toast.error("Erro ao cadastrar freela!");
    }
  };

  useEffect(() => {
    const fetchDevs = async () => {
      try {
        const response = await api.get("/users");
        setDevs(response.data.filter((dev) => dev.role === 1));
      } catch (error) {
        console.error(error);
      } finally {
        setIsDevsLoading(false);
      }
    };

    fetchDevs();
  }, []);

  const devOptions = devs.map((dev) => ({
    label: dev.name,
    value: dev.id,
  }));

  return (
    <>
      <Flex flexDirection="column" mb="64px">
        <Typography size="14px" mb="4px">
          Dashboard
        </Typography>
        <Typography size="32px" weight="600">
          Cadastrar freelance
        </Typography>
      </Flex>
      <Flex width="100%" maxWidth="800px" flexDirection="column">
        <FreelaForm
          {...{
            onSubmit,
            customerEmail,
            stacks,
            description,
            setCustomerEmail,
            setStacks,
            setDescription,
            name,
            setName,
            price,
            setPrice,
            isDevsLoading,
            selectedDevs,
            devOptions,
            setSelectedDevs,
          }}
        />
      </Flex>
    </>
  );
};

export default AddFreelaContainer;
