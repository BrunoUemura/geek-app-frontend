import Link from "next/link";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";
import { NavbarAuth } from "./components/NavbarAuth";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="w-full h-16 fixed top-0 left-0 bg-neutral-900 flex justify-evenly items-center">
      <Link href={ROUTES.ROOT}>
        <h1 className="text-white text-2xl uppercase tracking-wider">
          Geek App
        </h1>
      </Link>

      <nav className="">
        <Link className="mr-4" href={ROUTES.ROOT}>
          <button className="text-white text-center p-1 rounded-md hover:bg-neutral-800">
            Home
          </button>
        </Link>
        <Link href={ROUTES.LIST}>
          <button className="text-white text-center p-1 rounded-md hover:bg-neutral-800">
            Lists
          </button>
        </Link>
      </nav>

      <NavbarAuth isAuthenticated={isAuthenticated} />
    </header>
  );
}
