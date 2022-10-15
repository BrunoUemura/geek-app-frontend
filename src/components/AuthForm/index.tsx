import { useState } from "react";
import { Form } from "./styles";

type IFormProps = {
  heading: string;
  inputData: IFormInput[];
  buttonText: string;
  submitEvent: any;
};

type IFormInput = {
  label: string;
  placeholder: string;
  type: string;
  setFunction: any;
};

function FormInput({ label, placeholder, type, setFunction }: IFormInput) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(event) => setFunction(event.target.value)}
      />
    </div>
  );
}

export default function AuthForm({
  heading,
  inputData,
  buttonText,
  submitEvent,
}: IFormProps) {
  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <h1>{heading}</h1>

      {inputData?.map((input, index) => (
        <FormInput
          key={index}
          label={input.label}
          placeholder={input.placeholder}
          type={input.type}
          setFunction={input.setFunction}
        />
      ))}

      <button type="submit" onClick={submitEvent}>
        {buttonText}
      </button>
    </Form>
  );
}
