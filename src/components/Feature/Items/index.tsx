import { ItemCard } from "../ItemCard";
import { ItemsProps } from "./types";

export function Items({ items }: ItemsProps) {
  return (
    <div className="flex flex-col">
      {items?.map((item) => {
        return <ItemCard key={item.id} listId={item.listId} item={item} />;
      })}
    </div>
  );
}
