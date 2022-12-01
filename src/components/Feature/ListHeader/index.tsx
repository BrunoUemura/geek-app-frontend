import { ListHeaderDetails } from "./ListHeaderDetails";
import { OwnerView } from "./OwnerView";
import { ListHeaderProps } from "./types";
import { useAuth } from "../../../hooks/useAuth";

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
      <OwnerView list={list} />
    </div>
  );
}
