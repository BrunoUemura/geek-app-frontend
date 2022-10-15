import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "./styles";
import galaxy from "../../assets/galaxy.svg";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/lists", { replace: true });
    }, 2500);
  }, []);

  return (
    <Container>
      <img src={galaxy} alt="background" />
      <h1>Oops, you almost entered the 5th dimension!</h1>
      <h2>Redirecting to Home...</h2>
    </Container>
  );
}
