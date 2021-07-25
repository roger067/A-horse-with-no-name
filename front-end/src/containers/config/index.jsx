import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { Config, ListUsers, Flex, Typography } from "../../components";
import api from "../../utils/api";

const ConfigContainer = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const roleOptions = [
    {
      label: "Administrador",
      value: 0,
    },
    {
      label: "Desenvolvedor",
      value: 1,
    },
    {
      label: "Cliente",
      value: 2,
    },
  ];

  const onSubmit = async () => {
    const obj = {
      name,
      password,
      role,
      email,
    };

    if (!userId)
      try {
        await api.post("/signup", obj);
        toast.success("Usário adicionado com sucesso!");
        setUsers((prevState) => [...prevState, obj]);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao cadastrar usuário");
      }

    try {
      await api.put(`/user/${userId}`, obj);
      toast.success("Usário editado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao editar usuário");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const items = [...users];
    const selectedUser = items.find((item) => item.id === userId);
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setRole(selectedUser.role);
    }
    // eslint-disable-next-line
  }, [userId]);

  const onRemove = async (id, index) => {
    try {
      await api.delete(`/user/${id}`);
      const items = [...users];
      items.splice(index, 1);
      setUsers(items);
      toast.success("Usuário excluído com sucesso");
    } catch (err) {
      console.error(err);
      toast.error("Falha ao excluir");
    }
  };

  return (
    <>
      <Flex flexDirection="column" mb="64px">
        <Typography size="14px" mb="4px">
          Dashboard
        </Typography>
        <Typography size="32px" weight="600">
          Configurações
        </Typography>
      </Flex>
      <Flex width="100%">
        <Config
          options={roleOptions}
          {...{
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            role,
            setRole,
            onSubmit,
            setUserId,
          }}
        />
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          <ListUsers users={users} onRemove={onRemove} setUserId={setUserId} />
        )}
      </Flex>
    </>
  );
};

export default ConfigContainer;
