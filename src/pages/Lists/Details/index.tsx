import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Items } from "../../../components/Items";
import { ListHeader } from "../../../components/ListHeader";
import { Button } from "../../../components/UI/Button";
import { useAuth } from "../../../hooks/useAuth";

import { ROUTES } from "../../../routes/routes";
import { listService } from "../../../services/listService";
import { ILists } from "../../../types/ILists";

import "./styles.scss";

const listInitialState = {
  id: "",
  userId: "",
  title: "",
  category: "",
  description: "",
  listItem: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function ListsDetails() {
  const { id } = useParams();
  const { isAuthenticated, token } = useAuth();

  const [list, setList] = useState<ILists | null>(listInitialState);

  const baseClass = "list-details-container";

  const handleAddEvent = () => {
    console.log("Add button clicked");
  };

  useEffect(() => {
    (async () => {
      const result = await listService.fetchListByListId(id || "", token || "");
      setList(result);
    })();
  }, []);

  if (!list) {
    return (
      <div>
        <span>No List found for id {id}</span>
        <Link to={ROUTES.LIST}>
          <button>Go back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={baseClass}>
      <ListHeader list={list} />

      <Button label="Add Item" onClick={handleAddEvent} />

      <Items items={list.listItem} />
    </div>
  );
}
