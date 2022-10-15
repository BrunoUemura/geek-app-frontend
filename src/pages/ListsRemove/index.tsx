import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useValidateAuth } from "../../hooks/useValidateAuth";
import { ILists } from "../../interfaces/ILists";
import { list } from "../../services/list";
import { retrieveUserId } from "../../utils/retrieveUserId";
import { Container } from "./styles";

export default function ListRemove() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lists, setLists] = useState<ILists[]>([]);

  useValidateAuth();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("auth_token") || "";
      const userId = retrieveUserId(token);
      const { data } = await list.fetchListByUserId(userId, token);
      setLists(data);
    })();
  }, []);

  return <Container></Container>;
}
