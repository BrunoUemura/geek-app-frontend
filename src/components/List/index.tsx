import { ListCard } from "../ListCard";
import { ListProps } from "./types";
import "./styles.scss";

export function List({ lists }: ListProps) {
  return (
    <div className="list-component">
      {lists?.map((list) => {
        return <ListCard key={list.id} {...list} />;
      })}
    </div>
  );
}
