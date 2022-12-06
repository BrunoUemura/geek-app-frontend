import Router from "next/router";
import Image from "next/image";
import homeImage from "../assets/home-image.png";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import Navbar from "../components/Navbar";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const handleListsRedirect = () => Router.push(ROUTES.LIST);
  const handleSignInRedirect = () => Router.push(ROUTES.LOGIN);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-neutral-800">
      <Navbar />

      <div className="flex flex-col justify-center items-center max-w-6xl px-10 md:flex-row md:">
        <div className="flex flex-col">
          <h1 className="text-5xl text-white mb-10">
            Manage your favorite <span>Anime</span>/<span>Shows</span>/
            <span>Movies </span>
            watching list
          </h1>

          {isAuthenticated ? (
            <>
              <h1 className="text-xl text-white mb-10">Go to your lists</h1>
              <button
                className="bg-blue-700 text-white p-2 rounded-lg w-full sm:w-1/4"
                onClick={handleListsRedirect}
              >
                Show Lists
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl text-white mb-10">
                Sign In to CREATE your own list
              </h1>
              <button
                className="bg-blue-700 text-white p-2 rounded-lg w-full sm:w-1/4"
                onClick={handleSignInRedirect}
              >
                Sign In
              </button>
            </>
          )}
        </div>

        <Image
          className="-order-1 md:order-1"
          src={homeImage}
          alt={"Home image"}
          width={350}
          height={313}
        />
      </div>
    </div>
  );
}
