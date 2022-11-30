import { ListCard } from "../ListCard";
import { ListProps } from "./types";

export function List({ lists }: ListProps) {
  return (
    <div className="flex flex-col mt-8">
      {lists?.map((list) => {
        return (
          <div className="mb-3">
            <ListCard key={list.id} list={list} />
          </div>
        );
      })}
    </div>
  );
}