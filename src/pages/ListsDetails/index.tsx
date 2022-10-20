import { Link, Route, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

export default function ListsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const redirectTo = `${ROUTES.LIST}/${id}/edit`;

  return (
    <div>
      <span>List {id} Details Page</span>
      <Link to={redirectTo}>
        <button>Edit</button>
      </Link>
    </div>
  );
}
