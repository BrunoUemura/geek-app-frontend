import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../routes/constants";
import { listService } from "../../services/listService";

export function ListNew() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreateList = async () => {
    const token = localStorage.getItem("auth_token") || "";
    await listService.createList(userId, title, category, description, token);

    navigate(ROUTES.LIST, { replace: true });
  };

  return <div className="list-new-container"></div>;
}
