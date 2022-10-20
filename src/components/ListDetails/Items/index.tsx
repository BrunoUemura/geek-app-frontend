import { ListItemsProps } from "./types";

export function ListItems({ items }: ListItemsProps) {
  return (
    <div>
      <span>{items.title}</span>
      <span>{items.season}</span>
      <span>{items.episode}</span>
      <span>{items.chapter}</span>
      <span>{items.link}</span>
      <span>{items.image}</span>
      <span>{String(items.createdAt)}</span>
      <span>{String(items.updatedAt)}</span>
    </div>
  );
}
