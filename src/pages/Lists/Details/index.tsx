import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ListDetails } from "../../../components/ListDetails";
import { useAuth } from "../../../hooks/useAuth";

import { ROUTES } from "../../../routes/routes";
import { listService } from "../../../services/listService";
import { ILists } from "../../../types/ILists";

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

  const redirectTo = `${ROUTES.LIST}/${id}/edit`;

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
    <div>
      <ListDetails list={list} />

      <Link to={redirectTo}>
        <button>Edit</button>
      </Link>
    </div>
  );
}
