import { Link } from "react-router-dom";

import { ROUTES } from "../../../routes/routes";
import { ListCardProps } from "./types";
import { LabelText } from "../../UI/LabelText";

export function ListCard({ list }: ListCardProps) {
  const redirectTo = `${ROUTES.LIST}/${list.id}`;

  return (
    <Link to={redirectTo}>
      <div className="flex flex-col p-4 bg-white hover:shadow-md">
        <h1 className="text-2xl mb-4 tracking-wide">{list.title}</h1>
        <LabelText label="Category" text={list.category} />
        <LabelText label="Total Items" text={String(list.listItem.length)} />
      </div>
    </Link>
  );
}
