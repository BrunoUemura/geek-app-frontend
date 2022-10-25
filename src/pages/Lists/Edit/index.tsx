import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "../../../routes/routes";
import { listService } from "../../../services/listService";
import "./styles.scss";

export function ListEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [listId, setListId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSaveEdit = async () => {
    const token = localStorage.getItem("auth_token") || "";
    await listService.updateList(listId, title, category, description, token);

    navigate(ROUTES.LIST, { replace: true });
  };

  const handleCancelEdit = async () => {
    navigate(ROUTES.LIST, { replace: true });
  };

  return <div className="list-edit-container">Edit list {id}</div>;
}
