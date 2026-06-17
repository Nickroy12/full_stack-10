"use client";

import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme =
    theme === "system" ? resolvedTheme : theme;

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={() =>
        setTheme(currentTheme === "dark" ? "light" : "dark")
      }
    >
      {currentTheme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </Button>
  );
}