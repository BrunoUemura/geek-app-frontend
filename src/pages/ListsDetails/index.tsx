import { Route, useParams, useSearchParams } from "react-router-dom";

export default function ListsDetails() {
  const { id } = useParams();

  return <div>List {id} Details Page</div>;
}
