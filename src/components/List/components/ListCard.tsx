import Link from "next/link";
import { ROUTES } from "../../../constants/routes";
import { LabelText } from "../../UI/LabelText";
import { ILists } from "../../../@types/ILists";

interface ListCardProps {
  list: ILists;
}

export function ListCard({ list }: ListCardProps) {
  const redirectTo = `${ROUTES.LIST}/${list.id}`;

  return (
    <Link href={redirectTo}>
      <div className="flex flex-col p-4 bg-neutral-700 hover:shadow-md">
        <h1 className="text-2xl text-white mb-4 tracking-wide">{list.title}</h1>
        <LabelText label="Category" text={list.category} />
        <LabelText label="Total Items" text={String(list.listItem.length)} />
      </div>
    </Link>
  );
}
