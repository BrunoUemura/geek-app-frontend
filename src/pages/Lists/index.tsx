import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { List } from "../../components/Feature/List";
import { ILists } from "../../types/ILists";
import { listService } from "../../services/listService";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routes";
import { Button } from "../../components/UI/Button";
import "./styles.scss";

export function Lists() {
  const navigate = useNavigate();
  const { isAuthenticated, id, token, logout } = useAuth();

  const [lists, setLists] = useState<ILists[] | null>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate(ROUTES.LOGIN, { replace: true });
    }

    (async () => {
      const response = await listService.fetchListByUserId(id, token);
      console.log(response);

      setLists(response);

      if (!response) {
        logout();
      }

      setLists(response);
    })();
  }, [isAuthenticated]);

  const handleNewListEvent = () => {
    console.log("New List Event clicked");
  };

  return (
    <div className="list-container">
      <Link className="list-container__new-btn" to={ROUTES.LIST_NEW}>
        <Button label="New List" onClick={handleNewListEvent} />
      </Link>

      <List lists={lists} />
    </div>
  );
}
