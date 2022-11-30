import { Items } from "../../../components/Feature/Items";
import { LoaderSpinner } from "../../../components/UI/Loader";
import { IListItem } from "../../../types/ILists";

interface RenderItemsProps {
  isLoading: boolean;
  items: IListItem[];
}

export function RenderItems({ isLoading, items }: RenderItemsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderSpinner />
      </div>
    );
  }

  return <Items items={items} />;
}
