import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    return navigate(ROUTES.LIST, { replace: true });
  };

  return (
    <div>
      <h1>Oops! You've reached a non explored area...</h1>
      <button onClick={handleGoBack}>Go back to Home</button>
    </div>
  );
}
