"use client";

import { AuthProvider } from "@pangeacyber/react-auth";
import { ReactNode } from "react";
import { PANGEA_OBJ } from "../config/pangea";

interface Props {
  children: ReactNode;
}
const PangaeAuthProvider = ({ children }: Props) => {
  const { token, hostedURL, redirectURI, ...rest } = PANGEA_OBJ;

  const authConfig = {
    ...rest,
    clientToken: token,
  };
  return (
    <AuthProvider
      loginUrl={hostedURL}
      redirectUri={redirectURI}
      config={authConfig}
    >
      {children as any}
    </AuthProvider>
  );
};

export default PangaeAuthProvider;
