import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../../components/EventForm";
import { useValidateAuth } from "../../hooks/useValidateAuth";
import { list } from "../../services/list";
import { retrieveUserId } from "../../utils/retrieveUserId";
import { Container } from "./styles";

export default function ListNew() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useValidateAuth();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("auth_token") || "";
      const userId = retrieveUserId(token);
      setUserId(userId);
    })();
  }, []);

  const handleSaveEdit = async () => {
    const token = localStorage.getItem("auth_token") || "";
    await list.createList(userId, title, category, description, token);

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
        heading="New List"
        inputData={inputData}
        btnOptions={btnOptions}
      />
    </Container>
  );
}
