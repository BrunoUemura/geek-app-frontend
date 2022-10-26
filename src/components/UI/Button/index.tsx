import "./styles.scss";
import { ButtonProps } from "./types";

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button className="button" type="submit" onClick={onClick}>
      {label}
    </button>
  );
}
