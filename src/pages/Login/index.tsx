import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../../components/Feature/AuthForm/Button";
import { Input } from "../../components/Feature/AuthForm/Input";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routes";

export function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, authenticate } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      return navigate(ROUTES.LIST, { replace: true });
    }
  }, [isAuthenticated]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await authenticate(email, password);
      setIsLoading(false);
    } catch (error) {
      alert("Authentication failed");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSignIn}
        className="bg-white p-8 sm:w-4/5 md:w-4/5 lg:w-1/3"
      >
        <h1 className="font-medium uppercase text-2xl mb-8">Login</h1>

        <Input label="Email" type="text" setInputValue={setEmail} />
        <Input label="Password" type="password" setInputValue={setPassword} />
        <div className="mt-3">
          <Button label="Login" isLoading={isLoading} />
        </div>

        <div className="flex mt-4">
          <p className="text-gray-500">Not registered yet?&nbsp;</p>
          <Link
            className="text-gray-700 hover:text-gray-900 hover:underline"
            to={ROUTES.REGISTER}
          >
            Click hete to sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
