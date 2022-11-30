import { LoaderSpinner } from "../../components/UI/Loader";

export function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoaderSpinner />
    </div>
  );
}
