"use client";
import { useTheme } from "next-themes";
import Button from "../reusables/button";
import { useState, useEffect } from "react";
import { HiLightBulb } from "react-icons/hi";
import { cn } from "@/lib/helpers";

export const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      type="button"
      title="Switch Theme"
      aria-label={`Switch theme to ${theme === "dark" ? "light" : "dark"}`}
      className={cn(
        "btn",
        theme === "dark"
          ? "rounded-lg bg-black p-2 text-yellow-500"
          : "rounded-lg bg-gray-200 text-black p-2"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <HiLightBulb className="text-xl" />
      ) : (
        <HiLightBulb className="text-xl" />
      )}
    </Button>
  );
};
