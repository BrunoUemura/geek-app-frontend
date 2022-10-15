import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { auth } from "../../services/auth";
import { Container } from "./styles";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    const res = await auth.signIn({ email, password });

    if (res.isError) {
      alert(`Sign in failed: ${res.error.message}`);
      return;
    }

    localStorage.setItem("auth_token", res.data.token);
    navigate("/lists", { replace: true });
  };

  const signInInput = {
    heading: "Sign In",
    inputData: [
      {
        label: "Email",
        placeholder: "john@example.com",
        type: "email",
        setFunction: setEmail,
      },
      {
        label: "Password",
        placeholder: "**************",
        type: "password",
        setFunction: setPassword,
      },
    ],
    buttonText: "Submit",
    submitEvent: handleSignIn,
  };

  return (
    <Container>
      <AuthForm {...signInInput} />
    </Container>
  );
}
