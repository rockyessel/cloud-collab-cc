"use client";

import LogoSVG from "../reusables/logo";
import NextLink from "../reusables/next-link";
import { useAuth } from "@pangeacyber/react-auth";

const Navbar = () => {
  const { login, user, authenticated, getToken, loading } = useAuth();
  return (
    <header className="bg-slate-900 self-center flex w-full items-start justify-between gap-5 px-5 max-md:max-w-full max-md:flex-wrap">
      <LogoSVG fill={"#f43f5e"} width={100} height={100} />
      <nav className="self-stretch flex items-start justify-between gap-4 max-md:justify-center">
        {loading ? (
          <p>Loading</p>
        ) : authenticated ? (
          <NextLink
            href="/dashboard"
            className="bttn b-dark text-[#2c7c98]  p-4 rounded-lg"
          >
            Dashboard
          </NextLink>
        ) : (
          <button
            onClick={login}
            className="bttn bttn-rose p-4 text-rose-600 rounded-lg"
          >
            Authenticate
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
