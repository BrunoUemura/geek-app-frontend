import { OwnerView } from "./OwnerView";
import { ItemDetails } from "./ItemDetails";
import { useAuth } from "../../../hooks/useAuth";
import { ItemCardProps } from "./types";

export function ItemCard({ listId, item }: ItemCardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="h-52 flex flex-col justify-between border-b bg-white mb-6 sm:flex-row sm:mb-0 sm:h-36">
        <ItemDetails listId={listId} item={item} />
      </div>
    );
  }

  return (
    <div className="h-52 flex flex-col justify-between border-b bg-white mb-6 sm:flex-row sm:mb-0 sm:h-36">
      <ItemDetails listId={listId} item={item} />
      <OwnerView listId={listId} item={item} />
    </div>
  );
}
