import { Link } from "react-router-dom";
import { Container } from "./styles";

export default function Navbar() {
  return (
    <Container>
      <h1>Geek App</h1>
      <div>
        <Link to="/lists">Lists</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </Container>
  );
}
