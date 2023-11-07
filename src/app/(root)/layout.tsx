import "@/styles/globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { LayoutProps } from "@/interface";
import ThemeProvider from "@/lib/providers/theme";
import PangaeAuthProvider from "@/lib/providers/pangae";
// import '@radix-ui/themes/styles.css';
// import "@radix-ui/themes/styles.css";
//
export const metadata: Metadata = {
  title: "CloudCollab - Share file with teams.",
  description:
    "CloudCollab offers an all-in-one solution for organizations, whether small startups or large enterprises, aiming to streamline workflows, enhance team collaboration, and maintain the security and integrity of their data",
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <PangaeAuthProvider>{children}</PangaeAuthProvider>
          <Toaster position="top-center" richColors expand={false} />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
