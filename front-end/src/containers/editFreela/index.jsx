import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

import api from "../../utils/api";
import FreelaForm from "../../components/FreelaForm";
import { Flex, Typography } from "../../components";

const EditFreelaContainer = () => {
  const history = useHistory();
  const { id } = useParams();
  const [freela, setFreela] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stacks, setStacks] = useState([]);
  const [description, setDescription] = useState("");
  const [devs, setDevs] = useState([]);
  const [isDevsLoading, setIsDevsLoading] = useState(true);
  const [selectedDevs, setSelectedDevs] = useState([]);

  const developers = selectedDevs.map((dev) =>
    "label" in dev ? dev.value : dev.id
  );

  function getTotal() {
    return freela.charges.reduce(
      (total, charge) => total + Number(charge.value),
      0
    );
  }

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

  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await api.get(`/freelance/${id}`);
        setFreela(response.data);
        setCustomerEmail(freela.customer.email);
        setName(freela.name);
        setStacks(freela.stack.join(", "));
        setDescription(freela.description);
        setSelectedDevs(freela.developers);
        setPrice(getTotal());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchById();
    //eslint-disable-next-line
  }, [id, isLoading]);

  const obj = {
    customerEmail,
    stack: !!stacks.length ? stacks.split(", ") : [],
    developers,
    description,
    name,
    price,
  };

  const onSubmit = async () => {
    try {
      await api.put(`/freelance/${id}`, obj);
      toast.success("Freela editado com sucesso!");
      history.push("/freela");
    } catch {
      toast.error("Erro ao editar freela!");
    }
  };

  if (isLoading) return <div>Carregando...</div>;

  const devOptions = devs
    ? devs.map((dev) => ({
        label: dev.name,
        value: dev.id,
      }))
    : [];

  return (
    <>
      <Flex flexDirection="column" mb="64px">
        <Typography size="14px" mb="4px">
          Dashboard
        </Typography>
        <Typography size="32px" weight="600">
          Editar Freelance
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
            devOptions,
            setSelectedDevs,
            isDevsLoading,
            selectedDevs,
            id,
          }}
        />
      </Flex>
    </>
  );
};

export default EditFreelaContainer;
