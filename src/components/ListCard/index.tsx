import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../routes/constants";
import { ILists } from "../../types/ILists";
import "./styles.scss";

export function ListCard(list: ILists) {
  const navidate = useNavigate();

  const handleCardClick = () => {
    navidate(`${ROUTES.LIST}/${list.id}`, { replace: true });
  };

  return (
    <div className="list-card-component" onClick={handleCardClick}>
      <h1>{list.title}</h1>
      <p>category: {list.category}</p>
      <p>Items: {list.listItem.length}</p>
    </div>
  );
}
