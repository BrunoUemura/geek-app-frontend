import { ILists } from "../../../@types/ILists";
import { formatDate } from "../../../functions";
import { LabelText } from "../../UI/LabelText";

interface ListHeaderDetailsProps {
  list: ILists;
}

export function ListHeaderDetails({ list }: ListHeaderDetailsProps) {
  return (
    <div className="flex flex-col p-3">
      <div className="text-2xl text-white mb-4 tracking-wide">{list.title}</div>
      <LabelText label="Category" text={list.category} />
      <LabelText label="Description" text={list.description} />
      <LabelText label="Total Items" text={String(list.listItem.length)} />
      <LabelText label="Created At" text={formatDate(list.createdAt)} />
      <LabelText label="Updated At" text={formatDate(list.updatedAt)} />
    </div>
  );
}
