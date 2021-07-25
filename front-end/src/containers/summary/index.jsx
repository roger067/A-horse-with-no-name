import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import api from "../../utils/api";
import { Summary } from "../../components";

const SummaryContainer = ({ summaryId }) => {
  const [summary, setSummary] = useState();
  const [cards, setCards] = useState([]);
  const [isCardsLoading, setIsCardsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectedDevs, setSelectedDevs] = useState([]);

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const move = (list, draggableId, droppableId) => {
    const id = droppableId.split("-")[1];
    const items = [...list];
    const selectedItem = items.find((item) => item.id === Number(draggableId));
    selectedItem.status = Number(id);

    return items;
  };

  const updateStatusOnDrag = async (status, id) => {
    try {
      await api.put(`/card/${id}`, {
        status,
      });
    } catch {
      toast.error("Erro ao mudar status");
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const startIndex = source.index;
    const endIndex = destination.index;

    if (source.droppableId === destination.droppableId) {
      setCards(reorder(cards, startIndex, endIndex));
    } else {
      const status = destination.droppableId.split("-")[1];
      setCards(move(cards, draggableId, destination.droppableId));
      updateStatusOnDrag(status, draggableId);
    }
  };

  const developers = selectedDevs
    ? selectedDevs.map((dev) => ("label" in dev ? dev.value : dev.id))
    : [];

  const onOpenModal = (card) => {
    setIsModalOpen(true);
    setSelectedCard(card);
  };

  useEffect(() => {
    if (selectedCard) {
      setStatus(selectedCard.status);
      setDescription(selectedCard.description);
      setSelectedDevs(selectedCard.developers);
    }
  }, [selectedCard]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get(`/generaty-relatory/${summaryId}`);
        setSummary(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [summaryId]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get(`/card-freelance/${summaryId}`);
        setCards(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsCardsLoading(false);
      }
    };

    fetchCards();
  }, [summaryId]);

  const onAddCard = async (sprintId, name, status) => {
    const obj = {
      freelanceId: summaryId,
      sprintId,
      description: name,
      status,
    };

    try {
      await api.post("/card", obj);
      window.location.reload();
    } catch {
      toast.error("Erro ao adicionar Task");
    }
  };

  const onEditStatus = async (status) => {
    const freelanceCreated = await api.put(`/freelance/${summaryId}`, {
      status,
    });
    if (freelanceCreated.status !== 200) return;

    window.location.reload();
  };

  const onUpdateCard = async () => {
    try {
      await api.put(`/card/${selectedCard.id}`, {
        status,
        description,
        developers,
      });
      setIsModalOpen(false);
      window.location.reload();
    } catch {
      toast.error("Erro ao editar Task");
    }
  };

  const onRemoveCard = async () => {
    try {
      await api.delete(`/card/${selectedCard.id}`);
      setIsModalOpen(false);
      window.location.reload();
    } catch {
      toast.error("Erro ao excluir Task");
    }
  };

  if (isLoading || isCardsLoading) return <div>Carregando...</div>;

  return (
    <Summary
      summary={summary}
      onEditStatus={onEditStatus}
      onAddCard={onAddCard}
      cards={cards}
      onOpenModal={onOpenModal}
      isModalOpen={isModalOpen}
      selectedCard={selectedCard}
      onCloseModal={() => setIsModalOpen(false)}
      onUpdateCard={onUpdateCard}
      onRemoveCard={onRemoveCard}
      {...{
        description,
        setDescription,
        status,
        setStatus,
        setSelectedDevs,
        selectedDevs,
        onDragEnd,
        devs: summary.developers,
      }}
    />
  );
};

export default SummaryContainer;
