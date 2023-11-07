import { useAuth } from "@pangeacyber/react-auth";
import Button from "../reusables/button";
import React from "react";
import NextLink from "../reusables/next-link";

const AuthBtn = () => {
  const { authenticated, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      {authenticated ? (
        <NextLink href="/dashboard">Dashboard</NextLink>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
  );
};

export default AuthBtn;
