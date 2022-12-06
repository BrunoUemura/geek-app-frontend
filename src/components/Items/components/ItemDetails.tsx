import React, { useState } from "react";

import { LabelText } from "../../UI/LabelText";
import { IListItem } from "../../../@types/ILists";

export interface ItemCardProps {
  listId: string;
  item: IListItem;
}

export function ItemDetails({ item }: ItemCardProps) {
  const [expandMode, setExpandMode] = useState<boolean>(true);

  return (
    <div className="h-4/5 flex items-center mb-1 sm:h-full">
      <div className="flex justify-center items-center h-full w-28 overflow-hidden">
        <img
          className="object-contain"
          src={item.image || "/default-image.jpg"}
          alt={`${item.title}`}
        />
      </div>

      <div className="pl-5 text-sm sm:flex sm:flex-col sm:text-lg">
        <LabelText label="Title" text={item.title} />

        {expandMode && (
          <>
            <LabelText label="Season" text={String(item.season)} />

            {item?.episode ? (
              <LabelText label="Episode" text={String(item.episode)} />
            ) : null}

            {item?.chapter ? (
              <LabelText label="Chapter" text={String(item.chapter)} />
            ) : null}

            {item?.status ? (
              <LabelText label="Status" text={String(item.status)} />
            ) : null}

            <a
              className="text-white hover:underline hover:text-neutral-200"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              Direct Link
            </a>
          </>
        )}
      </div>
    </div>
  );
}
