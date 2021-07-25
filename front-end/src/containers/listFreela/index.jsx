import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useHistory } from "react-router";

import { ListFreela } from "../../components";
import api from "../../utils/api";

const AddFreelaContainer = () => {
  const history = useHistory();

  const [freelas, setFreelas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFreela, setSearchFreela] = useState("");

  const role = localStorage.getItem("user:role");

  const isAdmin = role === "0";

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

  const onRemove = async (id) => {
    try {
      await api.delete(`/freelance/${id}`);
      toast.success("Freela deletado com sucesso!");
      history.push("/freela");
    } catch {
      toast.success("Erro ao deletar!");
    }
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <ListFreela
      freelas={freelas.filter((freela) =>
        freela.name.toLowerCase().includes(searchFreela.toLowerCase())
      )}
      searchFreela={searchFreela}
      setSearchFreela={setSearchFreela}
      onRemove={onRemove}
      isAdmin={isAdmin}
    />
  );
};

export default AddFreelaContainer;
