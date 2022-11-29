import { ButtonProps } from "./types";
import "./styles.scss";

export function Button({ label }: ButtonProps) {
  return (
    <button className="form__button" type="submit">
      {label}
    </button>
  );
}
