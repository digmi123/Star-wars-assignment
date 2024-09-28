import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "./ui/button";
import Moon from "@/assets/moon.svg?react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  return (
    <Button onClick={toggleTheme}>
      <Moon />
    </Button>
  );
}
