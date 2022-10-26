import "./styles.scss";
import { IButtonProps } from "./types";

export function Button({ label, onClick }: IButtonProps) {
  return (
    <button className="button" type="submit" onClick={onClick}>
      {label}
    </button>
  );
}
