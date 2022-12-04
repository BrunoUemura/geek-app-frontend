interface InputProps {
  label: string;
  type: string;
  setInputValue: (value: string) => void;
}

export function Input({ label, type, setInputValue }: InputProps) {
  return (
    <div className="w-full flex flex-col">
      <label className="mb-1 text-white">{label}</label>
      <input
        className="mb-4 p-2 bg-neutral-600 outline-none border-b border-neutral-400 text-white focus:border"
        type={type}
        required
        onChange={(event) => setInputValue(event.target.value)}
      />
    </div>
  );
}
