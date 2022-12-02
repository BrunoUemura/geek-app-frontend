import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";

import { Button } from "../../components/AuthForm/Button";
import { Input } from "../../components/AuthForm/Input";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";
import { registerService } from "../../services/http/auth";

export default function Register() {
  const { isAuthenticated } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      Router.push(ROUTES.LIST);
    }
  });

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await registerService(name, email, password);

    if (response?.status === 201) {
      Router.push(ROUTES.LOGIN);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-8 sm:w-4/5 md:w-4/5 lg:w-1/3"
      >
        <h1 className="font-medium uppercase text-2xl mb-8">Register</h1>

        <Input label="Name" type="text" setInputValue={setName} />
        <Input label="Email" type="text" setInputValue={setEmail} />
        <Input label="Password" type="password" setInputValue={setPassword} />
        <Button label="Login" />

        <div className="flex mt-4">
          <p className="text-gray-500">Already registered?&nbsp;</p>
          <Link
            className="text-gray-700 hover:text-gray-900 hover:underline"
            href={ROUTES.LOGIN}
          >
            Click hete to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
