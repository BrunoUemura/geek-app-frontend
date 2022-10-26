import { ListHeader } from "./Header";
import { ListDetailsProps } from "./types";

export function ListDetails({ list }: ListDetailsProps) {
  return (
    <div>
      <ListHeader
        id={list.id}
        title={list.title}
        category={list.category}
        description={list.description}
        itemsQuantity={list.listItem.length}
        createdAt={list.createdAt.toString()}
        updatedAt={list.updatedAt.toString()}
      />
    </div>
  );
}
