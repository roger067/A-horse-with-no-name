import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Profit } from "../../components";
import api from "../../utils/api";

const AddFreelaContainer = () => {
  const [profit, setProfit] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await api.get("/profit");
        setProfit(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, []);

  const onRemove = async (id, freelaIndex, chargeIndex) => {
    try {
      await api.delete(`/charge/${id}`);
      const items = { ...profit };
      items.freelances[freelaIndex].charges.splice(chargeIndex, 1);
      setProfit(items)
      toast.success("Deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao deletar");
    }
  };

  if (isLoading) return <div>Carregando...</div>;

  return <Profit {...{ profit, onRemove }} />;
};

export default AddFreelaContainer;
