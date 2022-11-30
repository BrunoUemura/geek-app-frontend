import { ButtonProps } from "./types";

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="button p-2 text-white text-base bg-gray-900 hover:bg-gray-800"
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
