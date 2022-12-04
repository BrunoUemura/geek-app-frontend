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
    <div className="h-4/5 flex items-center mb-4 sm:h-full">
      <img className="h-full" src={item.image} alt={`${item.title} image`} />

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
