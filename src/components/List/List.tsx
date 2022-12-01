import { ILists } from "../../@types/ILists";
import { ListCard } from "./components/ListCard";

interface ListProps {
  lists: ILists[] | null;
}

export function List({ lists }: ListProps) {
  return (
    <div className="flex flex-col mt-8">
      {lists?.map((list) => {
        return (
          <div className="mb-3" key={list.id}>
            <ListCard list={list} />
          </div>
        );
      })}
    </div>
  );
}
