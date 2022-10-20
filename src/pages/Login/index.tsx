import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./styles.scss";
import { Button } from "../../components/AuthForm/Button";
import { Input } from "../../components/AuthForm/Input";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes/constants";

export function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, authenticate } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      return navigate(ROUTES.LIST, { replace: true });
    }
  }, [isAuthenticated]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    await authenticate(email, password);
  };

  return (
    <div className="login">
      <form onSubmit={handleSignIn} className="login__form">
        <h1>Login</h1>

        <Input label="Email" type="text" setInputValue={setEmail} />
        <Input label="Password" type="password" setInputValue={setPassword} />
        <Button label="Login" />

        <div className="login__redirect_link">
          Not registered yet?{" "}
          <Link to={ROUTES.REGISTER}>Click hete to sign up</Link>
        </div>
      </form>
    </div>
  );
}
