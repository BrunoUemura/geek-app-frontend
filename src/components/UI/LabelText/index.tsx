import { LabelTextProps } from "./types";

export function LabelText({ label, text }: LabelTextProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:mb-0">
      <span className=" text-gray-500">{label}:&nbsp;</span>
      <span className=" text-black">{text}</span>
    </div>
  );
}
