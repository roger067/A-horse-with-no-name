import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useHistory } from "react-router";

import { ProfitForm, Flex, Typography, Button } from "../../components";
import api from "../../utils/api";

const AddProfitContainer = () => {
  const [freelaId, setFreelaId] = useState("");
  const [charges, setCharges] = useState([]);
  const [freelas, setFreelas] = useState([]);
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

  const onChangeCharges = (value, field, index) => {
    const items = [...charges];
    const item = {
      ...items[index],
      [field]: value,
    };

    items[index] = item;
    setCharges(items);
  };

  const obj = {
    freelanceId: freelaId,
    charges,
  };

  const onSubmitCharges = async () => {
    try {
      await api.post("/charge", obj);
      toast.success("Freela cadastrado com sucesso!");
      history.push("/profit");
    } catch {
      toast.error("Erro ao cadastrar freela!");
    }
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="64px"
        maxWidth="800px"
      >
        <Flex flexDirection="column">
          <Typography size="14px" mb="4px">
            Dashboard
          </Typography>
          <Typography size="32px" weight="600">
            Adicionar Cobrança
          </Typography>
        </Flex>
        <Button background="#daa33e" onClick={onSubmitCharges}>
          Adicionar Cobrança
        </Button>
      </Flex>
      <ProfitForm
        freelaId={freelaId}
        setFreelaId={setFreelaId}
        charges={charges}
        freelas={options}
        onChangeCharges={onChangeCharges}
        clearCharge={() => setCharges([])}
        addCharge={() =>
          setCharges((prevState) => [
            ...prevState,
            { value: "", description: "" },
          ])
        }
      />
    </>
  );
};

export default AddProfitContainer;
