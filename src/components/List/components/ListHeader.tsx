import { ListHeaderDetails } from "./ListHeaderDetails";
import { ListHeaderOwnerView } from "./ListHeaderOwnerView";
import { useAuth } from "../../../hooks/useAuth";
import { ILists } from "../../../@types/ILists";

interface ListHeaderProps {
  list: ILists;
}

export function ListHeader({ list }: ListHeaderProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center bg-white sm:flex-row sm:justify-between">
        <ListHeaderDetails list={list} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center bg-white sm:flex-row sm:justify-between">
      <ListHeaderDetails list={list} />
      <ListHeaderOwnerView list={list} />
    </div>
  );
}
