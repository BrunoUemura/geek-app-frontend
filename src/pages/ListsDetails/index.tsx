import { Route, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

export default function ListsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const handleEdit = () => {
    navigate(`${ROUTES.LIST}/${id}/edit`, { replace: true });
  };

  return (
    <div>
      <span>List {id} Details Page</span>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
