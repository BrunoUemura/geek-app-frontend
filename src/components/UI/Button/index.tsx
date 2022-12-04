import { ButtonProps } from "./types";

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="button p-2 text-white text-base bg-blue-700 hover:bg-blue-600"
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
