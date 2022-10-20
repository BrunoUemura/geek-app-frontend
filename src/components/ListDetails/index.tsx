import React from "react";
import { ListHeader } from "./Header";
import { ListItems } from "./Items";
import { ListDetailsProps } from "./types";

export function ListDetails({ list }: ListDetailsProps) {
  return (
    <div>
      <ListHeader
        title={list.title}
        category={list.category}
        itemsQuantity={list.listItem.length}
        createdAt={list.createdAt.toString()}
        updatedAt={list.updatedAt.toString()}
      />

      {list?.listItem?.map((item) => (
        <ListItems key={item.id} items={item} />
      ))}
    </div>
  );
}
