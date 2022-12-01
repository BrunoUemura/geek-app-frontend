interface InputProps {
  label: string;
  type: string;
  setInputValue: (value: string) => void;
}

export function Input({ label, type, setInputValue }: InputProps) {
  return (
    <div className="w-full flex flex-col">
      <label className="mb-1">{label}</label>
      <input
        className="mb-4 p-2 bg-gray-200 outline-none border-b border-gray-700 focus:border"
        type={type}
        required
        onChange={(event) => setInputValue(event.target.value)}
      />
    </div>
  );
}
