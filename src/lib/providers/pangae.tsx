"use client";

import { AuthProvider } from "@pangeacyber/react-auth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const PangaeAuthProvider = ({ children }: Props) => {
  return (
    <AuthProvider
      loginUrl={
        "https://pdn-da2h2alyjhqi2karyxvyg6xw426j6pbr.login.aws.us.pangea.cloud/"
      }
      redirectUri={process.env.NEXT_PUBLIC_LOGIN_URL}
      config={{
        clientToken: process.env.NEXT_PUBLIC_CLIENT_TOKEN,
        domain: process.env.NEXT_PUBLIC_PROVIDER_API,
      }}
    >
      {children as any}
    </AuthProvider>
  );
};

export default PangaeAuthProvider;
