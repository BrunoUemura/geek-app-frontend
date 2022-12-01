import Router from "next/router";
import { useEffect } from "react";
import { ROUTES } from "../routes";

export default function Home() {
  const handleSignInRedirect = () => Router.push(ROUTES.LOGIN);

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
