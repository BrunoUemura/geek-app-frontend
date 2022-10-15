import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../../components/EventForm";
import { useValidateAuth } from "../../hooks/useValidateAuth";
import { list } from "../../services/list";
import { Container } from "./styles";

export default function ListEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listId, setListId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useValidateAuth();
  useEffect(() => {
    (async () => {
      const listId = id || "";
      const token = localStorage.getItem("auth_token") || "";
      const { data } = await list.fetchListByListId(listId, token);

      setListId(listId);
      setTitle(data.title);
      setCategory(data.category);
      setDescription(data.description);
    })();
  }, []);

  const handleSaveEdit = async () => {
    const token = localStorage.getItem("auth_token") || "";
    await list.updateList(listId, title, category, description, token);

    navigate("/lists", { replace: true });
  };

  const handleCancelEdit = async () => {
    navigate("/lists", { replace: true });
  };

  const inputData = [
    {
      label: "title",
      value: title,
      type: "text",
      setFunction: setTitle,
    },
    {
      label: "category",
      value: category,
      type: "text",
      setFunction: setCategory,
    },
    {
      label: "description",
      value: description,
      type: "text",
      setFunction: setDescription,
    },
  ];

  const btnOptions = [
    {
      label: "Cancel",
      event: handleCancelEdit,
      style: "theme-one",
    },
    {
      label: "Save",
      event: handleSaveEdit,
      style: "theme-two",
    },
  ];

  return (
    <Container>
      <EventForm
        heading="Edit List"
        inputData={inputData}
        btnOptions={btnOptions}
      />
    </Container>
  );
}
