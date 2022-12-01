import Router from "next/router";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const handleListsRedirect = () => Router.push(ROUTES.LIST);
  const handleSignInRedirect = () => Router.push(ROUTES.LOGIN);

  if (isAuthenticated) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl mb-10">Go to your lists</h1>
        <button
          className="bg-black text-white p-2 rounded-lg"
          onClick={handleListsRedirect}
        >
          Show Lists
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl mb-10">
        Sign In to CREATE your own LIST of favorites Animes/Shows/Movies
      </h1>
      <button
        className="bg-black text-white p-2 rounded-lg"
        onClick={handleSignInRedirect}
      >
        Sign In
      </button>
    </div>
  );
}
