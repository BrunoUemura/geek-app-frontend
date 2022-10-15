import { ILists } from "../../interfaces/ILists";
import ListComponent from "../ListComponent";
import { Container } from "./styles";

type Props = {
  lists: ILists[];
};

export default function List({ lists }: Props) {
  return (
    <Container>
      {lists?.map((list) => {
        return <ListComponent key={list.id} {...list} />;
      })}
    </Container>
  );
}
