import "./styles.scss";
import { IButtonProps } from "./types";

export function Button({ label }: IButtonProps) {
  return (
    <button className="button" type="submit">
      {label}
    </button>
  );
}
