import { IListItem } from "../../@types/ILists";
import { ItemCard } from "./components/ItemCard";

export interface ItemsProps {
  items: IListItem[];
}

export function Items({ items }: ItemsProps) {
  return (
    <div className="flex flex-col">
      {items?.map((item) => {
        return <ItemCard key={item.id} listId={item.listId} item={item} />;
      })}
    </div>
  );
}
