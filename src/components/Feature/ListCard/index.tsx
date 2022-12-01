import { ROUTES } from "../../../routes";
import { ListCardProps } from "./types";
import { LabelText } from "../../UI/LabelText";
import Link from "next/link";

export function ListCard({ list }: ListCardProps) {
  const redirectTo = `${ROUTES.LIST}/${list.id}`;

  return (
    <Link href={redirectTo}>
      <div className="flex flex-col p-4 bg-white hover:shadow-md">
        <h1 className="text-2xl mb-4 tracking-wide">{list.title}</h1>
        <LabelText label="Category" text={list.category} />
        <LabelText label="Total Items" text={String(list.listItem.length)} />
      </div>
    </Link>
  );
}
