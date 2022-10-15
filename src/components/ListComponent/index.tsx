import { Link } from "react-router-dom";
import { ILists } from "../../interfaces/ILists";
import { Container } from "./styles";

export default function ListComponent(list: ILists) {
  return (
    <Container key={list.id}>
      <div className="leftColumn">
        <span className="listDetail">
          <span className="detail-indicator">Title: </span>
          {list.title}
        </span>
        <span className="listDetail">
          <span className="detail-indicator">Category: </span>
          {list.category}
        </span>
      </div>

      <div className="middleColumn">
        <span className="listDetail">
          <span className="detail-indicator">Items: </span>
          {list.listItem.length}
        </span>
        <span className="listDetail">
          <span className="detail-indicator">Description: </span>
          {list.description}
        </span>
      </div>

      <div className="rightColumn">
        <Link to={`/lists/edit/${list.id}`}>
          <span className="edit-btn">Edit</span>
        </Link>

        <Link to={`/lists/remove/${list.id}`}>
          <span className="remove-btn">Remove</span>
        </Link>
      </div>
    </Container>
  );
}
