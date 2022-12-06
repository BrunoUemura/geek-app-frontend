import Image from "next/image";
import Link from "next/link";
import React from "react";

import defaultUser from "../../../assets/default-user.png";
import { ROUTES } from "../../../constants/routes";

interface NavbarAuthProps {
  isAuthenticated: boolean | undefined;
}

export const NavbarAuth = ({ isAuthenticated }: NavbarAuthProps) => {
  if (isAuthenticated) {
    return (
      <Image src={defaultUser} alt={"Default User"} width={40} height={40} />
    );
  }

  return (
    <Link href={ROUTES.LOGIN}>
      <button className="text-white text-center p-1 rounded-md hover:bg-neutral-800">
        Login
      </button>
    </Link>
  );
};
