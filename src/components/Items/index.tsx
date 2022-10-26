import { ItemCard } from "../ItemCard";
import { ItemsProps } from "./types";
import "./styles.scss";

export function Items({ items }: ItemsProps) {
  return (
    <div className="items-component">
      {items?.map((item) => {
        return <ItemCard key={item.id} {...item} />;
      })}
    </div>
  );
}
