import { ButtonProps } from "./types";
import "./styles.scss";

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button className="button" type="submit" onClick={onClick}>
      {label}
    </button>
  );
}
