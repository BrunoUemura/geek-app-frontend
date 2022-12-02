import Router from "next/router";
import { ROUTES } from "../constants/routes";

export default function NotFound() {
  const handleGoBack = () => {
    return Router.push(ROUTES.ROOT);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Oops! You&apos;ve reached a non explored area...</h1>
      <button
        className="bg-black text-white p-2 rounded-md"
        onClick={handleGoBack}
      >
        Go back to Home
      </button>
    </div>
  );
}
