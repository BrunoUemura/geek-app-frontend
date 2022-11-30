import { ButtonProps } from "./types";
import { LoaderSpinner } from "../../../UI/Loader";

export function Button({ label, isLoading = false }: ButtonProps) {
  if (isLoading) {
    return (
      <button
        className="w-full p-2 flex justify-center items-center bg-gray-900 text-white text-base"
        type="submit"
        disabled={true}
      >
        <LoaderSpinner
          width={20}
          height={20}
          strokeWidth={8}
          strokeWidthSecondary={8}
          primaryColor={"#a3a3a3"}
          secondaryColor={"#525252"}
        />
      </button>
    );
  }

  return (
    <button
      className="w-full p-2 text-white text-base bg-gray-900 hover:bg-gray-800"
      type="submit"
    >
      {label}
    </button>
  );
}
