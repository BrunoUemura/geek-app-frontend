import { LoaderSpinner } from "../../UI/Loader";

interface ButtonProps {
  label: string;
  isLoading?: boolean;
}

export function Button({ label, isLoading = false }: ButtonProps) {
  if (isLoading) {
    return (
      <button
        className="w-full p-2 flex justify-center items-center bg-blue-700 text-white text-base"
        type="submit"
        disabled={true}
      >
        <LoaderSpinner
          width={20}
          height={20}
          strokeWidth={8}
          strokeWidthSecondary={8}
          primaryColor={"#ffffff"}
          secondaryColor={"#bcbcbc"}
        />
      </button>
    );
  }

  return (
    <button
      className="w-full p-2 text-white text-base bg-blue-700 hover:bg-blue-900"
      type="submit"
    >
      {label}
    </button>
  );
}
