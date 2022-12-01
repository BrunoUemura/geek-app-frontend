import { List } from "../../components/Feature/List";
import { LoaderSpinner } from "../../components/UI/Loader";
import { ILists } from "../../types/ILists";

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
