import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles.scss";
import { Button } from "../../components/AuthForm/Button";
import { Input } from "../../components/AuthForm/Input";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routes";
import { registerService } from "../../services/authService";

export function Register() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      return navigate(ROUTES.LIST, { replace: true });
    }
  }, []);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await registerService(name, email, password);

    if (response?.status === 201) {
      return navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSignUp} className="register__form">
        <h1>Register</h1>

        <Input label="Name" type="text" setInputValue={setName} />
        <Input label="Email" type="text" setInputValue={setEmail} />
        <Input label="Password" type="password" setInputValue={setPassword} />
        <Button label="Login" />

        <div className="register__redirect_link">
          Already registered?{" "}
          <Link to={ROUTES.LOGIN}> Click hete to sign in</Link>
        </div>
      </form>
    </div>
  );
}
