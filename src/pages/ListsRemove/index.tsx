import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ILists } from "../../types/ILists";
import { listService } from "../../services/listService";
import "styles.scss";

export default function ListRemove() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lists, setLists] = useState<ILists[]>([]);

  return <div className="list-remove-container"></div>;
}
