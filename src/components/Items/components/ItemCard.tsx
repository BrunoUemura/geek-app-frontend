import { ItemOwnerView } from "./ItemOwnerView";
import { ItemDetails } from "./ItemDetails";
import { useAuth } from "../../../hooks/useAuth";
import { IListItem } from "../../../@types/ILists";

export interface ItemCardProps {
  listId: string;
  item: IListItem;
}

export function ItemCard({ listId, item }: ItemCardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="h-56 flex flex-col justify-between border-b bg-neutral-700 mb-6 sm:flex-row sm:mb-0 sm:h-36">
        <ItemDetails listId={listId} item={item} />
      </div>
    );
  }

  return (
    <div className="h-56 flex flex-col justify-between border-b border-neutral-500 bg-neutral-700 mb-6 sm:flex-row sm:mb-0 sm:h-36">
      <ItemDetails listId={listId} item={item} />
      <ItemOwnerView listId={listId} item={item} />
    </div>
  );
}
