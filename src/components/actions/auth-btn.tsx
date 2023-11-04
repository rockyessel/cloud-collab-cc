import { useAuth } from "@pangeacyber/react-auth";
import Button from "../reusables/button";
import React from "react";

const AuthBtn = () => {
  const { authenticated, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      {authenticated ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </div>
  );
};

export default AuthBtn;
