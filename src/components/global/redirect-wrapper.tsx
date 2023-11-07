"use client";

import { useAuth } from "@pangeacyber/react-auth";
import { ReactNode, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import LogoSVG from "../reusables/logo";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

const RedirectWrapper = ({ children }: Props) => {
  const { authenticated, loading } = useAuth();

  console.log(authenticated);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) router.push("/");
  }, [authenticated, loading, router]);

  return loading ? (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <LogoSVG fill={"#f43f5e"} width={100} height={100} />
      <FaSpinner className="text-[#2c7c98] animate-spin text-xl" />
      <p className="text-xl font-medium text-[#2c7c98]">Authenticating...</p>
    </main>
  ) : (
    authenticated && children
  );
};

export default RedirectWrapper;
