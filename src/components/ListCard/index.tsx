import { Link } from "react-router-dom";

import { ROUTES } from "../../routes/constants";
import { ILists } from "../../types/ILists";
import "./styles.scss";

export function ListCard(list: ILists) {
  const redirectTo = `${ROUTES.LIST}/${list.id}`;

  return (
    <Link className="list-card-link-component" to={redirectTo}>
      <div className="list-card-component">
        <h1>{list.title}</h1>
        <p>category: {list.category}</p>
        <p>Items: {list.listItem.length}</p>
      </div>
    </Link>
  );
}
