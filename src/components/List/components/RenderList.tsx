import { LoaderSpinner } from "../../UI/Loader";
import { ILists } from "../../../@types/ILists";
import { List } from "..";

interface RenderListProps {
  isLoading: boolean;
  lists: ILists[] | null;
}

export function RenderList({ isLoading, lists }: RenderListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderSpinner />
      </div>
    );
  }

  return <List lists={lists} />;
}
