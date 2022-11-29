import { LabelTextProps } from "./types";
import "./styles.scss";

export function LabelText({ label, text }: LabelTextProps) {
  return (
    <div className="label-text-container">
      <span className="label-text-container__label">{label}:&nbsp;</span>
      <span className="label-text-container__text">{text}</span>
    </div>
  );
}
