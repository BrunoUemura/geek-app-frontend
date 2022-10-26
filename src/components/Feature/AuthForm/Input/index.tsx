import { InputProps } from "./types";
import "./styles.scss";

export function Input({ label, type, setInputValue }: InputProps) {
  return (
    <div className="form__input">
      <label className="form__input_label">{label}</label>
      <input
        className="form__input_input"
        type={type}
        required
        onChange={(event) => setInputValue(event.target.value)}
      />
    </div>
  );
}
