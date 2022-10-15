import { Form } from "./styles";

type IFormProps = {
  heading: string;
  inputData: IFormInput[];
  btnOptions: IBtnOptions[];
};

type IFormInput = {
  label: string;
  value: string;
  type: string;
  setFunction: any;
};

type IBtnOptions = {
  label: string;
  event: any;
  style: string;
};

function FormInput({ label, value, type, setFunction }: IFormInput) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => setFunction(event.target.value)}
      />
    </div>
  );
}

export default function EventForm({
  heading,
  inputData,
  btnOptions,
}: IFormProps) {
  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <h1>{heading}</h1>

      {inputData?.map((input, index) => (
        <FormInput
          key={index}
          label={input.label}
          value={input.value}
          type={input.type}
          setFunction={input.setFunction}
        />
      ))}

      <div className="btn-container">
        {btnOptions?.map((btn) => (
          <button className={`${btn.style}`} onClick={btn.event}>
            {btn.label}
          </button>
        ))}
      </div>
    </Form>
  );
}
