import { ListHeaderProps } from "./types";

export function ListHeader({
  title,
  category,
  itemsQuantity,
  createdAt,
  updatedAt,
}: ListHeaderProps) {
  return (
    <div>
      <span>{title}</span>
      <span>{category}</span>
      <span>{itemsQuantity}</span>
      <span>{createdAt}</span>
      <span>{updatedAt}</span>
    </div>
  );
}
