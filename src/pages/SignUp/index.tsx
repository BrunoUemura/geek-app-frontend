import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { auth } from "../../services/auth";
import { Container } from "./styles";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    const res = await auth.signUp({ username, email, password });

    if (res.isError) {
      alert(`Sign up failed: ${res.error.message}`);
      return;
    }

    navigate("/signin", { replace: true });
  };

  const signUpInput = {
    heading: "Sign Up",
    inputData: [
      {
        label: "Username",
        placeholder: "JohnDoe",
        type: "text",
        setFunction: setUsername,
      },
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
    submitEvent: handleSignUp,
  };

  return (
    <Container>
      <AuthForm {...signUpInput} />
    </Container>
  );
}
