import "./styles.scss";
import { ButtonProps } from "./types";

export function Button({ label }: ButtonProps) {
  return (
    <button className="form__button" type="submit">
      {label}
    </button>
  );
}
